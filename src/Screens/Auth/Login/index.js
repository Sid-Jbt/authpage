import React from 'react';
import { Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';

const Login = () => (
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
      <Box mb={2}>
        <Input type="email" placeholder="Email" size="large" />
      </Box>
      <Box mb={2}>
        <Input type="password" placeholder="Password" size="large" />
      </Box>
      <Box display="flex" alignItems="center">
        <Switch />
        <Typography
          variant="button"
          fontWeight="regular"
          onClick={() => console.log('hello')}
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
      <Box mt={3} textAlign="center">
        <Typography variant="button" color="text" fontWeight="regular">
          Don&apos;t have an account?{' '}
          <Typography
            component={Link}
            to="/authentication/sign-up"
            variant="button"
            color="info"
            fontWeight="medium"
          >
            Sign up
          </Typography>
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default Login;
