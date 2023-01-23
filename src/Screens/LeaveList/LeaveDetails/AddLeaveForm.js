import React, { useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import validationSchema from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormControl, FormLabel, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Select from 'Elements/Select';
import Input from 'Elements/Input';
import Editor from 'Elements/Editor';
import Button from 'Elements/Button';
import { leaveTypes } from '../../../Helpers/Globle';

const renderDialogContent = ({ isDialogOpen, handleDialog }) => {
  const [leaveType, setLeaveType] = useState(leaveTypes[0]);

  const handleChangeLeave = (selectedLeaveType) => {
    setLeaveType(selectedLeaveType);
  };

  return (
    <>
      <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD NEW LEAVE">
        <Formik
          enableReinitialize
          initialValues={{
            fromDate: moment().format('DD/MM/YYYY'),
            toDate: moment().format('DD/MM/YYYY'),
            noOfDays: '',
            remainingLeaves: 13,
            leaveReason: ''
          }}
          onSubmit={(values) => {
            console.log('values===========', values);
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12}>
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
                        type="date"
                        placeholder="From Date"
                        size="large"
                        fullWidth
                        id="fromDate"
                        name="fromDate"
                        label="From Date"
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
                        success={!errors.toDate && touched.toDate}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="3"
                        size="large"
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
                        type="text"
                        placeholder="12"
                        size="large"
                        fullWidth
                        id="remainingLeaves"
                        name="remainingLeaves"
                        label="Remaining Leaves"
                        value={values.remainingLeaves}
                        disabled
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Editor label="Leave Reason" value={values.leaveReason} />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    sm={12}
                    md={4}
                    lg={6}
                    xl={12}
                    sx={{
                      marginRight: '10px',
                      display: 'flex',
                      alignSelf: 'flex-end',
                      justifyContent: 'flex-end'
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
