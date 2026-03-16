import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Header from "../../../../Components/Dashboard/Header";
import { toast, ToastContainer } from "react-toastify";

// Validation schema
const validationSchema = yup.object().shape({
  menucategoryname: yup.string().required("Category name is required"),
  status: yup.string().required("Status is required"),
});

const UpdateMenuCat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuCategory, setMenuCategory] = useState(null);

  useEffect(() => {
    const fetchMenuCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/dashboard/menucat/${id}`
        );
        setMenuCategory(response.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching menu category:", error);
        toast.error("Failed to fetch menu category.");
      }
    };

    fetchMenuCategory();
  }, [id]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/dashboard/menucat/${id}`,
        values
      );

      if (response.status === 200) {
        navigate("/dashboard/staff/menucatlist");
        toast.success("Menu category updated successfully!");
      }
    } catch (error) {
      console.error("Error updating menu category:", error);
      toast.error("Failed to update menu category.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!menuCategory) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Header
        title="Update Menu Category"
        subtitle="Edit Menu Category Details"
      />

      <Formik
        initialValues={{
          menucategoryname: menuCategory.menucategoryname,
          description: menuCategory.description,
          status: menuCategory.status,
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              {/* Menu Category Name */}
              <TextField
                fullWidth
                variant="filled"
                label="Menu Category Name"
                name="menucategoryname"
                value={values.menucategoryname}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.menucategoryname && !!errors.menucategoryname}
                helperText={touched.menucategoryname && errors.menucategoryname}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Description */}
              <TextField
                fullWidth
                variant="filled"
                label="Description"
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                multiline
                rows={4}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Status */}
              <TextField
                fullWidth
                select
                variant="filled"
                label="Status"
                name="status"
                value={values.status}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Update Menu Category"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default UpdateMenuCat;
