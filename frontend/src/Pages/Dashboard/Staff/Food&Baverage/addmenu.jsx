import React, { useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem, Avatar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { CameraAlt as CameraIcon } from "@mui/icons-material";
import Header from "../../../../Components/Dashboard/Header";

// Validation Schema for form fields
const validationSchema = yup.object().shape({
  foodimage: yup.mixed().required("Image is required"),
  foodname: yup.string().required("Food name is required"),
  foodcategory: yup.string().required("Category is required"),
  foodprice: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0.01, "Price must be greater than 0"),
  fooddescription: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
});

const initialValues = {
  foodimage: null,
  foodname: "",
  foodcategory: "",
  foodprice: "",
  fooddescription: "",
  status: "available",
};

const AddMenu = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [categories, setCategories] = useState([]);

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("foodimage", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/menucat"
        );
        if (response.data) {
          const activeCategories = response.data.filter(category => category.status === "active");
          setCategories(activeCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
      }
    };
    fetchCategories();
  }, [categories]);

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    const formData = new FormData();
    formData.append("foodimage", values.foodimage);
    formData.append("foodname", values.foodname);
    formData.append("foodcategory", values.foodcategory);
    formData.append("foodprice", values.foodprice);
    formData.append("fooddescription", values.fooddescription);
    formData.append("status", values.status);

    try {
      const response = await axios.post(
        "http://localhost:5000/dashboard/menu",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Menu item added successfully");
        resetForm();
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("Failed to add menu item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="5px 10px 0 10px">
      <Header title="ADD MENU ITEM" subtitle="Create a New Menu Item" />
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
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Food Image Section */}
              <Box
                display="flex"
                justifyContent="center"
                sx={{ gridColumn: "span 4" }}
              >
                <label htmlFor="foodimage">
                  <input
                    type="file"
                    id="foodimage"
                    name="foodimage"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      cursor: "pointer",
                      backgroundColor: "#f0f0f0",
                    }}
                    src={imagePreview || ""}
                  >
                    {!imagePreview && <CameraIcon sx={{ color: "gray" }} />}
                  </Avatar>
                </label>
                {touched.foodimage && errors.foodimage && (
                  <Box color="error.main" mt={1}>
                    {errors.foodimage}
                  </Box>
                )}
              </Box>

              {/* Food Name */}
              <TextField
                fullWidth
                variant="filled"
                label="Food Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.foodname}
                name="foodname"
                error={touched.foodname && Boolean(errors.foodname)}
                helperText={touched.foodname && errors.foodname}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Food Category */}
              <TextField
                fullWidth
                variant="filled"
                select
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.foodcategory}
                name="foodcategory"
                error={touched.foodcategory && Boolean(errors.foodcategory)}
                helperText={touched.foodcategory && errors.foodcategory}
                sx={{ gridColumn: "span 4" }}
              >
                {/* Dynamically populated categories */}
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.menucategoryname}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No categories available</MenuItem>
                )}
              </TextField>

              {/* Food Price */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.foodprice}
                name="foodprice"
                error={touched.foodprice && Boolean(errors.foodprice)}
                helperText={touched.foodprice && errors.foodprice}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Food Description */}
              <TextField
                fullWidth
                variant="filled"
                label="Description"
                multiline
                rows={3}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fooddescription}
                name="fooddescription"
                error={
                  touched.fooddescription && Boolean(errors.fooddescription)
                }
                helperText={touched.fooddescription && errors.fooddescription}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Status */}
              <TextField
                fullWidth
                variant="filled"
                select
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={touched.status && Boolean(errors.status)}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="unavailable">Unavailable</MenuItem>
              </TextField>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Add Menu Item"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default AddMenu;
