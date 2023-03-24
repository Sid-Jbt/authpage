import React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { holidayFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { Grid, CircularProgress } from '@mui/material';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import Button from 'Elements/Button';

const ManageHolidayForm = ({
  isDrawerOpen,
  handleDrawerClose,
  title,
  Loading,
  GetHolidayAdd,
  setIsEdit
}) => {
  const onSubmit = (formData) => {
    GetHolidayAdd(formData);
    handleDrawerClose();
  };

  return (
    <>
      <SideDrawer
        open={Boolean(isDrawerOpen)}
        onClose={() => {
          handleDrawerClose();
          setIsEdit();
        }}
        title={title}
      >
        <Formik
          enableReinitialize
          initialValues={{
            title: '',
            holidayDate: moment().format('DD/MM/YYYY')
          }}
          onSubmit={(values) => {
            onSubmit(values);
          }}
          validationSchema={holidayFormSchema}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            } = props;
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
                    disabled={isSubmitting || Loading}
                  >
                    {Loading ? <CircularProgress size={20} color="inherit" /> : 'Add Holiday'}
                  </Button>
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
