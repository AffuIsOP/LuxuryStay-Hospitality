import React, { useState, useEffect } from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../Components/Dashboard/Header";
import { toast, ToastContainer } from 'react-toastify';

import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Validation schema
const validationSchema = yup.object().shape({
  roomimage: yup.mixed().nullable().required("Room image is required"),
  roomnumber: yup
    .string()
    .matches(/^\d{4}$/, "Room number must be exactly 4 digits") // Ensure 4-digit number
    .required("Room number is required"),
  description: yup.string().required("Room description is required"),
  roomprice: yup
    .number()
    .typeError("Room price must be a valid number") // Ensure it's a valid number
    .min(0, "Room price must be a positive number")
    .required("Room price is required"),
  roomtype: yup.string().required("Room type is required"),
  status: yup.string().required("Room status is required"),
});

// Initial values
const initialValues = {
  roomimage: null,
  roomnumber: "",
  description: "",
  roomprice: "",
  roomtype: "",
  status: "",
};

const AddRoom = () => {
  const navigate = useNavigate();

  const [roomTypes, setRoomTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch room types from the API
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/roomtypes"
        );

        const activeRoomTypes = response.data.filter(
          (roomType) => roomType.roomstatus === "active"
        );
        setRoomTypes(activeRoomTypes);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
  
    // Create a new FormData instance
    const formData = new FormData();
    formData.append("roomnumber", values.roomnumber);
    formData.append("roomprice", values.roomprice);
    formData.append("status", values.status);
    formData.append("roomtype", values.roomtype);
    formData.append("description", values.description);
  
    if (values.roomimage) {
      formData.append("roomImage", values.roomimage);
    }
  
    try {
      const response = await fetch("http://localhost:5000/dashboard/room", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to create room");
      }
  
      await response.json();
      navigate("/dashboard/admin/roomlist");
      toast.success("Room successfully created!");
    } catch (error) {
      console.error("Error during room creation:", error);
      toast.error("Failed to create room.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <Box m="15px 15px 0 15px">
      <Header title="CREATE ROOM" subtitle="Create a New Room" />

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
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 4" },
              }}
            >
              {/* Room Image */}
              <Box
                display="flex"
                justifyContent="center"
                sx={{ gridColumn: "span 4" }}
              >
                <label htmlFor="roomimage">
                  <input
                    type="file"
                    id="roomimage"
                    name="roomimage"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setFieldValue("roomimage", e.target.files[0])
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
                      values.roomimage
                        ? URL.createObjectURL(values.roomimage)
                        : ""
                    }
                  >
                    {!values.roomimage && (
                      <CameraAltIcon sx={{ color: "gray" }} />
                    )}
                  </Avatar>
                </label>
                {touched.roomimage && errors.roomimage && (
                  <Box color="error.main" mt={1}>
                    {errors.roomimage}
                  </Box>
                )}
              </Box>

              {/* Room Number */}
              <TextField
                fullWidth
                variant="filled"
                label="Room Number"
                name="roomnumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomnumber}
                error={!!touched.roomnumber && !!errors.roomnumber}
                helperText={touched.roomnumber && errors.roomnumber}
              />

              {/* Room Description */}
              <TextField
                fullWidth
                variant="filled"
                label="Room Description"
                name="description"
                multiline
                rows={3}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />

              {/* Room Price */}
              <TextField
                fullWidth
                variant="filled"
                label="Room Price"
                name="roomprice"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomprice}
                error={!!touched.roomprice && !!errors.roomprice}
                helperText={touched.roomprice && errors.roomprice}
              />

              {/* Room Type */}
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  value={values.roomtype}
                  name="roomtype"
                  variant="filled"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.roomtype && !!errors.roomtype}
                >
                  {roomTypes.map((roomType) => (
                    <MenuItem
                      key={roomType._id}
                      value={roomType._id}
                    >
                      {roomType.roomtypename}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Room Status */}
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={values.status}
                  name="status"
                  variant="filled"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.status && !!errors.status}
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="occupied">Occupied</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Submit Button */}
            <Box display="flex" justifyContent="end" mt="10px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Create Room"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default AddRoom;
