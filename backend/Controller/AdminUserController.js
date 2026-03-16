const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/user");
const { StaffRole } = require("../Model/staffrole");
const { UserRole } = require("../Model/userrole");
const cloudinary = require("cloudinary").v2;


// @METHOD GET
// Admin API: http://localhost:5000/admin/user

async function adminUserList(req, res) {
  try {
    const users = await User.find().populate("userRole").populate("staffRole");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error fetching users" });
  }
}

// @METHOD POST
// Admin API: http://localhost:5000/admin/user


async function adminAddUser(req, res) {
  const {
    Username,
    useremail,
    userpassword,
    phoneNumber,
    userRole,
    staffRole,
    userImage,
  } = req.body;

  if (!Username) return res.status(400).send({ error: "Username is required" });
  if (!useremail) return res.status(400).send({ error: "Email is required" });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(useremail)) return res.status(400).send({ error: "Invalid email format" });
  if (!userpassword) return res.status(400).send({ error: "Password is required" });
  if (!phoneNumber) return res.status(400).send({ error: "Phone number is required" });
  if (!/^\d{11}$/.test(phoneNumber)) return res.status(400).send({ error: "Phone number must be 11 digits long" });
  if (!userRole) return res.status(400).send({ error: "User role is required" });

  if (userRole === 'staff' && !staffRole) return res.status(400).send({ error: 'Staff role is required when user role is Staff.' });

  try {
    const existingUser = await User.findOne({ useremail: useremail });
    if (existingUser) return res.status(400).send({ error: "Email already exists" });

    const existingUserByPhone = await User.findOne({ phoneNumber: phoneNumber });
    if (existingUserByPhone) return res.status(400).send({ error: "Phone number already exists" });

    const hashedPassword = await bcrypt.hash(userpassword, 10);
    const role = await UserRole.findById(userRole);
    if (!role) return res.status(400).send({ error: "Invalid user role" });

    let staff = null;
    if (staffRole) {
      staff = await StaffRole.findById(staffRole);
      if (!staff) return res.status(400).send({ error: "Invalid staff role" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    let imageUrl = null;
    if (userImage) {
      const base64Data = userImage.split(",")[1];
      
      // Correcting the usage of Cloudinary to upload the image
      const uploadedImage = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64Data}`,
        { folder: "User Avatar" }
      );
      imageUrl = uploadedImage.secure_url;
    }
    let status = "active";
    if (staffRole) {
      status = "pending";
    }

    const newUser = new User({
      username: Username,
      useremail: useremail.toLowerCase(),
      userpassword: hashedPassword,
      phoneNumber: phoneNumber,
      userImage: imageUrl,  
      userRole: role._id,
      staffRole: staff ? staff._id : null,
      verificationCode,
      verificationCodeExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      status: status,  
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully. Verification email sent.",
      user: savedUser,
    });
  } catch (error) {
      console.error('Error details:', error);
      return res.status(500).send({ error: "Error adding user", details: error.message });
  }
}

// @METHOD DELETE
// Admin API: http://localhost:5000/admin/user/:id

async function adminUserDelete(req, res) {
  const userId = req.params.id;

  let user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.imagePublicId) {
    try {
      const result = await cloudinary.v2.api.delete_resources([user.imagePublicId], { type: 'upload', resource_type: 'image' });
      console.log('Image deleted from Cloudinary:', result);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return res.status(500).json({ message: 'Failed to delete image from Cloudinary' });
    }
  }

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'User and their image deleted successfully', user: deletedUser });
}




// @METHOD PUT
// Admin API: http://localhost:5000/admin/user/:id

async function adminupdateUser(req, res) {
  const { id } = req.params;
  const { Username, useremail, userpassword, phoneNumber, userImage, userRole, staffRole } = req.body;

  try {
      // Find the user to update
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }

      // Update user fields
      if (Username) user.username = Username;
      if (useremail) user.useremail = useremail.toLowerCase();
      if (userpassword) user.userpassword = userpassword.toLowerCase();
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (userImage) user.userImage = userImage;

      // Update the userRole
      if (userRole) {
          const role = await UserRole.findById(userRole);
          if (!role) {
              return res.status(400).send({ error: 'Invalid user role' });
          }
          user.userRole = role._id;
      }

      // Update the staffRole
      if (staffRole) {
          const staff = await StaffRole.findById(staffRole);
          if (!staff) {
              return res.status(400).send({ error: 'Invalid staff role' });
          }
          user.staffRole = staff._id;
      }

      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
  } catch (error) {
      console.log(error);
      return res.status(500).send({ error: 'Error updating user' });
  }
}

// @METHOD PUT
// http://localhost:5000/admin/userstatus/:id

async function adminUpdateStatus(req, res) {
  const userId = req.params.id;
  const { status } = req.body;

  if (!status || !['active', 'pending', 'inactive'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { status: status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User status updated successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

module.exports = {
  adminUserList,
  adminUpdateStatus,
  adminAddUser,
  adminUserDelete,
};
