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
  userrole: yup.string().required("Role name is required"),
  userroledescription: yup.string().required("Role description is required"),
  status: yup.string().required("Role status is required"),
});

const UpdateUserRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [roleData, setRoleData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/userrole/${id}`)
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch user role data.");
      });
  }, [id]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/userrole/${id}`,
        values
      );

      if (response.status === 200) {
        toast.success("User role updated successfully");
        navigate("/dashboard/admin/userrolelist");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error("Failed to update user role. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!roleData) {
    return (
      <Box m="20px">
        <Header title="UPDATE USER ROLE" subtitle="Update an Existing User Role" />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const initialValues = {
    userrole: roleData.userrole || "",
    userroledescription: roleData.userroledescription || "",
    status: roleData.status || "",
  };

  return (
    <Box m="20px">
      <Header title="UPDATE USER ROLE" subtitle="Update an Existing User Role" />

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
                label="Update User Role"
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
                label="Update User Role Description"
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
                {isSubmitting ? "Please wait..." : "Update User Role"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default UpdateUserRole;
