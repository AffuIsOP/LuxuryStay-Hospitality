import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Common Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";

// General Pages
import Error404 from "./Pages/Error404";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import FAQs from "./Pages/FAQs";
import Contact from "./Pages/Contact";
import Restaurant from "./Pages/Restaurant";
import Menu from "./Pages/Menu";
import Room from "./Pages/Room";
import RoomDetails from "./Pages/RoomDetails";
import Otpverification from "./Pages/OtpVerification";
import EmailOtpVerification from "./Pages/EmailOtpVerification";
import Forgetpass from "./Pages/Forgetpass";
import ResetPassword from "./Pages/ResetPassword";

// Dashboard Components

import Topbar from "./Components/Dashboard/Topbar";
import Sidebar from "./Components/Dashboard/Sidebar";

// Dashboard Pages
import Dashboard from "./Pages/Dashboard/dashboard";
// Admin Pages
import UserList from "./Pages/Dashboard/Admin/userlist";
import AddUser from "./Pages/Dashboard/Admin/adduser";

import UserRoleList from "./Pages/Dashboard/Admin/userrolelist";
import AddUserRole from "./Pages/Dashboard/Admin/adduserrole";
import UpdateUserRole from "./Pages/Dashboard/Admin/updateuserrole";

import StaffRoleList from "./Pages/Dashboard/Admin/staffrolelist";
import AddStaffRole from "./Pages/Dashboard/Admin/addstaffrole";
import UpdateStaffRole from "./Pages/Dashboard/Admin/updatestaffrole";

import RoomList from "./Pages/Dashboard/Admin/roomlist";
import AddRoom from "./Pages/Dashboard/Admin/addroom";
import UpdateRoom from "./Pages/Dashboard/Admin/updateroom";

import RoomTypeList from "./Pages/Dashboard/Admin/roomtypelist";
import AddRoomType from "./Pages/Dashboard/Admin/addroomtype";
import UpdateRoomType from "./Pages/Dashboard/Admin/updateroomtype";

import MenuList from "./Pages/Dashboard/Staff/Food&Baverage/menulist";
import AddMenu from "./Pages/Dashboard/Staff/Food&Baverage/addmenu";

import MenuCatList from "./Pages/Dashboard/Staff/Food&Baverage/menucatlist";
import AddMenuCat from "./Pages/Dashboard/Staff/Food&Baverage/addmenucat";
import UpdateMenuCat from "./Pages/Dashboard/Staff/Food&Baverage/updatemenucat";

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Private Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <div
                    className="app"
                    style={{
                      display: "flex",
                      position: "relative",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Sidebar isSidebar={isSidebar} />
                    <main
                      className="content"
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Topbar setIsSidebar={setIsSidebar} />
                      <Routes>
                        <Route path="/" element={<Dashboard />} />

                        {/* Admin Paths */}
                        <Route path="/admin/userlist" element={<UserList />} />
                        <Route path="/admin/adduser" element={<AddUser />} />

                        <Route
                          path="/admin/userrolelist"
                          element={<UserRoleList />}
                        />
                        <Route
                          path="/admin/adduserrole"
                          element={<AddUserRole />}
                        />
                        <Route
                          path="/admin/updateuserrole/:id"
                          element={<UpdateUserRole />}
                        />

                        <Route
                          path="/admin/staffrolelist"
                          element={<StaffRoleList />}
                        />
                        <Route
                          path="/admin/addstaffrole"
                          element={<AddStaffRole />}
                        />
                        <Route
                          path="/admin/updatestaffrole/:id"
                          element={<UpdateStaffRole />}
                        />

                        <Route path="/admin/roomlist" element={<RoomList />} />
                        <Route path="/admin/addroom" element={<AddRoom />} />
                        <Route
                          path="/admin/updateroom/:id"
                          element={<UpdateRoom />}
                        />

                        <Route
                          path="/admin/roomtypelist"
                          element={<RoomTypeList />}
                        />
                        <Route
                          path="/admin/addroomtype"
                          element={<AddRoomType />}
                        />
                        <Route
                          path="/admin/updateroomtype/:id"
                          element={<UpdateRoomType />}
                        />

                        {/* Staff Paths -- Food & Baverages */}
                        <Route path="/staff/menulist" element={<MenuList />} />
                        <Route path="/staff/addmenu" element={<AddMenu />} />

                        <Route
                          path="/staff/menucatlist"
                          element={<MenuCatList />}
                        />
                        <Route
                          path="/staff/addmenucat"
                          element={<AddMenuCat />}
                        />
                        <Route
                          path="/staff/updatemenucat/:id"
                          element={<UpdateMenuCat />}
                        />

                        <Route
                          path="/staff/foodorderlist"
                          element={<RoomTypeList />}
                        />
                      </Routes>
                    </main>
                    <ToastContainer />
                  </div>
                </ThemeProvider>
              </ColorModeContext.Provider>
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="*"
          element={
            <>
              <div className="page-wrapper">
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/room" element={<Room />} />
                  <Route path="/roomdetails/:id" element={<RoomDetails />} />
                  <Route path="/restaurant" element={<Restaurant />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/faq" element={<FAQs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/emailotpverification"
                    element={<EmailOtpVerification />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgetpass" element={<Forgetpass />} />
                  <Route
                    path="/otpverification"
                    element={<Otpverification />}
                  />
                  <Route path="/resetpassword" element={<ResetPassword />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
                <Footer />
              </div>

              <Link
                className="scroll-to-target scroll-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="scroll-to-top__text">Back to Top</span>
                <span className="scroll-to-top__wrapper">
                  <span className="scroll-to-top__inner"></span>
                </span>
              </Link>
            </>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
