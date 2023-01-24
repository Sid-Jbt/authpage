import React, { useState } from 'react';
import Box from 'Elements/Box';
import { Card, FormControl, FormLabel, Grid, useTheme } from '@mui/material';
import { Formik } from 'formik';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { BasicInfoSchema } from 'Helpers/ValidationSchema';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import { Days, Gender, Months, Years } from 'Helpers/Global';

const BasicInfo = () => {
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(true);
  const [gender, setGender] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const handleIsEdit = () => setIsEdit(!isEdit);
  console.log('IsEdit --> ', isEdit);

  const handleChangeIsGender = (event) => {
    setGender(event.target.value.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value.value);
  };

  const handleChangeDay = (event) => {
    setDay(event.target.value.value);
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value.value);
  };
  console.log('Selected gender is: --> ', gender, month, day, year);

  return (
    <Card id="basicInfo">
      <Grid container p={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
            Basic Info
          </Typography>
        </Grid>
        <Grid item>
          <Button color="info" variant="contained" onClick={() => handleIsEdit()}>
            {isEdit ? 'Edit' : 'Save'}
          </Button>
        </Grid>
      </Grid>

      <Formik
        enableReinitialize
        initialValues={{
          firstName: '',
          lastName: '',
          gender: '',
          month: '',
          day: '',
          year: '',
          email: '',
          confirmationEmail: '',
          pAdd: '',
          phoneNumber: ''
        }}
        onSubmit={(values) => {
          console.log('values', values);
        }}
        validationSchema={BasicInfoSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit} style={{ background: theme.palette.grey[100] }}>
              <Grid container spacing={1} p={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Alen"
                      size="large"
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.firstName && touched.firstName && errors.firstName}
                      error={errors.firstName && touched.firstName}
                      success={!errors.firstName && touched.firstName}
                      disabled={isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Prior"
                      size="large"
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.lastName && touched.lastName && errors.lastName}
                      error={errors.lastName && touched.lastName}
                      success={!errors.lastName && touched.lastName}
                      disabled={isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      options={Gender}
                      disabled={isEdit}
                      errorText={errors.gender && touched.gender && errors.gender}
                      error={errors.gender && touched.gender}
                      success={!errors.gender && touched.gender}
                      onChange={(selectedOption) => {
                        const event = { target: { name: 'gender', value: selectedOption } };
                        handleChangeIsGender(event);
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'gender' } });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Birth Date</FormLabel>
                    <Select
                      id="month"
                      name="month"
                      options={Months}
                      disabled={isEdit}
                      errorText={errors.month && touched.month && errors.month}
                      error={errors.month && touched.month}
                      success={!errors.month && touched.month}
                      onChange={(selectedOption) => {
                        const event = { target: { name: 'month', value: selectedOption } };
                        handleChangeMonth(event);
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'month' } });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel Invisible>Birth Date</FormLabel>
                    <Select
                      id="day"
                      name="day"
                      options={Days}
                      disabled={isEdit}
                      errorText={errors.day && touched.day && errors.day}
                      error={errors.day && touched.day}
                      success={!errors.day && touched.day}
                      onChange={(selectedOption) => {
                        const event = { target: { name: 'day', value: selectedOption } };
                        handleChangeDay(event);
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'day' } });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Birth Date</FormLabel>
                    <Select
                      id="year"
                      name="year"
                      options={Years}
                      disabled={isEdit}
                      errorText={errors.year && touched.year && errors.year}
                      error={errors.year && touched.year}
                      success={!errors.year && touched.year}
                      onChange={(selectedOption) => {
                        const event = { target: { name: 'year', value: selectedOption } };
                        handleChangeYear(event);
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'year' } });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="ex. jone@abc.com"
                      size="large"
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.email && touched.email && errors.email}
                      error={errors.email && touched.email}
                      success={!errors.email && touched.email}
                      disabled={isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="ex. jone@abc.com"
                      size="large"
                      fullWidth
                      id="email"
                      name="confirmationEmail"
                      label="Confirmation Email"
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={
                        errors.confirmationEmail &&
                        touched.confirmationEmail &&
                        errors.confirmationEmail
                      }
                      error={errors.confirmationEmail && touched.confirmationEmail}
                      success={!errors.confirmationEmail && touched.confirmationEmail}
                      disabled={isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="10/04/2021"
                      size="large"
                      fullWidth
                      id="doj"
                      name="doj"
                      label="Date Of Join"
                      disabled
                      value={values.doj}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="10/10/2021"
                      size="large"
                      fullWidth
                      id="dol"
                      name="dol"
                      label="Date Of Leave"
                      value={values.dol}
                      disabled={isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="number"
                      placeholder="+91 925 532 5324"
                      size="large"
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      minlength="9"
                      maxlength="14"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                      error={errors.phoneNumber && touched.phoneNumber}
                      success={!errors.phoneNumber && touched.phoneNumber}
                      disabled={isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                      size="large"
                      fullWidth
                      id="pAdd"
                      name="pAdd"
                      label="Permanent Address"
                      value={values.pAdd}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.pAdd && touched.pAdd && errors.pAdd}
                      error={errors.pAdd && touched.pAdd}
                      success={!errors.pAdd && touched.pAdd}
                      disabled={isEdit}
                    />
                  </Box>
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
