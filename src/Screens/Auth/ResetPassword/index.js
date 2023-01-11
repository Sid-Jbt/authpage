import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { Link } from 'react-router-dom';

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
    <Input type="password" placeholder="New Password" size="large" sx={{ marginTop: 2 }} />
    <Input type="password" placeholder="Confirm Password" size="large" sx={{ marginTop: 2 }} />
    <Box mt={4} mb={1}>
      <Button
        variant="contained"
        color="info"
        size="large"
        fullWidth
        component={Link}
        to="/dashboard"
      >
        Reset Password
      </Button>
    </Box>
    <Box mt={3} textAlign="center">
      <Typography variant="button" color="text" fontWeight="regular">
        Don&apos;t have an account?{' '}
        <Typography component={Link} to="/login" variant="button" color="info" fontWeight="medium">
          Sign In
        </Typography>
      </Typography>
    </Box>
  </div>
);

export default RestPassword;
