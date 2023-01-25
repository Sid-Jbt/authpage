import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { leaveFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormControl, FormLabel, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Select from 'Elements/Select';
import Input from 'Elements/Input';
import Editor from 'Elements/Editor';
import Button from 'Elements/Button';
import { leaveTypes } from 'Helpers/Globle';

const initialValues = {
  fromDate: moment().format('YYYY-MM-DD'),
  toDate: moment().format('YYYY-MM-DD'),
  noOfDays: '',
  leaveReason: ''
};

const renderDialogContent = ({ isDialogOpen, handleDialog, selectedData }) => {
  const [leaveType, setLeaveType] = useState(leaveTypes[0]);
  const [title, setTitle] = useState('ADD NEW LEAVE');

  const handleChangeLeave = (selectedLeaveType) => {
    setLeaveType(selectedLeaveType);
  };

  useEffect(() => {
    if (selectedData !== null) {
      setTitle('EDIT LEAVE');
      Object.keys(initialValues).map((key) => {
        initialValues[key] = selectedData[key];
        if (key === 'fromDate') {
          initialValues[key] = moment(selectedData.from).format('YYYY-MM-DD');
        }
        if (key === 'toDate') {
          initialValues[key] = moment(selectedData.to).format('YYYY-MM-DD');
        }
      });
      setLeaveType(leaveTypes.find((leave) => leave.label === selectedData.leaveType));
    }
  }, [selectedData]);

  const onSubmit = (formData) => {
    console.log('formData', formData);
  };

  return (
    <>
      <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title={title}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(formData) => {
            onSubmit(formData);
          }}
          validationSchema={leaveFormSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12} md={6}>
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <FormLabel>Select Leave</FormLabel>
                        <Select
                          value={leaveType}
                          options={leaveTypes}
                          onChange={(value) => handleChangeLeave(value)}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="3"
                        size="medium"
                        id="noOfDays"
                        name="noOfDays"
                        label="No Of Days"
                        fullWidth
                        value={values.noOfDays}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.noOfDays && touched.noOfDays && errors.noOfDays}
                        error={errors.noOfDays && touched.noOfDays}
                        success={!errors.noOfDays && touched.noOfDays}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="date"
                        placeholder="From Date"
                        size="large"
                        fullWidth
                        id="fromDate"
                        name="fromDate"
                        label="From Date"
                        defaultValue={values.fromDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.fromDate && touched.fromDate && errors.fromDate}
                        error={errors.fromDate && touched.fromDate}
                        success={!errors.fromDate && touched.fromDate}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="date"
                        placeholder="To Date"
                        size="large"
                        fullWidth
                        id="toDate"
                        name="toDate"
                        label="To Date"
                        defaultValue={values.toDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.toDate && touched.toDate && errors.toDate}
                        error={errors.toDate && touched.toDate}
                        success={!errors.toDate && touched.toDate}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Editor
                        title="Leave Reason"
                        label="Leave Reason"
                        value={values.leaveReason}
                        backgroundContainerColor="white"
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    sm={12}
                    md={4}
                    lg={6}
                    xl={12}
                    sx={{
                      marginRight: '10px'
                    }}
                  >
                    <Button type="submit" color="info" variant="contained" size="small">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </SideDrawer>
    </>
  );
};

export default renderDialogContent;
