const MenuCategory = require("../Model/menucat");

// @METHOD GET
// API: http://localhost:5000/dashboard/menucat


const getAllMenuCategories = async (req, res) => {
  try {
    const menuCategories = await MenuCategory.find(); 
    res.status(200).json(menuCategories); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

// @METHOD GET
// API: http://localhost:5000/dashboard/menucat/:id

const getMenuCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const menuCategory = await MenuCategory.findOne({ menucategoryid: id });

    if (!menuCategory) {
      return res.status(404).json({ message: "Menu category not found" });
    }

    res.status(200).json(menuCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @METHOD POST
// API: http://localhost:5000/dashboard/menucat/

const createMenuCategory = async (req, res) => {
  try {
    const { menucategoryname, description, status } = req.body;

    const lastCategory = await MenuCategory.findOne().sort({ menucategoryid: -1 });
    const newCategoryId = lastCategory ? lastCategory.menucategoryid + 1 : 1;

    const newMenuCategory = new MenuCategory({
      menucategoryid: newCategoryId,
      menucategoryname,
      description,
      status,
    });

    await newMenuCategory.save();
    res.status(201).json(newMenuCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @METHOD PUT/UPDATE
// API: http://localhost:5000/dashboard/menucat/:id

const updateMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { menucategoryname, description, status } = req.body;

    // Find the category by menucategoryid and update it
    const updatedCategory = await MenuCategory.findOneAndUpdate(
      { menucategoryid: id },
      { menucategoryname, description, status },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Menu category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// @METHOD DELETE
// API: http://localhost:5000/dashboard/menucat/:id

const deleteMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await MenuCategory.findOneAndDelete({
      menucategoryid: id,
    });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Menu category not found" });
    }

    res.status(200).json({ message: "Menu category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMenuCategories,
  getMenuCategoryById,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
};
