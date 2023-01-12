import React from 'react';
import {
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  Radio
} from '@mui/material';
import { Formik } from 'formik';
import validationSchema from 'Helpers/ValidationSchema';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Header from './components/Header';
import Input from '../../Elements/Input';
import Button from '../../Elements/Button';

const Profile = () => (
  <Box>
    <Box height="150px" />
    <Header />
    <Box mt={5} mb={3}>
      <Card>
        <Grid container p={2}>
          <Grid item xs={10} md={11} lg={11}>
            <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
              My Account
            </Typography>
          </Grid>
          <Grid item xs={1} md={1} lg={1}>
            <Button color="info" size="small" fullWidth type="button">
              Edit
            </Button>
          </Grid>
        </Grid>

        <Formik
          initialValues={{
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            fathername: '',
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
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="FirstName"
                        size="large"
                        fullWidth
                        id="firstname"
                        name="firstname"
                        label="FirstName"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.firstname && touched.firstname && errors.firstname}
                        error={errors.firstname && touched.firstname}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="LastName"
                        size="large"
                        fullWidth
                        id="lastname"
                        name="lastname"
                        label="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.lastname && touched.lastname && errors.lastname}
                        error={errors.lastname && touched.lastname}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="FatherName"
                        size="large"
                        fullWidth
                        id="fathername"
                        name="fathername"
                        label="FatherName"
                        value={values.fathername}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.fathername && touched.fathername && errors.fathername}
                        error={errors.fathername && touched.fathername}
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
                        type="text"
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
                        type="text"
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
                        type="text"
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
                    <Box>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          value="female"
                          onChange={(event, value) => console.log('value', event, value)}
                          name="radio-buttons-group"
                        >
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  p={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button color="info" size="small" type="submit" disabled={isSubmitting}>
                    Save
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Card>
    </Box>
  </Box>
);

export default Profile;
