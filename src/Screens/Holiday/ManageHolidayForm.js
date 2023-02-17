import React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { holidayFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { Grid } from '@mui/material';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import Button from 'Elements/Button';

const ManageHolidayForm = ({ isDrawerOpen, handleDrawerClose, title }) => (
  <>
    <SideDrawer open={Boolean(isDrawerOpen)} onClose={handleDrawerClose} title={title}>
      <Formik
        enableReinitialize
        initialValues={{
          holidayName: '',
          holidayDate: moment().format('DD/MM/YYYY')
        }}
        onSubmit={(values) => {
          console.log('ON SUBMIT');
          console.log('values===========', values);
          handleDrawerClose();
        }}
        validationSchema={holidayFormSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Box mb={0.5}>
                <Input
                  placeholder="Name"
                  label="NAME"
                  size="large"
                  fullWidth
                  id="holidayName"
                  name="holidayName"
                  value={values.holidayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.holidayName && touched.holidayName && errors.holidayName}
                  error={errors.holidayName && touched.holidayName}
                  success={!errors.holidayName && touched.holidayName}
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
                  sx={{ marginRight: '10px' }}
                >
                  Submit
                </Button>
                <Button
                  color="error"
                  sx={{ marginRight: '10px' }}
                  variant="contained"
                  size="small"
                  onClick={handleDrawerClose}
                >
                  Clear
                </Button>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </SideDrawer>
  </>
);

export default ManageHolidayForm;
