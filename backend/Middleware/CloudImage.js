// middleware/cloudinary.js

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "User Avatar",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

const upload = multer({ storage: storage }).single("userImage");

// Middleware to upload image to Cloudinary
const uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Error uploading image", details: err.message });
    }

    // If image is uploaded successfully, add the image URL to the request body
    if (req.file) {
      req.body.userImage = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    next(); // Proceed to the next middleware (controller)
  });
};

module.exports = { uploadImage };
