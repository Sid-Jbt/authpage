import { FormControlLabel, Grid, RadioGroup, Radio, useTheme, FormLabel } from '@mui/material';
import Icon from '@mui/material/Icon';

import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import Button from 'Elements/Button';

import team2 from 'Assets/Images/team-4-800x800.jpg';
import { Edit } from '@mui/icons-material';
import { Formik } from 'formik';
import moment from 'moment';
import Input from 'Elements/Input';
import { validationSchema } from 'Helpers/ValidationSchema';

const initialValues = {
  firstName: '',
  lastName: '',
  fatherName: '',
  department: '',
  designation: '',
  alternativeNumber: '',
  phoneNumber: '',
  dateOfBirth: moment().format('YYYY-MM-DD')
};

const Basic = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            Let&apos;s start with the basic information
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Let us know more about you.
        </Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('values', values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Box mt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3} container justifyContent="center">
                    <Box position="relative" height="max-content" mx="auto">
                      <Avatar src={team2} alt="profile picture" size="xxl" variant="rounded" />
                      <Box
                        alt="spotify logo"
                        position="absolute"
                        right={0}
                        bottom={0}
                        mr={-1}
                        mb={-1}
                      >
                        <Button variant="gradient" color="light" size="small" iconOnly>
                          <Icon>
                            <Edit />
                          </Icon>
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Grid container spacing={1} rowSpacing={0}>
                      <Grid item xs={12} md={5}>
                        <Box>
                          <Input
                            type="text"
                            placeholder="Alen"
                            size="medium"
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
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Box>
                          <Input
                            type="text"
                            placeholder="Prior"
                            size="medium"
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
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Box>
                          <Input
                            type="text"
                            placeholder="Alec"
                            size="medium"
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
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Box>
                          <Input
                            type="text"
                            placeholder="eg. Development"
                            size="medium"
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
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <Box>
                          <Input
                            type="text"
                            placeholder="ex. Web Developer"
                            size="medium"
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
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <Box>
                          <Input
                            type="date"
                            placeholder="Date Of Birth"
                            size="medium"
                            fullWidth
                            id="dateOfBirth"
                            name="dateOfBirth"
                            label="Date Of Birth"
                            defaultValue={values.dateOfBirth}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorText={
                              errors.dateOfBirth && touched.dateOfBirth && errors.dateOfBirth
                            }
                            error={errors.dateOfBirth && touched.dateOfBirth}
                            success={!errors.dateOfBirth && touched.dateOfBirth}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <Box>
                          <Input
                            type="number"
                            placeholder="+91 925 532 5324"
                            size="medium"
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            minlength="9"
                            maxlength="14"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorText={
                              errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
                            }
                            error={errors.phoneNumber && touched.phoneNumber}
                            success={!errors.phoneNumber && touched.phoneNumber}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Box>
                          <Input
                            type="number"
                            placeholder="+91 925 532 5325"
                            size="medium"
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
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <Box>
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
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                              sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                              }}
                            />
                          </RadioGroup>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Basic;
