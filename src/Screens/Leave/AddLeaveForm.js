import React, { useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { leaveFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { CircularProgress, FormControl, FormLabel, Grid } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import Select from 'Elements/Select';
import Editor from 'Elements/Editor';
import { leave, leaveDayType } from 'Helpers/Global';

const initialValues = {
  leaveType: leave[0],
  selectType: leaveDayType[0],
  fromDate: moment().format('YYYY-MM-DD'),
  toDate: moment().format('YYYY-MM-DD'),
  reason: ''
};

const AddLeaveForm = ({
  isDialogOpen,
  handleDialog,
  selectedData,
  isEdit,
  title,
  GetLeaveAddUpdate,
  Loading
}) => {
  const [leaveType, setLeaveType] = useState('');
  const [dayType, setDayType] = useState('');

  return (
    <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title={title}>
      <Formik
        enableReinitialize
        initialValues={selectedData || initialValues}
        onSubmit={(values, action) => {
          const formData = {
            leaveType:
              isEdit && leaveType !== ''
                ? leaveType.value
                : !isEdit
                ? values.leaveType.value
                : values.leaveType,
            selectType:
              isEdit && dayType !== ''
                ? dayType.value
                : !isEdit
                ? values.selectType.value
                : values.selectType,
            fromDate: values.fromDate,
            toDate: values.selectType.value === 'full' ? values.toDate : values.fromDate,
            reason: values.reason.replace(/(<([^>]+)>)/gi, ''),
            ...(isEdit && { id: selectedData.id })
          };
          GetLeaveAddUpdate(formData, (res) => {
            const { status } = res.data;
            if (status) {
              handleDialog();
            }
          });
          action.setSubmitting(false);
        }}
        validationSchema={leaveFormSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} justifyContent="space-between">
                <Grid item xs={12} md={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Select Leave</FormLabel>
                    <Select
                      value={
                        selectedData === null
                          ? values.leaveType
                          : leave.find((o) => o.value === values.leaveType)
                      }
                      options={leave}
                      onChange={(value) => {
                        setLeaveType(value);
                        setFieldValue('leaveType', value);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Select Type</FormLabel>
                    <Select
                      value={
                        selectedData === null
                          ? values.selectType
                          : leaveDayType.find((o) => o.value === values.selectType)
                      }
                      options={leaveDayType}
                      onChange={(value) => {
                        setDayType(value);
                        setFieldValue('selectType', value);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    type="date"
                    placeholder="From Date"
                    size="large"
                    fullWidth
                    id="fromDate"
                    name="fromDate"
                    label="From Date"
                    value={values.fromDate}
                    inputProps={{
                      min: moment().format('YYYY-MM-DD'),
                      max: moment().add(1, 'Y').format('YYYY-MM-DD')
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.fromDate && touched.fromDate && errors.fromDate}
                    error={errors.fromDate && touched.fromDate}
                    success={!errors.fromDate && touched.fromDate}
                  />
                </Grid>
                {((selectedData && selectedData.selectType === 'full') ||
                  values.selectType.value === 'full') && (
                  <Grid item xs={12} md={6}>
                    <Input
                      inputProps={{
                        min: moment(values.fromDate).format('YYYY-MM-DD'),
                        max: moment().add(1, 'Y').format('YYYY-MM-DD')
                      }}
                      type="date"
                      placeholder="To Date"
                      size="large"
                      fullWidth
                      id="toDate"
                      name="toDate"
                      label="To Date"
                      value={values.toDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.toDate && touched.toDate && errors.toDate}
                      error={errors.toDate && touched.toDate}
                      success={!errors.toDate && touched.toDate}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Editor
                    title="Leave Reason"
                    label="Leave Reason"
                    id="reason"
                    name="reason"
                    value={values.reason}
                    backgroundContainerColor="white"
                    onChange={(value) => {
                      setFieldValue('reason', value);
                    }}
                  />
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
                  <Button type="submit" color="info" variant="contained" size="medium">
                    {Loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : isEdit ? (
                      'Update Leave'
                    ) : (
                      'Add Leave'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </SideDrawer>
  );
};

export default AddLeaveForm;
