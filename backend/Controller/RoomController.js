const Room = require("../Model/room");
const RoomType = require("../Model/roomtype");

// @METHOD GET
// API: http://localhost:5000/dashboard/room
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("roomtype");
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Error fetching rooms" });
  }
};

// @METHOD GET
// API: http://localhost:5000/dashboard/room/:roomid
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findOne({ roomsid: req.params.id }).populate(
      "roomtype"
    );
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room by roomid:", error);
    res.status(500).json({ error: "Error fetching room by roomid" });
  }
};

// @METHOD POST
// API: http://localhost:5000/dashboard/room/

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
});

const createRoom = async (req, res) => {
  try {
    const storageForRoomImage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "Room Images",
        allowed_formats: ["png", "jpg", "jpeg"],
      },
    });

    const uploadRoomImage = multer({ storage: storageForRoomImage }).single("roomImage");

    uploadRoomImage(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ error: "Error uploading room image", details: err.message });
      }

      const { roomnumber, roomtype, roomprice, status, description } = req.body;

      if (!roomnumber || !roomtype || !roomprice || !status || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const roomTypeExists = await RoomType.findOne({ _id : roomtype });
      if (!roomTypeExists) {
        return res.status(404).json({ error: "Room type not found" });
      }

      const percentageIncrease = 0.1;
      const calculatedRoomPrice = Number(roomprice) + Number(roomTypeExists.roomtypeprice) * percentageIncrease;
      const finalRoomPrice = parseFloat(calculatedRoomPrice.toFixed(2));

      // Generate new room ID
      const latestRoom = await Room.findOne().sort({ roomsid: -1 });
      const newRoomsId = latestRoom ? latestRoom.roomsid + 1 : 1;

      const newRoom = new Room({
        roomsid: newRoomsId,
        roomimage: req.file ? req.file.path : "imageError",
        roomnumber,
        description,
        roomtype: roomTypeExists._id,
        roomprice: finalRoomPrice,
        status,
      });

      const savedRoom = await newRoom.save();
      res.status(201).json(savedRoom);
    });
  } catch (error) {
    console.error("Error creating room:", error.message);
    res.status(500).json({ error: "Error creating room", details: error.message });
  }
};


// @METHOD PUT
// API: http://localhost:5000/dashboard/room/:roomid

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { roomsid: req.params.id },
      req.body,
      { new: true }
    ).populate("roomtype");
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ error: "Error updating room" });
  }
};

// @METHOD DELETE
// API: http://localhost:5000/dashboard/room/:roomid

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ roomsid: req.params.id });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Error deleting room" });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
