import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string('Enter your email').email(true).required('Email is required')
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  console.log('shfjksgfuisgf', formik.values, formik.errors);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <Box>
      <Box mb={1}>
        <Typography variant="h4" fontWeight="bold">
          Sign In
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight="regular" color="text" mb={1}>
        Enter your email and password to sign in
      </Typography>
      <Box component="form" role="form">
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <Input
              type="email"
              placeholder="Email"
              size="large"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
          </Box>
        </form>
        <Box mb={2}>
          <Input type="password" placeholder="Password" size="large" />
        </Box>
        <Box display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <Typography
            variant="button"
            fontWeight="regular"
            onClick={() => console.log('onPressRememberMe')}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            &nbsp;&nbsp;Remember me
          </Typography>
        </Box>
        <Box mt={4} mb={1}>
          <Button color="info" size="large" fullWidth onClick={() => console.log('onPressSignIn')}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
