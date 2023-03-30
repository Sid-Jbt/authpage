import { Card, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { Formik } from 'formik';
import { changePasswordSchema } from 'Helpers/ValidationSchema';

const ChangePassword = () => (
  <Card id="change-password">
    <Box p={3}>
      <Typography variant="h5">Change Password</Typography>
    </Box>
    <Formik
      enableReinitialize
      initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
      onSubmit={(values, actions) => {
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
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={4}>
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
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
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
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
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
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                flexWrap="wrap"
              >
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

export default ChangePassword;
