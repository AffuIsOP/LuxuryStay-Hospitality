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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const MenuCatList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [menuCategories, setMenuCategories] = useState([]);

  useEffect(() => {
    const fetchMenuCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/menucat"
        );
        setMenuCategories(response.data);
      } catch (error) {
        console.error("Error fetching menu categories:", error);
      }
    };

    fetchMenuCategories();
  }, [menuCategories]);

  const deleteMenuCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu category?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:5000/dashboard/menucat/${id}`
      );
      if (response.status === 200) {
        setMenuCategories((prev) =>
          prev.filter((category) => category.menucategoryid !== id)
        );
        toast.success("Menu category deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting menu category:", error);
      toast.error("Failed to delete menu category.");
    }
  };

  const columns = [
    { field: "menucategoryid", headerName: "ID", flex: 0.5 },
    {
      field: "menucategoryname",
      headerName: "Menu Category Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
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
            status === "active" ? colors.greenAccent[600] : colors.redAccent[700]
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
              navigate(`/dashboard/staff/updatemenucat/${row.menucategoryid}`);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              deleteMenuCategory(row.menucategoryid);
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
          title="Menu Category List"
          subtitle="List of Menu Categories"
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
            onClick={() => navigate("/dashboard/staff/addmenucat")}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add New Category
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
          rows={menuCategories}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.menucategoryid}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default MenuCatList;
