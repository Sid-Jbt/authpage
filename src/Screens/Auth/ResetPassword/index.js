import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { resetPasswordSchema } from 'Helpers/ValidationSchema';
import { getDefaultPattern } from 'Routes/routeConfig';
import withStateDispatch from 'Helpers/withStateDispatch';

const ResetPassword = ({ GetForgotPassword }) => {
  const navigate = useNavigate();

  return (
    <>
      <Typography textAlign="center" variant="h4" fontWeight="bold">
        Create new password
      </Typography>
      <Typography variant="body2" textAlign="center" fontWeight="regular" color="text">
        Enter your new password
      </Typography>
      <Formik
        initialValues={{ password: '', resetPassword: '' }}
        onSubmit={(values, actions) => {
          // token to be added TODO
          GetForgotPassword({ token: values.token, password: values.password }, (res) => {
            if (res.data.status) {
              navigate(getDefaultPattern());
            }
          });
          actions.setSubmitting(false);
        }}
        validationSchema={resetPasswordSchema}
      >
        {(props) => {
          const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Box mt={2}>
                <Input
                  name="password"
                  placeholder="New Password"
                  size="large"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.password && touched.password && errors.password}
                  error={errors.password && touched.password}
                  success={!errors.password && touched.password}
                  type="password"
                />
              </Box>
              <Box mt={0.5}>
                <Input
                  name="resetPassword"
                  placeholder="Confirm Password"
                  size="large"
                  value={values.resetPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={
                    errors.confirmPassword && touched.confirmPassword && errors.confirmPassword
                  }
                  error={errors.confirmPassword && touched.confirmPassword}
                  success={!errors.confirmPassword && touched.confirmPassword}
                  type="password"
                />
              </Box>
              <Box mt={1}>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
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
          Already have an account?&nbsp;
          <Typography
            component={Link}
            to={getDefaultPattern()}
            variant="button"
            color="info"
            fontWeight="medium"
          >
            Sign In
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default withStateDispatch(ResetPassword);
