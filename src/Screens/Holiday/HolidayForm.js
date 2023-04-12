import React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { holidayFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { Grid, CircularProgress } from '@mui/material';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import Button from 'Elements/Button';

const initialValues = {
  title: '',
  holidayDate: moment().format('DD/MM/YYYY')
};

const HolidayForm = ({
  isDrawerOpen,
  handleDrawerClose,
  title,
  Loading,
  GetHolidayAddUpdate,
  selectedData
}) => (
  <SideDrawer open={Boolean(isDrawerOpen)} onClose={handleDrawerClose} title={title}>
    <Formik
      enableReinitialize
      initialValues={selectedData || initialValues}
      onSubmit={(values, action) => {
        GetHolidayAddUpdate(values, (res) => {
          const { status } = res.data;
          if (status) {
            handleDrawerClose();
          }
        });
        action.setSubmitting(false);
      }}
      validationSchema={holidayFormSchema}
    >
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
          props;
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
                inputProps={{
                  min: moment().subtract(1, 'Y').format('YYYY-MM-DD'),
                  max: moment().add(1, 'Y').format('YYYY-MM-DD')
                }}
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
              pt={2}
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
                {Loading ? <CircularProgress size={20} color="inherit" /> : title}
              </Button>
            </Grid>
          </form>
        );
      }}
    </Formik>
  </SideDrawer>
);

export default HolidayForm;
