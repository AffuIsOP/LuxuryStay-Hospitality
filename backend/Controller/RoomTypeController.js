const RoomType = require('../Model/roomtype');

// @METHOD GET
// API: http://localhost:5000/dashboard/roomtypes
const getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    return res.status(200).json(roomTypes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching room types' });
  }
};

// @METHOD GET
// API: http://localhost:5000/dashboard/roomtypes/:id
const getRoomTypeById = async (req, res) => {
  try {
    const roomType = await RoomType.findOne({ roomtypeid: req.params.id });
    if (!roomType) {
      return res.status(404).json({ error: 'Room type not found' });
    }
    return res.status(200).json(roomType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching room type' });
  }
};


// @METHOD POST
// API: http://localhost:5000/dashboard/roomtypes

const createRoomType = async (req, res) => {
  try {
    const { roomtypename, roomtypedescription, roomtypeprice, roomstatus } = req.body;

    const latestRoomType = await RoomType.findOne().sort({ roomtypeid: -1 });
    const newRoomTypeId = latestRoomType ? latestRoomType.roomtypeid + 1 : 1;

    const newRoomType = new RoomType({
      roomtypeid: newRoomTypeId,
      roomtypename,
      roomtypedescription,
      roomtypeprice,
      roomstatus,
    });

    const savedRoomType = await newRoomType.save();

    return res.status(201).json(savedRoomType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating room type' });
  }
};


// @METHOD PUT
// API: http://localhost:5000/dashboard/roomtypes/:id

const updateRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findOneAndUpdate(
      { roomtypeid: req.params.id },
      req.body,
      { new: true }
    );

    if (!roomType) {  
      return res.status(404).json({ error: 'Room type not found' });
    }

    return res.status(200).json(roomType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating room type' });
  }
};


// @METHOD DELETE
// API: http://localhost:5000/dashboard/roomtypes/:id

const deleteRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findOneAndDelete({ roomtypeid: req.params.id });
    if (!roomType) {
      return res.status(404).json({ error: 'Room type not found' });
    }
    return res.status(200).json({ message: 'Room type deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting room type' });
  }
};


module.exports = {
  getAllRoomTypes,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  deleteRoomType,
};
