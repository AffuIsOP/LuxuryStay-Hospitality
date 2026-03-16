const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    menuid: {
        type: Number,
        required: true,
        unique: true,
    },
    foodimage: {
      type: String,
      required: true,
    },
    foodname: {
      type: String,
      required: true,
    },
    foodcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true,
    },
    foodprice: {
      type: Number,
      required: true,
    },
    fooddescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
