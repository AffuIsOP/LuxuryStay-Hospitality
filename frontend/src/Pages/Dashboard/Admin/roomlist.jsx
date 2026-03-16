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
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

const RoomList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/room"
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [rooms]);

  const deleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:5000/dashboard/room/${id}`
      );
      if (response.status === 200) {
        setRooms((prev) => prev.filter((room) => room.roomsid !== id));
        toast.success("Room deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room.");
    }
  };

  const columns = [
    { field: "roomsid", headerName: "ID", flex: 0.5 },
    {
      field: "roomimage",
      headerName: "Image",
      flex: 0.6,
      renderCell: ({ row: { roomimage } }) => (
        <Box
          component="img"
          src={roomimage}
          alt="User Avatar"
          sx={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "roomnumber",
      headerName: "Room Number",
      flex: 1,
    },
    {
      field: "roomtype",
      headerName: "Room Type",
      flex: 1,
      valueGetter: (params) => params.row.roomtype?.roomtypename,
    },
    {
      field: "roomprice",
      headerName: "Price",
      flex: 1,
      valueFormatter: ({ value }) => `${value.toFixed(2)} rs`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        const statusOptions = {
          available: {
            label: "Available",
            icon: (
              <CheckCircleOutlineIcon
                sx={{ color: colors.greenAccent[700], mr: "5px" }}
              />
            ),
            bgColor: colors.greenAccent[100],
          },
          occupied: {
            label: "Occupied",
            icon: (
              <CancelOutlinedIcon
                sx={{ color: colors.redAccent[700], mr: "5px" }}
              />
            ),
            bgColor: colors.redAccent[100],
          },
          maintenance: {
            label: "Maintenance",
            icon: (
              <BuildCircleIcon
                sx={{ color: colors.yellowAccent[700], mr: "5px" }}
              />
            ),
            bgColor: colors.yellowAccent[100],
          },
        };

        const { icon, bgColor } = statusOptions[status] || {
          icon: (
            <CancelOutlinedIcon
              sx={{ color: colors.grayAccent[300], mr: "5px" }}
            />
          ),
          bgColor: colors.grayAccent[600],
        };

        return (
          <Box
            width="60%"
            margin="0 auto"
            padding="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={bgColor}
            borderRadius="4px"
          >
            {icon}
            <Typography color={colors.grey[900]} sx={{ ml: "5px" }}>
              {status || "Unknown"}
            </Typography>
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
          <IconButton
            onClick={() => {
              navigate(`/dashboard/admin/updateroom/${row.roomsid}`);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              deleteRoom(row.roomsid);
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
        <Header title="Room List" subtitle="List of Rooms in Your Facility" />
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
            onClick={() => navigate("/dashboard/admin/addroom")}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add New Room
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
          rows={rooms}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.roomsid}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default RoomList;
