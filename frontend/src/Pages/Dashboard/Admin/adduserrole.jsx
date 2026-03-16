import React from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Header from "../../../Components/Dashboard/Header";
import { toast, ToastContainer } from "react-toastify";

const validationSchema = yup.object().shape({
  userrole: yup.string().required("Role name is required"),
  userroledescription: yup.string().required("Role description is required"),
  status: yup.string().required("Role status is required"),
});

const initialValues = {
  userrole: "",
  userroledescription: "",
  status: "",
};

const AddUserRole = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Handle form submission
  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/userrole",
        values
      );

      if (response.status === 201) {
        toast.success("User role added successfully");
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        console.error("Error adding user role:", error);
        toast.error("Failed to add user role. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD USER ROLE" subtitle="Create a New User Role" />

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
              {/* User Role */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userrole}
                name="userrole"
                error={!!touched.userrole && !!errors.userrole}
                helperText={touched.userrole && errors.userrole}
                sx={{ gridColumn: "span 4" }}
              />

              {/* User Role Description */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Role Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userroledescription}
                name="userroledescription"
                error={
                  !!touched.userroledescription && !!errors.userroledescription
                }
                helperText={
                  touched.userroledescription && errors.userroledescription
                }
                multiline
                rows={4}
                sx={{ gridColumn: "span 4" }}
              />

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
                {isSubmitting ? "Please wait..." : "Add User Role"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
    
  );
};

export default AddUserRole;
