const Menu = require("../Model/menu");
const MenuCategory = require("../Model/menucat");

// @METHOD GET
// API: http://localhost:5000/dashboard/menu
const getAllMenu = async (req, res) => {
  try {
    const menus = await Menu.find().populate("foodcategory", "menucategoryname");
    res.status(200).json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Failed to fetch menus. Please try again." });
  }
};

// @METHOD GET
// API: http://localhost:5000/dashboard/menu/:id
const getMenuById = async (req, res) => {
  try {
    const menuId = req.params.id;
    const menu = await Menu.findById(menuId).populate("foodcategory", "menucategoryname");

    if (!menu) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(menu);
  } catch (error) {
    console.error("Error fetching menu by ID:", error);
    res.status(500).json({ error: "Failed to fetch menu item. Please try again." });
  }
};

// @METHOD POST
// API: http://localhost:5000/dashboard/menu

  
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
});

// Multer storage configuration for Cloudinary
const storageForMenuImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Menu Images",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

const uploadMenuImage = multer({ storage: storageForMenuImage }).single("foodimage");

// Create Menu API
const createMenu = async (req, res) => {
  try {
    uploadMenuImage(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ error: "Error uploading food image", details: err.message });
      }

      const { foodname, foodcategory, foodprice, fooddescription, status } = req.body;

      if (!foodname || !foodcategory || !foodprice || !fooddescription || !status) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const category = await MenuCategory.findById(foodcategory);
      if (!category) {
        return res.status(400).json({ error: "Invalid category ID" });
      }

      const lastMenu = await Menu.findOne().sort({ menuid: -1 });
      const newMenuId = lastMenu ? lastMenu.menuid + 1 : 1;
      
      // Create a new Menu item
      const newMenu = new Menu({
        menuid: newMenuId,
        foodimage: req.file ? req.file.path : "default-image",
        foodname,
        foodcategory,
        foodprice,
        fooddescription,
        status,
      });

      // Save the new Menu item to the database
      await newMenu.save();

      // Return the created menu item as a response
      res.status(201).json({ message: "Menu item created successfully", newMenu });
    });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Failed to create menu item. Please try again." });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the menu item by its ID and delete it
    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {
  getAllMenu,
  getMenuById,
  createMenu,
  deleteMenu,
};
