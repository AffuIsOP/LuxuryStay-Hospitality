import React, { useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Header from "../../../Components/Dashboard/Header";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = yup.object().shape({
  staffrole: yup.string().required("Role name is required"),
  staffroledescription: yup.string().required("Role description is required"),
  status: yup.string().required("Role status is required"),
});

const UpdateStaffRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [roleData, setRoleData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/staffrole/${id}`)
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch staff role data.");
      });
  }, [id]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/staffrole/${id}`,
        values
      );

      if (response.status === 200) {
        toast.success("Staff role updated successfully");
        navigate("/dashboard/admin/staffrolelist");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error("Failed to update staff role. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!roleData) {
    return (
      <Box m="20px">
        <Header title="UPDATE STAFF ROLE" subtitle="Update an Existing Staff Role" />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const initialValues = {
    staffrole: roleData.staffrole || "",
    staffroledescription: roleData.staffroledescription || "",
    status: roleData.status || "",
  };

  return (
    <Box m="20px">
      <Header title="UPDATE STAFF ROLE" subtitle="Update an Existing Staff Role" />

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
                label="Update Staff Role"
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
                label="Update Staff Role Description"
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

              {/* Status */}
              <TextField
                fullWidth
                select
                variant="filled"
                label="Update Status"
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
                {isSubmitting ? "Please wait..." : "Update Staff Role"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default UpdateStaffRole;
