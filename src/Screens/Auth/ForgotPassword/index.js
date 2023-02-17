import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { forgotPasswordSchema } from 'Helpers/ValidationSchema';
import { defaultPattern, getResetPasswordPattern } from 'Routes/routeConfig';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { Check, Error } from '@mui/icons-material';
import { companyForgotPassword } from 'APIs/API';

const ForgotPassword = () => {
  const { setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const onSubmit = async (formData, actions) => {
    const forgotPasswordRes = await companyForgotPassword(formData);
    const { status, message } = forgotPasswordRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      actions.setSubmitting(false);
      navigate(getResetPasswordPattern());
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
    }
  };

  return (
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
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
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
                  disabled={isSubmitting}
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
          <Typography
            component={Link}
            to={defaultPattern}
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
