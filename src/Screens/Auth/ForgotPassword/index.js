import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string('Enter your email').email(true).required('Email is required')
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Box style={{ margin: 10 }}>
      <>
        <Box mb={1}>
          <Typography variant="h4" fontWeight="bold">
            Forgot Password
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Enter your email to get the link
        </Typography>
      </>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          size="large"
          sx={{ marginTop: 2 }}
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
      </form>
      <Box mt={4} mb={1}>
        <Button
          variant="contained"
          color="info"
          size="large"
          fullWidth
          component={Link}
          to="/reset-password"
        >
          Forgot Password Link
        </Button>
      </Box>
      <Box mt={3} textAlign="center">
        <Typography variant="button" color="text" fontWeight="regular">
          Don&apos;t have an account?{' '}
          <Typography component={Link} to="/" variant="button" color="info" fontWeight="medium">
            Sign In
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
