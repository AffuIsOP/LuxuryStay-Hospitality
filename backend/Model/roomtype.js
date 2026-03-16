const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  roomtypeid: {
    type: Number,
    required: true,
    unique: true
  },
  roomtypename: {
    type: String,
    required: true,
  },
  roomtypedescription: {
    type: String,
    required: false,
  },
  roomtypeprice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
  },
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

module.exports = RoomType;
