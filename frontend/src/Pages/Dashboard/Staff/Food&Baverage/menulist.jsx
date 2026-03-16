import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { tokens } from "../../../../theme";
import Header from "../../../../Components/Dashboard/Header";
import axios from "axios";

// Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const MenuList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, [menuItems]);

  const deleteMenuItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:5000/dashboard/menu/${id}`
      );
      if (response.status === 200) {
        setMenuItems((prev) =>
          prev.filter((item) => item._id !== id)
        );
        toast.success("Menu item deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error("Failed to delete menu item.");
    }
  };

  const columns = [
    { field: "menuid", headerName: "ID", flex: 0.5 },
    {
      field: "foodimage",
      headerName: "Image",
      renderCell: ({ row: { foodimage } }) => (
        <Box
          component="img"
          src={foodimage || "default-image-url"} 
          alt="Food Image"
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
      field: "foodname",
      headerName: "Food Name",
      flex: 1,
    },
    {
      field: "foodcategory",
      headerName: "Category",
      flex: 1,
      valueGetter: (params) => params.row.foodcategory?.menucategoryname || "N/A",
    },
    {
      field: "foodprice",
      headerName: "Price",
      flex: 1,
      renderCell: ({ row: { foodprice } }) => (
        <Typography>
          {foodprice} rs
        </Typography>
      ),
    },
    {
      field: "fooddescription",
      headerName: "Description",
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => (
        <Box
          width="80%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={
            status === "available" ? colors.greenAccent[600] : colors.redAccent[700]
          }
          borderRadius="4px"
        >
          {status === "available" ? (
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
          {/* <IconButton
            onClick={() => {
              navigate(`/dashboard/staff/updatemenu/${row._id}`);
            }}
          >
            <EditOutlinedIcon />
          </IconButton> */}
          <IconButton
            onClick={() => {
              deleteMenuItem(row._id);
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
        <Header title="Menu List" subtitle="List of Menu Items" />

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
            onClick={() => navigate("/dashboard/staff/addmenu")}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add New Menu Item
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
          rows={menuItems}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default MenuList;
