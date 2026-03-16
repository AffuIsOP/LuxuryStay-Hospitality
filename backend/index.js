const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { dbConn } = require("./Config/db");
const session = require("express-session");

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
    },
  })
);

const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  // login functions
  VerifyEmail,
  LoginUser,
  getDashboard,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("./Controller/UsersController"); // import user controller

// const { uploadImage } = require("./Middleware/CloudImage");
//
const { uploadImage } = require("./Middleware/CloudImage"); // import cloudinary image middleware
const userAuth = require("./Middleware/UserAuth"); // import user auth middleware

app.route("/user").get(getUsers).post(uploadImage, addUser);
app.route("/user/:id").delete(deleteUser).put(updateUser);

//login route:

app.route("/dashboard").get(userAuth, getDashboard);
app.route("/verifyEmail").post(VerifyEmail);
app.route("/user/loginuser").post(LoginUser);
app.route("/user/forgotPassword").post(forgotPassword);
app.route("/user/verifyOtp").post(verifyOtp);
app.route("/user/resetPassword").post(resetPassword);

const {
  adminUserList,
  adminUpdateStatus,
  adminAddUser,
  adminUserDelete,
} = require("./Controller/AdminUserController"); // import user controller

// admin route:
// http://localhost:5000/admin/user

app.route("/admin/user").get(adminUserList).post(adminAddUser);

// http://localhost:5000/admin/userstatus/:id

app.route("/admin/userstatus/:id").put(adminUpdateStatus);

// http://localhost:5000/admin/user:id
app.route("/admin/user/:id").delete(adminUserDelete);

const {
  getUserRoles,
  getUserRoleById,
  addUserRole,
  updateUserRole,
  deleteUserRole,
} = require("./Controller/UserRoleController"); // import user role controller

app.route("/admin/userrole").get(getUserRoles).post(addUserRole);
app
  .route("/admin/userrole/:id")
  .get(getUserRoleById)
  .delete(deleteUserRole)
  .put(updateUserRole);

const {
  getStaff,
  getStaffRoleById,
  addStaff,
  updateStaff,
  deleteStaff,
} = require("./Controller/StaffRoleController"); // import staff role controller

app.route("/admin/staffrole").get(getStaff).post(addStaff);
app
  .route("/admin/staffrole/:id")
  .get(getStaffRoleById)
  .delete(deleteStaff)
  .put(updateStaff);

const {
  getRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("./Controller/RoomController"); // import room controller

// @METHOD GET
// API: http://localhost:5000/dashboard/room
app.route("/dashboard/room").get(getRooms).post(createRoom);

// @METHOD GET, PUT, DELETE
// API: http://localhost:5000/dashboard/room/:id
app
  .route("/dashboard/room/:id")
  .get(getRoomById)
  .put(updateRoom)
  .delete(deleteRoom);

const {
  getAllRoomTypes,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  deleteRoomType,
} = require("./Controller/RoomTypeController"); // import room type controller

// @METHOD GET
// API: http://localhost:5000/dashboard/roomtypes
app.route("/dashboard/roomtypes").get(getAllRoomTypes).post(createRoomType);

// @METHOD GET, PUT, DELETE
// API: http://localhost:5000/dashboard/roomtypes/:id
app
  .route("/dashboard/roomtypes/:id")
  .get(getRoomTypeById)
  .put(updateRoomType)
  .delete(deleteRoomType);

const {
  getAllMenu,
  getMenuById,
  createMenu,
  deleteMenu,
} = require("./Controller/MenuController"); // import menu controller

// @METHOD GET
// API: http://localhost:5000/dashboard/menu
app.route("/dashboard/menu").get(getAllMenu).post(createMenu);

// @METHOD GET, PUT, DELETE
// API: http://localhost:5000/dashboard/menu/:id
app.route("/dashboard/menu/:id").get(getMenuById).delete(deleteMenu);
// .put(updateMenuCategory)

const {
  getAllMenuCategories,
  getMenuCategoryById,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} = require("./Controller/MenuCatController"); // import menu category controller

// @METHOD GET
// API: http://localhost:5000/dashboard/menucat
app
  .route("/dashboard/menucat")
  .get(getAllMenuCategories)
  .post(createMenuCategory);

// @METHOD GET, PUT, DELETE
// API: http://localhost:5000/dashboard/menucat/:id
app
  .route("/dashboard/menucat/:id")
  .get(getMenuCategoryById)
  .put(updateMenuCategory)
  .delete(deleteMenuCategory);

app.listen(process.env.PORT, function () {
  console.log(`Server is running at: http://localhost:${process.env.PORT}/`);
  dbConn();
});
