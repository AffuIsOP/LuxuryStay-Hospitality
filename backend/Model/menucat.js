const mongoose = require("mongoose");

const MenuCategorySchema = new mongoose.Schema(
  {
    menucategoryid: {
      type: Number,
      required: true,
      unique: true,
    },
    menucategoryname: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const MenuCategory = mongoose.model("MenuCategory", MenuCategorySchema);

module.exports = MenuCategory;
