import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import validationSchema from '../../../Helpers/ValidationSchema';

const RestPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        Create new password
      </Typography>
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
                  name="password"
                  placeholder="New Password"
                  size="large"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.password && touched.password && errors.password}
                  error={errors.password && touched.password}
                  success={!errors.password && touched.password}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box mt={0.5}>
                <Input
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
                  success={!errors.confirmPassword && touched.confirmPassword}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box mt={1}>
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
          Already have an account?&nbsp;
          <Typography component={Link} to="/" variant="button" color="info" fontWeight="medium">
            Sign In
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default RestPassword;
