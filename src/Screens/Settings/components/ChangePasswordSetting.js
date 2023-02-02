import React, { useContext } from 'react';
import Typography from 'Elements/Typography';
import { Card, Grid, IconButton, InputAdornment } from '@mui/material';
import { Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePasswordSchema } from 'Helpers/ValidationSchema';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { SnackbarContext } from 'Context/SnackbarProvider';

const ChangePasswordSetting = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { setSnack } = useContext(SnackbarContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card id="change-pass-setting">
      <Box p={3} pb={0}>
        <Typography variant="h5">Change Password</Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
        onSubmit={(values, actions) => {
          setSnack({
            title: 'Success',
            message: 'Password successfully reset.',
            time: false,
            color: 'success',
            open: true
          });
          actions.setSubmitting(false);
        }}
        validationSchema={changePasswordSchema}
      >
        {(props) => {
          const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} p={2} justifyContent="flex-end">
                <Grid item xs={12} md={6} lg={4}>
                  <Box mt={0.5}>
                    <Input
                      name="currentPassword"
                      placeholder="Current Password"
                      size="large"
                      label="Current Password"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={
                        errors.currentPassword && touched.currentPassword && errors.currentPassword
                      }
                      error={errors.currentPassword && touched.currentPassword}
                      success={!errors.currentPassword && touched.currentPassword}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
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
                  <Box mt={0.5}>
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
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
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
                  <Box mt={0.5}>
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
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
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
                    disabled={isSubmitting}
                  >
                    Update Password
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
