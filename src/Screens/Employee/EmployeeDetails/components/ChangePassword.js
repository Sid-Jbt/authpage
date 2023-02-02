import { useContext } from 'react';
import { Card, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { Formik } from 'formik';
import { changePasswordSchema } from 'Helpers/ValidationSchema';
import { SnackbarContext } from 'Context/SnackbarProvider';

const ChangePassword = () => {
  const { setSnack } = useContext(SnackbarContext);
  const passwordRequirements = [
    'One special characters',
    'One upper character',
    'Min 8 characters',
    'One number',
    'Change it often'
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <Box key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <Typography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </Typography>
      </Box>
    );
  });

  return (
    <Card id="change-password">
      <Box p={3}>
        <Typography variant="h5">Change Password</Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        }}
        onSubmit={(values, actions) => {
          setSnack({
            title: 'Success',
            message: 'Password changed successfully',
            time: false,
            color: 'success',
            open: true
          });
          actions.setSubmitting(false);
        }}
        validationSchema={changePasswordSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Box component="form" pb={3} px={3}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Input
                      name="currentPassword"
                      placeholder="Current Password"
                      label="Current Password"
                      size="large"
                      type="password"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={
                        errors.currentPassword && touched.currentPassword && errors.currentPassword
                      }
                      error={errors.currentPassword && touched.currentPassword}
                      success={!errors.currentPassword && touched.currentPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      name="newPassword"
                      placeholder="New Password"
                      label="New Password"
                      size="large"
                      type="password"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.newPassword && touched.newPassword && errors.newPassword}
                      error={errors.newPassword && touched.newPassword}
                      success={!errors.newPassword && touched.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      name="confirmNewPassword"
                      placeholder="Confirm New Password"
                      label="Confirm New Password"
                      size="large"
                      type="password"
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
                    />
                  </Grid>
                </Grid>
                <Box mt={2} mb={1}>
                  <Typography variant="h5">Password requirements</Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="body2" color="text">
                    Please follow this guide for a strong password
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  flexWrap="wrap"
                >
                  <Box component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
                    {renderPasswordRequirements}
                  </Box>
                  <Box ml="auto">
                    <Button
                      variant="gradient"
                      color="dark"
                      size="small"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Update Password
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default ChangePassword;
