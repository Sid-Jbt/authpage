import React, { useEffect, useState } from 'react';
import Box from 'Elements/Box';
import { Card, Grid } from '@mui/material';
import { Formik } from 'formik';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import { Gender, keyDownTypeNumber, keyDownValidation } from 'Helpers/Global';
import moment from 'moment/moment';
import { useNavigate, useOutletContext } from 'react-router';
import { getEmployeeListPattern } from 'Routes/routeConfig';

const BasicInfo = ({ data, allRoles }) => {
  const { GetEmployeeUpdate, GetEmployeeDisable } = useOutletContext();
  const [selectedRole, setSelectedRole] = useState(allRoles[1]);
  const navigate = useNavigate();
  const oldData = data;
  let newData = {};

  useEffect(() => {
    setSelectedRole(allRoles.find((roleId) => data.roleId === roleId.id));
  }, []);

  const onSubmit = (values, actions) => {
    if (JSON.stringify(oldData) !== JSON.stringify(values)) {
      Object.keys(oldData).map((key) => {
        if (values[key] !== oldData[key]) {
          newData = { ...newData, [key]: values[key], id: data.id };
        }
      });
      GetEmployeeUpdate(newData, () => {
        if (values.dateOfLeave !== '') {
          const deactivateData = { action: 1, id: values.id };
          GetEmployeeDisable(deactivateData, () => {});
          navigate(getEmployeeListPattern());
        }
      });
    }
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <Card id="basic-info" style={{ overflow: 'visible' }}>
      <Box p={2} pb={0}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={
          data || {
            firstName: '',
            lastName: '',
            email: '',
            confirmationEmail: '',
            permanentAddress: '',
            dateOfJoin: '',
            phoneNumber: '',
            dateOfLeave: '',
            gender: '',
            dob: ''
          }
        }
        onSubmit={onSubmit}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} p={2} justifyContent="flex-end">
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    placeholder="Alen"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorFalse
                    success={!errors.firstName && touched.firstName}
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    placeholder="Prior"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorFalse
                    success={!errors.lastName && touched.lastName}
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Select
                    label="Gender"
                    value={
                      values.gender === ''
                        ? Gender[0]
                        : Gender.find((o) => o.value === values.gender)
                    }
                    options={Gender}
                    errorFalse
                    onChange={(value) => {
                      setFieldValue('gender', value.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="date"
                    placeholder="Date Of Birth"
                    id="dob"
                    name="dob"
                    label="Date Of Birth"
                    errorFalse
                    value={values.dob === '' ? '' : moment(values.dob).format('YYYY-MM-DD')}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    id="dateOfJoin"
                    name="dateOfJoin"
                    label="Joining"
                    value={values.dateOfJoin}
                    disabled
                    errorFalse
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="date"
                    placeholder="10/10/2021"
                    id="dateOfLeave"
                    name="dateOfLeave"
                    label="Reliving"
                    inputProps={{
                      min: moment(values.dateOfJoin).format('YYYY-MM-DD'),
                      max: moment().format('YYYY-MM-DD')
                    }}
                    value={
                      values.dateOfLeave === ''
                        ? ''
                        : moment(values.dateOfLeave).format('YYYY-MM-DD')
                    }
                    onChange={handleChange}
                    errorFalse
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="number"
                    placeholder="9255325324"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    minLength="10"
                    maxLength="13"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorFalse
                    success={!errors.phoneNumber && touched.phoneNumber}
                    onKeyDown={(evt) => keyDownTypeNumber.includes(evt.key) && evt.preventDefault()}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    placeholder="ex. jone@abc.com"
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    disabled
                    errorFalse
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    placeholder="eg. JBT0001"
                    id="employeeCode"
                    name="employeeCode"
                    label="Employee Code"
                    value={values.employeeCode}
                    disabled
                    errorFalse
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                      id="permanentAddress"
                      name="permanentAddress"
                      label="Permanent Address"
                      value={values.permanentAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorFalse
                      success={!errors.permanentAddress && touched.permanentAddress}
                    />
                  </Box>
                </Grid>
                {allRoles.length > 0 && (
                  <Grid item xs={12} md={6} lg={6}>
                    <Select
                      label="Select Role"
                      value={selectedRole}
                      options={allRoles}
                      onChange={(value) => {
                        setSelectedRole(value);
                        setFieldValue('roleId', value.id);
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={6} lg={4} textAlign="end">
                  <Button
                    variant="gradient"
                    color="dark"
                    size="small"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Update Basic Info
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default BasicInfo;
