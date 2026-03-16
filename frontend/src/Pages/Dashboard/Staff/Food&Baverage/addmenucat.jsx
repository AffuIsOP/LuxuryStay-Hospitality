import React from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Header from "../../../../Components/Dashboard/Header";
import { toast, ToastContainer } from "react-toastify";

const validationSchema = yup.object().shape({
  menucategoryname: yup.string().required("Menu Category Name is required"),
  status: yup.string().required("Status is required"),
});

const initialValues = {
  menucategoryname: "",
  description: "",
  status: "",
};

const AddMenuCat = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/dashboard/menucat", 
        values
      );

      if (response.status === 201) {
        toast.success("Menu Category added successfully");
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        console.error("Error adding menu category:", error);
        toast.error("Failed to add menu category. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD MENU CATEGORY" subtitle="Create a New Menu Category" />

      <Formik
        initialValues={initialValues}
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
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Menu Category Name */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Menu Category Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.menucategoryname}
                name="menucategoryname"
                error={!!touched.menucategoryname && !!errors.menucategoryname}
                helperText={touched.menucategoryname && errors.menucategoryname}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Description */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
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
                {isSubmitting ? "Please wait..." : "Add Menu Category"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default AddMenuCat;
