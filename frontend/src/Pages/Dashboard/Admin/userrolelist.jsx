import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Icons
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import Header from "../../../Components/Dashboard/Header";

const UserRoleList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [userRoleData, setUserRoleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/admin/userrole")
      .then((response) => {
        const dataWithIds = response.data.map((role) => ({
          id: role._id,
          ...role,
        }));
        setUserRoleData(dataWithIds);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user roles:", error);
        setLoading(false);
        toast.error("Error fetching user roles. Please try again later.");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUserRole = async (userroleId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/userrole/${userroleId}`
      );
      if (response.status === 200) {
        setUserRoleData((prevData) =>
          prevData.filter((role) => role.id !== userroleId)
        );
        toast.success("User role deleted successfully");

        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error("Error deleting user role");
      }
    }
  };

  const columns = [
    {
      field: "userroleid",
      headerName: "ID",
    },
    {
      field: "userrole",
      headerName: "User Role",
      flex: 1,
      renderCell: ({ row: { userrole } }) => (
        <Typography color={colors.grey[100]}>
          {userrole.charAt(0).toUpperCase() + userrole.slice(1)}
        </Typography>
      ),
    },
    {
      field: "userroledescription",
      headerName: "Role Description",
      flex: 1,
      renderCell: ({ row: { userroledescription } }) => (
        <Typography color={colors.grey[100]}>
          {userroledescription.charAt(0).toUpperCase() +
            userroledescription.slice(1)}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => (
        <Box
          width="40%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={
            status === "active"
              ? colors.greenAccent[600]
              : colors.redAccent[700]
          }
          borderRadius="4px"
        >
          {status === "active" ? (
            <CheckCircleOutlineIcon
              sx={{ color: colors.greenAccent[200], mr: "5px" }}
            />
          ) : (
            <CancelOutlinedIcon
              sx={{ color: colors.redAccent[300], mr: "5px" }}
            />
          )}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="space-around">
          <IconButton
            onClick={() => {
              navigate(`/dashboard/admin/updateuserrole/${row.userroleid}`);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              deleteUserRole(row.userroleid);
            }}
          >
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
        <Header title="User Role List" subtitle="Managing User Roles" />

        <Box>
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
            onClick={() => navigate("/dashboard/admin/adduserrole")}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add New Role
          </Button>
        </Box>
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
          <DataGrid
            rows={userRoleData}
            columns={columns}
            getRowId={(row) => row._id}
          />
        )}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default UserRoleList;
