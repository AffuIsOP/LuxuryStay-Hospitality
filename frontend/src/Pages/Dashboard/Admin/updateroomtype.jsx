import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import Header from '../../../Components/Dashboard/Header';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

// Validation schema for the form
const validationSchema = yup.object().shape({
  roomtypename: yup.string().required('Room type name is required'),
  roomtypedescription: yup.string().required('Room type description is required'),
  roomtypeprice: yup
    .number()
    .required('Room type price is required')
    .positive('Price must be a positive number'),
  roomstatus: yup.string().required('Room status is required'),
});

const UpdateRoomType = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dashboard/roomtypes/${id}`);
        if (response.status === 200) {
          setInitialValues(response.data);
        } else {
          toast.error('Failed to fetch room type details');
        }
      } catch (error) {
        console.error('Error fetching room type:', error);
        toast.error('Error fetching room type');
      }
    };

    fetchRoomType();
  }, [id]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(`http://localhost:5000/dashboard/roomtypes/${id}`, values);
      if (response.status === 200) {
          navigate('/dashboard/admin/roomtypelist');
          toast.success('Room type updated successfully');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        console.error('Error updating room type:', error);
        toast.error('Failed to update room type. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Header title="UPDATE ROOM TYPE" subtitle="Edit Room Type Details" />

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
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              {/* Room Type Name */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Room Type Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomtypename}
                name="roomtypename"
                error={!!touched.roomtypename && !!errors.roomtypename}
                helperText={touched.roomtypename && errors.roomtypename}
                sx={{ gridColumn: 'span 4' }}
              />

              {/* Room Type Description */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Room Type Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomtypedescription}
                name="roomtypedescription"
                error={!!touched.roomtypedescription && !!errors.roomtypedescription}
                helperText={touched.roomtypedescription && errors.roomtypedescription}
                multiline
                rows={4}
                sx={{ gridColumn: 'span 4' }}
              />

              {/* Room Type Price */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Room Type Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomtypeprice}
                name="roomtypeprice"
                error={!!touched.roomtypeprice && !!errors.roomtypeprice}
                helperText={touched.roomtypeprice && errors.roomtypeprice}
                sx={{ gridColumn: 'span 4' }}
              />

              {/* Room Status */}
              <TextField
                fullWidth
                select
                variant="filled"
                label="Room Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomstatus}
                name="roomstatus"
                error={!!touched.roomstatus && !!errors.roomstatus}
                helperText={touched.roomstatus && errors.roomstatus}
                sx={{ gridColumn: 'span 4' }}
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
                {isSubmitting ? 'Updating...' : 'Update Room Type'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default UpdateRoomType;
