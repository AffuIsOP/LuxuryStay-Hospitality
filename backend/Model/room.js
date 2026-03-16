const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomsid: {
    type: Number,
    required: true,
    unique: true,
  },
  roomimage: {
    type: String,
    required: true,
  },
  roomnumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomtype: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "RoomType",
  },
  roomprice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["available", "occupied", "maintenance"],
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
