import React, { useEffect, useState } from 'react';
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

const ManageHolidayForm = ({
  isDrawerOpen,
  handleDrawerClose,
  title,
  Loading,
  GetHolidayAdd,
  setIsEdit,
  isEdit,
  GetHolidayUpdate,
  selectedData,
  GetHolidayById
}) => {
  const [holidayData, setHolidayDay] = useState(initialValues);

  useEffect(() => {
    if (selectedData !== null) {
      GetHolidayById({ id: selectedData }, (res) => {
        if (res && res.data && res.data.data) {
          const { data } = res.data;
          holidayData.title = data.title;
          holidayData.holidayDate = data.holidayDate;
        } else {
          initialValues.title = '';
          initialValues.holidayDate = '';
          setHolidayDay(initialValues);
        }
      });
    }
  }, [selectedData]);

  const onSubmit = async (formData) => {
    if (isEdit) {
      GetHolidayUpdate({ data: formData, params: selectedData }, (res) => {
        const { status } = res.data;
        if (status) {
          handleDrawerClose();
          setIsEdit(false);
        }
      });
    } else {
      GetHolidayAdd(formData, (res) => {
        const { status } = res.data;
        if (status) {
          handleDrawerClose();
          setIsEdit(false);
        }
      });
    }
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
          initialValues={holidayData}
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
    </>
  );
};

export default ManageHolidayForm;
