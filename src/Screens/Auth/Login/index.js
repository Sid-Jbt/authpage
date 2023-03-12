import React, { useState } from 'react';
import { CircularProgress, Switch } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { loginSchema } from 'Helpers/ValidationSchema';
import { getForgotPasswordPattern, getDashboardPattern } from 'Routes/routeConfig';
import withStateDispatch from 'Helpers/withStateDispatch';

const Login = ({ GetLogin, Loading }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <>
      <Box mb={1} textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          Sign In
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight="regular" textAlign="center" color="text" mb={1}>
        Enter your email and password to sign in
      </Typography>

      <Formik
        enableReinitialize
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          GetLogin({ email: values.email, password: values.password }, () => {
            navigate(getDashboardPattern());
          });
          actions.setSubmitting(false);
        }}
        validationSchema={loginSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
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
                  success={!errors.email && touched.email}
                />
              </Box>

              <Box mb={0.5}>
                <Input
                  placeholder="Password"
                  size="large"
                  fullWidth
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.password && touched.password && errors.password}
                  error={errors.password && touched.password}
                  success={!errors.password && touched.password}
                  type="password"
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
                    onClick={handleSetRememberMe}
                    sx={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    &nbsp;&nbsp;Remember me
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    component={Link}
                    to={getForgotPasswordPattern()}
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    underline="true"
                  >
                    Forgot Password?
                  </Typography>
                </Box>
              </Box>
              <Box mt={4} mb={1}>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting || Loading}
                >
                  {Loading ? <CircularProgress size={20} color="inherit" /> : 'Sign In'}
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default withStateDispatch(Login);
