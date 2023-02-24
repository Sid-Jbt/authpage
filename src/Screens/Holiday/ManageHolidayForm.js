import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { holidayFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { Grid, CircularProgress } from '@mui/material';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { Check, Error } from '@mui/icons-material';
import { addHoliday, updateHoliday } from '../../APIs/Holiday/index';
import { SnackbarContext } from '../../Context/SnackbarProvider';

const initialValues = {
  title: '',
  holidayDate: moment().format('DD/MM/YYYY')
};
const ManageHolidayForm = ({
  isDrawerOpen,
  handleDrawerClose,
  title,
  setIsEdit,
  selectedData,
  isEdit
}) => {
  const [data, setData] = useState(initialValues);
  const { setSnack } = useContext(SnackbarContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (selectedData !== null) {
      Object.keys(data).map((key) => {
        data[key] = selectedData[key];
      });
      setData(data);
    } else {
      initialValues.title = '';
      initialValues.holidayDate = moment().format('DD/MM/YYYY');
      setData(initialValues);
    }
  }, [selectedData]);

  const onSubmit = async (formData) => {
    let holidayRes;
    setLoader(true);
    const updatedData = {
      title: formData.title,
      holidayDate: formData.holidayDate
    };
    if (isEdit) {
      holidayRes = await updateHoliday(updatedData, selectedData.id);
    } else {
      holidayRes = await addHoliday(updatedData);
    }
    const { status, message } = holidayRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      setLoader(false);
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
      setLoader(false);
    }
    handleDrawerClose();
  };

  return (
    <>
      <SideDrawer
        open={Boolean(isDrawerOpen)}
        onClose={() => {
          handleDrawerClose();
          setIsEdit(false);
        }}
        title={title}
      >
        <Formik
          enableReinitialize
          initialValues={data}
          onSubmit={(values) => {
            onSubmit(values);
          }}
          validationSchema={holidayFormSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box mb={0.5}>
                  <Input
                    placeholder="Title"
                    label="Title"
                    size="large"
                    fullWidth
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.title && touched.title && errors.title}
                    error={errors.title && touched.title}
                    success={!errors.title && touched.title}
                  />
                </Box>
                <Box mb={0.5}>
                  <Input
                    type="date"
                    placeholder="Date"
                    label="DATE"
                    size="large"
                    fullWidth
                    dateformat="yyyy-MM-dd"
                    id="holidayDate"
                    name="holidayDate"
                    value={values.holidayDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.holidayDate && touched.holidayDate && errors.holidayDate}
                    error={errors.holidayDate && touched.holidayDate}
                    success={!errors.holidayDate && touched.holidayDate}
                  />
                </Box>
                <Grid
                  item
                  sm={12}
                  md={4}
                  lg={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Button
                    type="submit"
                    color="info"
                    variant="contained"
                    size="small"
                    sx={loader && { height: '40px !important', width: '80% !important' }}
                  >
                    {loader ? <CircularProgress color="inherit" /> : 'Add Holiday'}
                  </Button>
                  {/* <Button
                    color="error"
                    sx={{ marginRight: '10px' }}
                    variant="contained"
                    size="small"
                    onClick={handleDrawerClose}
                  >
                    Clear
                  </Button> */}
                </Grid>
              </form>
            );
          }}
        </Formik>
      </SideDrawer>
    </>
  );
};

export default ManageHolidayForm;
