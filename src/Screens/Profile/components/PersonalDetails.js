import React, { useState } from 'react';
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
import moment from 'moment';
import { profileSchema } from 'Helpers/ValidationSchema';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { useSelector } from 'react-redux';

const initialValues = {
  firstName: '',
  lastName: '',
  fatherName: '',
  department: '',
  designation: '',
  pAdd: '',
  alternativeNumber: '',
  phoneNumber: '',
  dateOfBirth: moment().format('YYYY-MM-DD')
};

const PersonalDetails = () => {
  const { role } = useSelector((state) => state.route);
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(true);
  const handleIsEdit = () => setIsEdit(!isEdit);

  console.log('role --> ', role);

  return (
    <Card>
      <Grid container p={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
            My Account
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
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('values', values);
        }}
        validationSchema={profileSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} p={2}>
                <Grid item xs={12} md={6} lg={4}>
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

                <Grid item xs={12} md={6} lg={4}>
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
                {role !== 'admin' && (
                  <>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box>
                        <Input
                          type="text"
                          placeholder="Alec"
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
                          success={!errors.fatherName && touched.fatherName}
                          disabled={isEdit}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box>
                        <Input
                          type="text"
                          placeholder="eg. Development"
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
                          success={!errors.department && touched.department}
                          disabled={isEdit}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box>
                        <Input
                          type="text"
                          placeholder="ex. Web Developer"
                          size="large"
                          fullWidth
                          id="designation"
                          name="designation"
                          label="Designation"
                          value={values.designation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorText={
                            errors.designation && touched.designation && errors.designation
                          }
                          error={errors.designation && touched.designation}
                          success={!errors.designation && touched.designation}
                          disabled={isEdit}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Box>
                        <Input
                          type="text"
                          placeholder="Emp001"
                          size="large"
                          fullWidth
                          id="empCode"
                          name="empCode"
                          label="Employee Code"
                          value={values.empCode}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          // errorText={errors.empCode && touched.empCode && errors.empCode}
                          // error={errors.empCode && touched.empCode}
                          disabled
                        />
                      </Box>
                    </Grid>
                  </>
                )}

                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="date"
                      placeholder="Date Of Birth"
                      size="large"
                      fullWidth
                      id="dateOfBirth"
                      name="dateOfBirth"
                      label="Date Of Birth"
                      defaultValue={values.dateOfBirth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.dateOfBirth && touched.dateOfBirth && errors.dateOfBirth}
                      error={errors.dateOfBirth && touched.dateOfBirth}
                      success={!errors.dateOfBirth && touched.dateOfBirth}
                      disabled={isEdit}
                    />
                  </Box>
                </Grid>
                {role !== 'admin' && (
                  <>
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
                          disabled
                          value={values.dol}
                        />
                      </Box>
                    </Grid>
                  </>
                )}
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
                      minLength="9"
                      maxLength="14"
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
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="number"
                      placeholder="+91 925 532 5325"
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
                      success={!errors.alternativeNumber && touched.alternativeNumber}
                      disabled={isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
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
                <Grid item xs={12} md={6} lg={4}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    sx={{ p: 2, pt: 0, pb: 0 }}
                    aria-label="font-family"
                    // value={fontFamily}
                    // onChange={(e) => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                    defaultValue="male"
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                      }}
                      defaultChecked
                      disabled={isEdit}
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                      }}
                      disabled={isEdit}
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
