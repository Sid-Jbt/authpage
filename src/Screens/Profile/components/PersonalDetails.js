import React from 'react';
import {
  Card,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  useTheme,
  FormLabel
} from '@mui/material';
import { Formik } from 'formik';
import validationSchema from 'Helpers/ValidationSchema';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';

const PersonalDetails = () => {
  const theme = useTheme();
  return (
    <Card>
      <Grid container p={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
            My Account
          </Typography>
        </Grid>
        <Grid item>
          <Button color="info" variant="contained">
            Edit
          </Button>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          fatherName: '',
          department: '',
          designation: '',
          empCode: '',
          pAdd: '',
          alternativeNumber: '',
          phoneNumber: ''
        }}
        onSubmit={(values) => {
          console.log('values', values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit} style={{ background: theme.palette.grey[100] }}>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="First Name"
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
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Last Name"
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
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Father Name"
                      size="large"
                      fullWidth
                      id="fatherName"
                      name="fatherName"
                      label="Father Name"
                      value={values.fatherName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.fatherName && touched.fatherName && errors.fatherName}
                      error={errors.fatherName && touched.fatherName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Department"
                      size="large"
                      fullWidth
                      id="department"
                      name="department"
                      label="Department"
                      value={values.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.department && touched.department && errors.department}
                      error={errors.department && touched.department}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Designation"
                      size="large"
                      fullWidth
                      id="designation"
                      name="designation"
                      label="Designation"
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.designation && touched.designation && errors.designation}
                      error={errors.designation && touched.designation}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Employee Code"
                      size="large"
                      fullWidth
                      id="empCode"
                      name="empCode"
                      label="Employee Code"
                      value={values.empCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.empCode && touched.empCode && errors.empCode}
                      error={errors.empCode && touched.empCode}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="date"
                      placeholder="Date Of Birth"
                      size="large"
                      fullWidth
                      id="dob"
                      name="dob"
                      label="Date Of Birth"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="date"
                      placeholder="Date Of Join"
                      size="large"
                      fullWidth
                      id="doj"
                      name="doj"
                      label="Date Of Join"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="date"
                      placeholder="Date Of Leave"
                      size="large"
                      fullWidth
                      id="dol"
                      name="dol"
                      label="Date Of Leave"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="number"
                      placeholder="Phone Number"
                      size="large"
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                      error={errors.phoneNumber && touched.phoneNumber}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Alternative Number"
                      size="large"
                      fullWidth
                      id="alternativeNumber"
                      name="alternativeNumber"
                      label="Alternative Number"
                      value={values.alternativeNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={
                        errors.alternativeNumber &&
                        touched.alternativeNumber &&
                        errors.alternativeNumber
                      }
                      error={errors.alternativeNumber && touched.alternativeNumber}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Permanent Address"
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
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    sx={{ p: 2, pt: 0, pb: 0 }}
                    aria-label="font-family"
                    // value={fontFamily}
                    // onChange={(e) => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                      }}
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                      }}
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default PersonalDetails;
