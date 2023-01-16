import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import validationSchema from 'Helpers/ValidationSchema';

const ForgotPassword = () => (
  <>
    <Box mb={1}>
      <Typography variant="h4" fontWeight="bold">
        Forgot Password
      </Typography>
    </Box>
    <Typography variant="body2" fontWeight="regular" color="text">
      Enter your email to get the link
    </Typography>
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values) => {
        console.log('values', values);
      }}
      validationSchema={validationSchema}
    >
      {(props) => {
        // please add isSubmitting while api binding
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              size="large"
              sx={{ marginTop: 2 }}
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={errors.email && touched.email && errors.email}
              error={errors.email && touched.email}
            />

            <Box mt={2} mb={1}>
              <Button
                variant="contained"
                color="info"
                size="large"
                fullWidth
                component={Link}
                to="/reset-password"
                // type="submit"
                // disabled={isSubmitting}
              >
                Forgot Password Link
              </Button>
            </Box>
          </form>
        );
      }}
    </Formik>
    <Box mt={3} textAlign="center">
      <Typography variant="button" color="text" fontWeight="regular">
        Already have an account?&nbsp;
        <Typography component={Link} to="/" variant="button" color="info" fontWeight="medium">
          Sign In
        </Typography>
      </Typography>
    </Box>
  </>
);
export default ForgotPassword;
