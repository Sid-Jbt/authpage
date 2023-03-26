import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { forgotPasswordSchema } from 'Helpers/ValidationSchema';
import { getDefaultPattern } from 'Routes/routeConfig';
import { CircularProgress } from '@mui/material';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { GetForgotPassword, Loading } = useOutletContext();

  return (
    <>
      <Box mb={1} textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          Forgot Password
        </Typography>
      </Box>
      <Typography variant="body2" textAlign="center" fontWeight="regular" color="text">
        Enter your email to get the link
      </Typography>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, actions) => {
          GetForgotPassword({ email: values.email }, (res) => {
            if (res.data.status) {
              navigate(getDefaultPattern());
            }
          });
          actions.setSubmitting(false);
        }}
        validationSchema={forgotPasswordSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
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
                success={!errors.email && touched.email}
              />

              <Box mt={2} mb={1}>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting || Loading}
                >
                  {Loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    'Forgot Password Link'
                  )}
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

export default ForgotPassword;
