import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../Components/Dashboard/Header";
import * as yup from "yup";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";

// Validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phonenumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number can only contain numbers")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone number is required"),
  userRole: yup.string().required("User role is required"),
  userImage: yup.mixed().nullable().required("User image is required"),
  staffRole: yup.string().nullable(),
});

// Initial values
const initialValues = {
  name: "",
  email: "",
  password: "",
  phonenumber: "",
  userRole: "",
  userImage: null,
  staffRole: "",
};

const AddUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [userRoles, setUserRoles] = useState([]);
  const [staffRoles, setStaffRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const [userRolesResponse, staffRolesResponse] = await Promise.all([
          axios.get("http://localhost:5000/admin/userrole"),
          axios.get("http://localhost:5000/admin/staffrole"),
        ]);
        setUserRoles(userRolesResponse.data);
        setStaffRoles(staffRolesResponse.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("Username", values.name);
    formData.append("useremail", values.email);
    formData.append("userpassword", values.password);
    formData.append("phoneNumber", values.phonenumber);
    formData.append("userRole", values.userRole.userroleid);

    if (values.staffRole) {
      formData.append("staffRole", values.staffRole.staffroleid);
    }

    if (values.userImage) {
      formData.append("userImage", values.userImage);
    }

    try {
      const response = await fetch("http://localhost:5000/admin/adduser", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Parse error response from the server
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        alert(`Failed to create user: ${errorData.message || "Unknown error"}`);
        return;
      }

      // Successful response
      const data = await response.json();
      console.log("User successfully created:", data);
      alert("User successfully created!");
    } catch (error) {
      console.error("Error during user creation:", error);
      alert("Failed to create user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
          setFieldValue,
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
              {/* Avatar Upload */}
              <Box
                display="flex"
                justifyContent="center"
                sx={{ gridColumn: "span 4" }}
              >
                <label htmlFor="userImage">
                  <input
                    type="file"
                    id="userImage"
                    name="userImage"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setFieldValue("userImage", e.target.files[0])
                    }
                  />
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      cursor: "pointer",
                      backgroundColor: "#f0f0f0",
                    }}
                    src={
                      values.userImage
                        ? URL.createObjectURL(values.userImage)
                        : ""
                    }
                  >
                    {!values.userImage && (
                      <CameraAltIcon sx={{ color: "gray" }} />
                    )}
                  </Avatar>
                </label>
                {touched.userImage && errors.userImage && (
                  <Box color="error.main" mt={1}>
                    {errors.userImage}
                  </Box>
                )}
              </Box>

              {/* Form Fields */}
              <TextField
                fullWidth
                variant="filled"
                label="Name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Phone Number"
                name="phonenumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phonenumber}
                error={!!touched.phonenumber && !!errors.phonenumber}
                helperText={touched.phonenumber && errors.phonenumber}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>User Role</InputLabel>
                <Select
                  value={values.userRole}
                  name="userRole"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.userRole && !!errors.userRole}
                >
                  {userRoles.map((role) => (
                    <MenuItem key={role.userroleid} value={role.userroleid}>
                      {role.userrole}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ gridColumn: "span 2" }}
                disabled={!values.userRole}
              >
                <InputLabel>Staff Role</InputLabel>
                <Select
                  value={values.staffRole}
                  name="staffRole"
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {staffRoles.map((role) => (
                    <MenuItem key={role.staffroleid} value={role.staffroleid}>
                      {role.staffrole}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Create New User"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddUser;
