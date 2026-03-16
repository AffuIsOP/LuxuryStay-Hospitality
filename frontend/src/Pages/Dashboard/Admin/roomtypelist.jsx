import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { tokens } from "../../../theme";
import Header from "../../../Components/Dashboard/Header";
import axios from "axios";

// Icons
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const RoomTypeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [roomTypes, setRoomTypes] = useState([]);

  // Fetch room types data from the API
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/roomtypes"
        );
        setRoomTypes(response.data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, [roomTypes]);

  const deleteRoomType = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room type?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:5000/dashboard/roomtypes/${id}`
      );
      if (response.status === 200) {
        setRoomTypes((prev) => prev.filter((room) => room.roomtypeid !== id));
        toast.success("Room type deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting room type:", error);
      toast.error("Failed to delete room type.");
    }
  };
  

  const columns = [
    { field: "roomtypeid", headerName: "ID", flex: 0.5 },
    {
      field: "roomtypename",
      headerName: "Room Type Name",
      flex: 1,
    },
    {
      field: "roomtypedescription",
      headerName: "Room Type Description",
      flex: 2,
    },
    {
      field: "roomtypeprice",
      headerName: "Price",
      flex: 1,
      valueFormatter: ({ value }) => `${value.toFixed(2)} rs`, 
    },
    {
      field: "roomstatus",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { roomstatus } }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={
            roomstatus === "active"
              ? colors.greenAccent[600]
              : colors.redAccent[700]
          }
          borderRadius="4px"
        >
          {roomstatus === "active" ? (
            <CheckCircleOutlineIcon
              sx={{ color: colors.greenAccent[200], mr: "5px" }}
            />
          ) : (
            <CancelOutlinedIcon
              sx={{ color: colors.redAccent[300], mr: "5px" }}
            />
          )}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {roomstatus.charAt(0).toUpperCase() + roomstatus.slice(1)}
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
              navigate(`/dashboard/admin/updateroomtype/${row.roomtypeid}`);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
          onClick={() => {
              deleteRoomType(row.roomtypeid);
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
        <Header
          title="Room Type List"
          subtitle="List of Room Types for Your Facility"
        />

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
            onClick={() => navigate("/dashboard/admin/addroomtype")}
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={roomTypes}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.roomtypeid}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default RoomTypeList;
