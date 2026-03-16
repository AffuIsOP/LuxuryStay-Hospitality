import { Box, IconButton, useTheme, Popover, Typography, MenuItem, InputBase } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You have a new message" },
    { id: 2, message: "Your order has been shipped" },
    { id: 3, message: "System update available" },
  ]);

  const handleNotificationMenuClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
    handleUserMenuClose();
  };

  const handleViewProfile = () => {
    console.log("View Profile clicked");
    handleUserMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
    handleUserMenuClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleNotificationMenuClick}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleUserMenuClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* Notification Dropdown using Popover */}
      <Popover
        open={Boolean(notificationsAnchorEl)}
        anchorEl={notificationsAnchorEl}
        onClose={handleNotificationMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right", 
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            maxHeight: "300px",
            width: "250px", 
            backgroundColor: colors.primary[400],
            borderRadius: "10px",
            boxShadow: 3, 
            overflowY: "auto",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        <Box p={1}>
          <Typography variant="h6" color={colors.grey[100]} mb={2}>
            Notifications
          </Typography>

          {/* Notification items */}
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body2" color={colors.grey[100]}>
                {notification.message}
              </Typography>
              <IconButton
                onClick={() => handleDeleteNotification(notification.id)}
                size="small"
                sx={{ color: colors.grey[500] }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          ))}
        </Box>
      </Popover>

      {/* User Menu Dropdown */}
      <Popover
        open={Boolean(userMenuAnchorEl)}
        anchorEl={userMenuAnchorEl}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right", // Position it to the right of the user icon
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right", // Ensure it transforms correctly
        }}
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[400],
            borderRadius: "10px",
            boxShadow: 3,
          },
        }}
      >
        <Box p={1}>
          <MenuItem onClick={handleEditProfile}>
            Edit Profile
          </MenuItem>
          <MenuItem onClick={handleViewProfile}>
            View Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Box>
      </Popover>
    </Box>
  );
};

export default Topbar;
