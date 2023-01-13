import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import validationSchema from '../../../Helpers/ValidationSchema';

const RestPassword = () => (
  <div style={{ margin: 10 }}>
    <>
      <Box mb={1}>
        <Typography variant="h4" fontWeight="bold">
          Create new password
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight="regular" color="text">
        Your new password must be different from previous used password.
      </Typography>
    </>
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={(values) => {
        console.log('values', values);
      }}
      validationSchema={validationSchema}
    >
      {(props) => {
        // please add isSubmitting while api binding
        const { values, touched, errors, handleSubmit, handleChange, handleBlur } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <Input
                type="password"
                name="password"
                placeholder="New Password"
                size="large"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.password && touched.password && errors.password}
                error={errors.password && touched.password}
              />
            </Box>
            <Box mt={2}>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                size="large"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={
                  errors.confirmPassword && touched.confirmPassword && errors.confirmPassword
                }
                error={errors.confirmPassword && touched.confirmPassword}
              />
            </Box>
            <Box mb={1}>
              <Button
                variant="contained"
                color="info"
                size="large"
                fullWidth
                component={Link}
                to="/dashboard"
                // type="submit"
                // disabled={isSubmitting}
              >
                Reset Password
              </Button>
            </Box>
          </form>
        );
      }}
    </Formik>
    <Box mt={3} textAlign="center">
      <Typography variant="button" color="text" fontWeight="regular">
        Don&apos;t have an account?{' '}
        <Typography component={Link} to="/" variant="button" color="info" fontWeight="medium">
          Sign In
        </Typography>
      </Typography>
    </Box>
  </div>
);

export default RestPassword;
