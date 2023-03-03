import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { leaveFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { CircularProgress, FormControl, FormLabel, Grid } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import Box from 'Elements/Box';
import Select from 'Elements/Select';
import Editor from 'Elements/Editor';
import { leave, leaveDayType } from 'Helpers/Global';
import { Check, Error } from '@mui/icons-material';
import { addNewLeave, updateLeave } from 'APIs/Leave';
import { SnackbarContext } from 'Context/SnackbarProvider';

const initialValues = {
  fromDate: moment().format('YYYY-MM-DD'),
  toDate: moment().format('YYYY-MM-DD'),
  reason: ''
};

const AddLeaveForm = ({ isDialogOpen, handleDialog, selectedData, setIsEdit, isEdit, title }) => {
  const [leaveType, setLeaveType] = useState(leave[0]);
  const [selectType, setSelectType] = useState(leaveDayType[0]);
  const [data, setData] = useState(initialValues);
  const { setSnack } = useContext(SnackbarContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (selectedData !== null) {
      Object.keys(data).map((key) => {
        data[key] = selectedData[key];
        if (key === 'fromDate') {
          data[key] = moment(selectedData.fromDate).format('YYYY-MM-DD');
        }
        if (key === 'toDate') {
          data[key] = moment(selectedData.toDate).format('YYYY-MM-DD');
        }
      });
      setData(data);
      setSelectType(
        leaveDayType.find(
          (value) =>
            value.value === selectedData.selectType || value.label === selectedData.selectType
        )
      );
      setLeaveType(
        leave.find(
          (value) =>
            value.value === selectedData.leaveType || value.label === selectedData.leaveType
        )
      );
    } else {
      initialValues.fromDate = moment().format('YYYY-MM-DD');
      initialValues.toDate = moment().format('YYYY-MM-DD');
      initialValues.reason = '';
      setData(initialValues);
    }
  }, [selectedData]);

  const handleChangeLeaveType = (selectedLeaveType) => {
    setLeaveType(selectedLeaveType);
  };

  const handleChangeSelectType = (selectedLeave) => {
    setSelectType(selectedLeave);
  };

  const onSubmitNewLeave = async (formData) => {
    if (formData.reason === '') {
      setSnack({
        title: 'Error',
        message: 'Reason is required',
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
    } else {
      let leaveRes;
      const updatedFormData = {
        leaveType: leaveType.value,
        selectType: selectType.value,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        reason: formData.reason
      };
      setLoader(true);
      if (isEdit) {
        const data12 = { leaveId: selectedData.id };
        leaveRes = await updateLeave(updatedFormData, data12);
      } else {
        leaveRes = await addNewLeave(updatedFormData);
      }
      const { status, message } = leaveRes;
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
        handleDialog();
        setIsEdit(false);
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
    }
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
          initialValues={data}
          onSubmit={(formData) => {
            onSubmitNewLeave(formData);
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
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <FormLabel>Select Leave</FormLabel>
                        <Select
                          value={leaveType}
                          options={leave}
                          onChange={(value) => handleChangeLeaveType(value)}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <FormLabel>Select Type</FormLabel>
                        <Select
                          value={selectType}
                          options={leaveDayType}
                          onChange={(value) => handleChangeSelectType(value)}
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
                        inputProps={{
                          min: moment().format('YYYY-MM-DD')
                        }}
                        label="From Date"
                        value={values.fromDate}
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
                        inputProps={{
                          min: moment().format('YYYY-MM-DD')
                        }}
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
                        id="reason"
                        name="reason"
                        value={values.reason}
                        backgroundContainerColor="white"
                        onChange={(value) => {
                          setFieldValue('reason', value);
                        }}
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
                    <Button
                      type="submit"
                      color="info"
                      variant="contained"
                      size="medium"
                      disabled={loader}
                      sx={loader && { height: '40px !important', width: '80% !important' }}
                    >
                      {loader ? (
                        <CircularProgress color="inherit" />
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
    </>
  );
};

export default AddLeaveForm;
