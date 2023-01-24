import React from 'react';
import Box from 'Elements/Box';
import { Card, Grid, useTheme } from '@mui/material';
import { Formik } from 'formik';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { resetPasswordSchema } from 'Helpers/ValidationSchema';
import Input from 'Elements/Input';

const ChangePassword = () => {
  const theme = useTheme();

  return (
    <Card id="changePassword">
      <Grid container p={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
            Change Password
          </Typography>
        </Grid>
      </Grid>

      <Formik
        enableReinitialize
        initialValues={{
          currentPassword: '',
          password: '',
          confirmNewPassword: ''
        }}
        onSubmit={(values) => {
          console.log('values', values);
        }}
        validationSchema={resetPasswordSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit} style={{ background: theme.palette.grey[100] }}>
              <Grid container spacing={1} p={2}>
                <Grid item xs={12} md={6} lg={12}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="********"
                      size="large"
                      fullWidth
                      id="currentPassword"
                      name="currentPassword"
                      label="Current Password"
                      value={values.currentPassword}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={12}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="********"
                      size="large"
                      fullWidth
                      id="password"
                      name="password"
                      label="New Password"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.password && touched.password && errors.password}
                      error={errors.password && touched.password}
                      success={!errors.password && touched.password}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="********"
                      size="large"
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm New Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={
                        errors.confirmPassword && touched.confirmPassword && errors.confirmPassword
                      }
                      error={errors.confirmPassword && touched.confirmPassword}
                      success={!errors.confirmPassword && touched.confirmPassword}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <Grid container p={2} alignItems="end" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h4" fontWeight="medium">
                        Password requirements
                      </Typography>
                      <Typography variant="h6" fontWeight="regular">
                        Please follow this guide for a strong password One
                      </Typography>
                      <Typography variant="h6" fontWeight="regular">
                        One special characters
                      </Typography>
                      <Typography variant="h6" fontWeight="regular">
                        Minimum 8 characters
                      </Typography>
                      <Typography variant="h6" fontWeight="regular">
                        At least one upper case letters
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color="info" variant="contained" disabled={isSubmitting}>
                        Update Password
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default ChangePassword;
