import React, { useState } from 'react';
import Typography from 'Elements/Typography';
import { Card, CircularProgress, Grid, IconButton, InputAdornment } from '@mui/material';
import { Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePasswordSchema } from 'Helpers/ValidationSchema';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { useNavigate, useOutletContext } from 'react-router';
import { getDashboardPattern } from '../../../Routes/routeConfig';

const ChangePasswordSetting = ({ Loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { GetChangePassword } = useOutletContext();
  const navigate = useNavigate();

  return (
    <Card id="change-pass-setting">
      <Box p={3} pb={0}>
        <Typography variant="h5">Change Password</Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
        onSubmit={(values) =>
          GetChangePassword(values, (res) => {
            if (res && res.data) {
              if (res.data.status) {
                navigate(getDashboardPattern());
              }
            }
          })
        }
        validationSchema={changePasswordSchema}
      >
        {(props) => {
          const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} p={2} justifyContent="flex-end">
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      name="oldPassword"
                      placeholder="Current Password"
                      size="large"
                      label="Current Password"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.oldPassword && touched.oldPassword && errors.oldPassword}
                      error={errors.oldPassword && touched.oldPassword}
                      success={!errors.oldPassword && touched.oldPassword}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      name="newPassword"
                      placeholder="New Password"
                      size="large"
                      label="New Password"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.newPassword && touched.newPassword && errors.newPassword}
                      error={errors.newPassword && touched.newPassword}
                      success={!errors.newPassword && touched.newPassword}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      name="confirmNewPassword"
                      placeholder="Confirm New Password"
                      size="large"
                      label="Confirm New Password"
                      value={values.confirmNewPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={
                        errors.confirmNewPassword &&
                        touched.confirmNewPassword &&
                        errors.confirmNewPassword
                      }
                      error={errors.confirmNewPassword && touched.confirmNewPassword}
                      success={!errors.confirmNewPassword && touched.confirmNewPassword}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4} textAlign="end">
                  <Button
                    variant="gradient"
                    color="dark"
                    size="small"
                    type="submit"
                    disabled={Loading || isSubmitting}
                  >
                    {Loading ? (
                      <CircularProgress disableShrink color="inherit" />
                    ) : (
                      'Update Password'
                    )}
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

export default ChangePasswordSetting;
