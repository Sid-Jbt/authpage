import { Card, CircularProgress, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { Formik } from 'formik';
import { changePasswordSchema } from 'Helpers/ValidationSchema';
import { useOutletContext } from 'react-router';
import React from 'react';
import { withStateDispatch } from 'Helpers/withStateDispatch';

const ChangePassword = ({ data, Loading }) => {
  const { GetEmployeeChangePassword } = useOutletContext();
  const onSubmit = (values, actions) => {
    const newData = { values, id: data.id };
    GetEmployeeChangePassword(newData, () => {});
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <Card id="change-pass">
      <Box p={3} pb={0}>
        <Typography variant="h5">Change Password</Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
        onSubmit={onSubmit}
        validationSchema={changePasswordSchema}
      >
        {(props) => {
          const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} p={2} justifyContent="flex-end">
                <Grid item xs={12} md={6} lg={4}>
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
                    type="password"
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
                    type="password"
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
                    type="password"
                  />
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

export default withStateDispatch(ChangePassword);
