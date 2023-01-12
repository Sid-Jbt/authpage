import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import validationSchema from 'Helpers/ValidationSchema';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);

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
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            console.log('values', values);
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box mb={0.5}>
                  <Input
                    type="email"
                    placeholder="Email"
                    size="large"
                    fullWidth
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.email && touched.email && errors.email}
                    error={errors.email && touched.email}
                  />
                </Box>

                <Box mb={0.5}>
                  <Input
                    type="password"
                    placeholder="password"
                    size="large"
                    fullWidth
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.password && touched.password && errors.password}
                    error={errors.password && touched.password}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
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
                  <Box>
                    <Typography
                      component={Link}
                      to="/forgot-password"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      underline
                    >
                      Forgot Password?
                    </Typography>
                  </Box>
                </Box>
                <Box mt={4} mb={1}>
                  <Button color="info" size="large" fullWidth type="submit" disabled={isSubmitting}>
                    Sign In
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
