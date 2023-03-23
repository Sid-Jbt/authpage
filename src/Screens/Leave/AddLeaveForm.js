/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { leaveFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormControl, FormLabel, Grid } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import Select from 'Elements/Select';
import Editor from 'Elements/Editor';
import { leave, leaveDayType } from 'Helpers/Global';

const initialValues = {
  fromDate: moment().format('YYYY-MM-DD'),
  toDate: moment().format('YYYY-MM-DD'),
  reason: ''
};

const AddLeaveForm = ({
  isDialogOpen,
  handleDialog,
  selectedData,
  setIsEdit,
  isEdit,
  title,
  GetLeaveAddUpdate,
  GetLeaveById
}) => {
  const [leaveType, setLeaveType] = useState(leave[0]);
  const [selectType, setSelectType] = useState(leaveDayType[0]);
  const [leaveData, setLeaveData] = useState(initialValues);

  useEffect(() => {
    if (selectedData !== null) {
      GetLeaveById({ id: selectedData }, (res) => {
        if (res && res.data && res.data.data) {
          const { data } = res.data;
          Object.keys(leaveData).map((key) => {
            leaveData[key] = data[key];
            if (key === 'fromDate') {
              leaveData.fromDate = moment(data.fromDate).format('YYYY-MM-DD');
            }
            if (key === 'toDate') {
              leaveData[key] = moment(data.toDate).format('YYYY-MM-DD');
            }
          });
          setLeaveData(leaveData);
          setSelectType(
            leaveDayType.find(
              (value) => value.value === data.selectType || value.label === data.selectType
            )
          );
          setLeaveType(
            leave.find((value) => value.value === data.leaveType || value.label === data.leaveType)
          );
        }
      });
    } else {
      initialValues.fromDate = moment().format('YYYY-MM-DD');
      initialValues.toDate = moment().format('YYYY-MM-DD');
      initialValues.reason = '';
      setLeaveData(initialValues);
    }
  }, [selectedData]);

  const handleChangeLeaveType = (selectedLeaveType) => {
    setLeaveType(selectedLeaveType);
  };

  const handleChangeSelectType = (selectedLeave) => {
    setSelectType(selectedLeave);
  };

  return (
    <>
      <SideDrawer
        open={Boolean(isDialogOpen)}
        onClose={() => {
          handleDialog();
          setIsEdit(false);
        }}
        title={title}
      >
        <Formik
          enableReinitialize
          initialValues={leaveData}
          onSubmit={(values) => {
            const formData = {
              leaveType: leaveType.value,
              selectType: selectType.value,
              fromDate: values.fromDate,
              toDate: selectType.value === 'full' ? values.toDate : values.fromDate,
              reason: values.reason
            };
            GetLeaveAddUpdate({ data: formData, params: { leaveId: selectedData } }, (res) => {
              const { status } = res.data;
              if (status) {
                handleDialog();
                setIsEdit(false);
              }
            });
          }}
          validationSchema={leaveFormSchema}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ width: '100%' }}>
                      <FormLabel>Select Leave</FormLabel>
                      <Select
                        value={leaveType}
                        options={leave}
                        onChange={(value) => handleChangeLeaveType(value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ width: '100%' }}>
                      <FormLabel>Select Type</FormLabel>
                      <Select
                        value={selectType}
                        options={leaveDayType}
                        onChange={(value) => handleChangeSelectType(value)}
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
                  {selectType.value === 'full' && (
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
                      {isEdit ? 'Update Leave' : 'Add Leave'}
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

export default AddLeaveForm;
