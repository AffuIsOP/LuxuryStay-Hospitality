import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

// icons
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CleanHandsOutlinedIcon from "@mui/icons-material/CleanHandsOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import Header from "../../../Components/Dashboard/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const UserList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/user")
      .then((response) => {
        const dataWithIds = response.data.map((user) => ({
          id: user._id,
          ...user,
        }));
        setUserData(dataWithIds);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
        toast.error("Error fetching users. Please try again later.");
      });
  }, []);

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    setUserData((prevData) => prevData.filter((user) => user.id !== userId));

    axios
      .delete(`http://localhost:5000/admin/user/${userId}`)
      .then((response) => {
        toast.success("User deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user. Please try again.");
      });
  };

  const handleStatusUpdate = (userId, newStatus) => {
    // Find the updated user data in your local state (assuming the user data is already loaded)
    const updatedUser = userData.find(user => user.id === userId);
  
    if (!updatedUser) {
      console.error("User not found");
      return;
    }
  
    const updatedUserData = {
      ...updatedUser,
      status: newStatus,
    };
  
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  
    const url = `http://localhost:5000/admin/userstatus/${userId}`;
  
    axios
      .put(url, updatedUserData)
      .then(() => {
        toast.success("User status successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Failed to update user data. Please try again.");
      });
  };
  

  const columns = [
    {
      field: "userImage",
      headerName: "Image",
      renderCell: ({ row: { userImage } }) => (
        <Box
          component="img"
          src={userImage}
          alt="User Avatar"
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "useremail",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "userRole",
      headerName: "User Role",
      flex: 1.3,
      renderCell: ({ row: { userRole } }) => {
        const role = userRole?.userrole || "unknown";
        const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
        return (
          <Box
            width="60%"
            m="0 auto"
            p="2px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[700]
                : colors.greenAccent[600]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "staff" && <SecurityOutlinedIcon />}
            {role === "guest" && <LockOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {capitalizedRole}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "staffRole",
      headerName: "Staff Role",
      flex: 1.5,
      renderCell: ({ row: { staffRole } }) => {
        const role = staffRole ? staffRole.staffrole : "Not a staff";
        const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
        return (
          <Box
            width="65%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[600]
            }
            borderRadius="4px"
          >
            {role === "manager" && <PersonOutlineOutlinedIcon />}
            {role === "receptionist" && <PhoneOutlinedIcon />}
            {role === "housekeeping" && <CleanHandsOutlinedIcon />}
            {role === "maintenance" && <BuildOutlinedIcon />}
            {role === "food & beverage" && <LocalDiningOutlinedIcon />}
            {role === "Not a staff" && <PersonOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {capitalizedRole}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1.3,
      renderCell: ({ row }) => {
        const statusOptions = [
          {
            value: "active",
            label: "Active",
            icon: <CheckCircleOutlineIcon />,
          },
          {
            value: "pending",
            label: "Pending",
            icon: <WatchLaterOutlinedIcon />,
          },
          {
            value: "inactive",
            label: "Inactive",
            icon: <CancelOutlinedIcon />,
          },
        ];
    
        const getStatusStyles = (status) => {
          if (status === "active") {
            return {
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
            };
          } else if (status === "pending") {
            return {
              backgroundColor: colors.yellowAccent[700],
              color: colors.grey[100],
            };
          } else {
            return {
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
            };
          }
        };
    
        const styles = getStatusStyles(row.status);
    
        // Check if the userRole is "staff", and filter the options based on that
        const filteredStatusOptions = row.userRole.userrole === "staff"
          ? statusOptions
          : statusOptions.filter(option => option.value !== "pending"); // Exclude "pending" if not "staff"
    
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Box
              sx={{
                width: "80%",
                borderRadius: "4px",
                backgroundColor: styles.backgroundColor,
                textAlign: "center",
              }}
            >
              <Select
                value={row.status}
                onChange={(event) =>
                  handleStatusUpdate(row.id, event.target.value)
                }
                sx={{
                  color: styles.color,
                  "& .MuiSelect-icon": {
                    color: styles.color,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                {filteredStatusOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {option.icon}
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        );
      },
    },
    

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="space-around">
          {/* <IconButton
            onClick={() => {
              navigate(`/dashboard/admin/updateuserrole/${row.id}`);
            }}
          >
            <EditOutlinedIcon />
          </IconButton> */}
          <IconButton onClick={() => handleDeleteUser(row.id)}>
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="18px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="User List" subtitle="Managing the Team Members" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
            onClick={() => navigate("/dashboard/admin/adduser")}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add New User
          </Button>
        </Box> */}
      </Box>
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {loading ? (
          <Typography variant="h6" color={colors.grey[300]}>
            Loading data...
          </Typography>
        ) : (
          <DataGrid rows={userData} columns={columns} />
        )}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default UserList;
