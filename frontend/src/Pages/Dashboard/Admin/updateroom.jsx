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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../Components/Dashboard/Header";
import { toast, ToastContainer } from 'react-toastify';
import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Validation schema
const validationSchema = yup.object().shape({
  roomimage: yup.mixed().nullable().required("Room image is required"),
  roomnumber: yup
    .string()
    .matches(/^\d{4}$/, "Room number must be exactly 4 digits")
    .required("Room number is required"),
  description: yup.string().required("Room description is required"),
  roomprice: yup
    .number()
    .typeError("Room price must be a valid number")
    .min(0, "Room price must be a positive number")
    .required("Room price is required"),
  roomtype: yup.string().required("Room type is required"),
  status: yup.string().required("Room status is required"),
});

const UpdateRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomData, setRoomData] = useState(null);
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

    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/dashboard/room/${id}`
        );
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    

    fetchRoomTypes();
    fetchRoomData();
  }, [id]);

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
  
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
      // Send a PUT request to update the room
      const response = await axios.put(
        `http://localhost:5000/dashboard/room/${id}`,
        formData
      );
  
      if (response.status === 200) {
        navigate("/dashboard/admin/roomlist");
        toast.success("Room successfully updated!");
      }
    } catch (error) {
      console.error("Error during room update:", error);
      toast.error("Failed to update room.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (!roomData) {
    return <CircularProgress />;
  }

  return (
    <Box m="15px 15px 0 15px">
      <Header title="UPDATE ROOM" subtitle="Update Room Details" />
      
      <Formik
        initialValues={{
          roomimage: roomData.roomImage ,
          roomnumber: roomData.roomnumber || "",
          description: roomData.description || "",
          roomprice: roomData.roomprice || "",
          roomtype: roomData.roomtype || "",
          status: roomData.status || "",
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
                        : roomData.roomImage
                    }
                  >
                    {!values.roomimage && !roomData.roomImage && (
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
                    <MenuItem key={roomType._id} value={roomType._id}>
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
                  "Update Room"
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

export default UpdateRoom;
