import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import BedroomParentOutlinedIcon from "@mui/icons-material/BedroomParentOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";


const { jwtDecode } = require("jwt-decode");

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard/";

  const [userimage, setUserImage] = useState(null);
  const [username, setUserName] = useState(null);
  const [userrole, setUserrole] = useState(null);
  const [staffRoles, setStaffRoles] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserImage(decodedToken.userimage);
      setUserName(decodedToken.username);
      setUserrole(decodedToken.userrole);
      setStaffRoles(decodedToken.staffRoles || null);
    }
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          height: isDashboardPage ? "100%" : "100vh",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  LuxuryStay
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={userimage}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {username ? username[0].toUpperCase() + username.slice(1) : ""}

                </Typography>

                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Role:{" "}
                  {staffRoles
                    ? staffRoles[0].toUpperCase() +
                      staffRoles.slice(1).toLowerCase()
                    : userrole &&
                      userrole[0].toUpperCase() +
                        userrole.slice(1).toLowerCase()}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>

            {userrole === "admin" && (
              <>
                <Item
                  title="User Management"
                  to="/dashboard/admin/userlist"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="User Role Management"
                  to="/dashboard/admin/userrolelist"
                  icon={<BadgeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Staff Role Management"
                  to="/dashboard/admin/staffrolelist"
                  icon={<BadgeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Room Management"
                  to="/dashboard/admin/roomlist"
                  icon={<KingBedOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Type Management"
                  to="/dashboard/admin/roomtypelist"
                  icon={<BedroomParentOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {userrole === "staff" && (
              <>
                {staffRoles.includes("manager") && (
                  <>
                    <Item
                      title="Manager Dashboard"
                      to="/dashboard/manager"
                      icon={<HomeOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Team Management"
                      to="/dashboard/team"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}

                {staffRoles.includes("receptionist") && (
                  <>
                    <Item
                      title="Supervisor Dashboard"
                      to="/dashboard/supervisor"
                      icon={<HomeOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Supervisor Reports"
                      to="/dashboard/supervisor/reports"
                      icon={<ContactsOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}

                {staffRoles.includes("housekeeping") && (
                  <>
                    <Item
                      title="Sales affu"
                      to="/dashboard/Form"
                      icon={<HomeOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Sales table1"
                      to="/dashboard/table1"
                      icon={<ContactsOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}

                {staffRoles.includes("maintenance") && (
                  <>
                    <Item
                      title="Support Dashboard"
                      to="/dashboard/support"
                      icon={<HomeOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Support Tickets"
                      to="/dashboard/support/tickets"
                      icon={<ContactsOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}

                {staffRoles.includes("food & baverage") && (
                  <>
                    <Item
                      title="Menu"
                      to="/dashboard/staff/menulist"
                      icon={<RestaurantMenuOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Menu Category"
                      to="/dashboard/staff/menucatlist"
                      icon={<SoupKitchenOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Food Orders"
                      to="/dashboard/staff/foodorderlist"
                      icon={<FastfoodOutlinedIcon />} 
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
