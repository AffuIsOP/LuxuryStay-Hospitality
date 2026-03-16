import React from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Header from "../../../Components/Dashboard/Header";
import { toast, ToastContainer } from "react-toastify";

const validationSchema = yup.object().shape({
  staffrole: yup.string().required("Role name is required"),
  staffroledescription: yup.string().required("Role description is required"),
  status: yup.string().required("Role status is required"),
});

const initialValues = {
  staffrole: "",
  staffroledescription: "",
  status: "",
};

const AddStaffRole = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/staffrole",
        values
      );

      if (response.status === 201) {
        toast.success("Staff role added successfully");
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        console.error("Error adding staff role:", error);
        toast.error("Failed to add staff role. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD STAFF ROLE" subtitle="Create a New Staff Role" />

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
              {/* Staff Role */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Staff Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.staffrole}
                name="staffrole"
                error={!!touched.staffrole && !!errors.staffrole}
                helperText={touched.staffrole && errors.staffrole}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Staff Role Description */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Staff Role Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.staffroledescription}
                name="staffroledescription"
                error={
                  !!touched.staffroledescription && !!errors.staffroledescription
                }
                helperText={
                  touched.staffroledescription && errors.staffroledescription
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
                {isSubmitting ? "Please wait..." : "Add Staff Role"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default AddStaffRole;
