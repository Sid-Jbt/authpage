import React from 'react';
import { CircularProgress, FormControlLabel, Switch } from '@mui/material';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { loginSchema } from 'Helpers/ValidationSchema';
import { getForgotPasswordPattern, getDashboardPattern } from 'Routes/routeConfig';

const Login = () => {
  const navigate = useNavigate();
  const { GetLogin, Loading } = useOutletContext();

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
        initialValues={{ email: '', password: '', rememberMe: false }}
        onSubmit={(values, actions) => {
          GetLogin(
            { email: values.email, password: values.password, rememberMe: values.rememberMe },
            () => {
              navigate(getDashboardPattern());
            }
          );
          actions.setSubmitting(false);
        }}
        validationSchema={loginSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Input
                autoComplete="username"
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
              <Input
                autoComplete="current-password"
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  sx={{ m: 0, fontSize: '14px' }}
                  value={values.rememberMe}
                  control={
                    <Switch
                      checked={values.rememberMe}
                      color="primary"
                      name="remember"
                      onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
                    />
                  }
                  label={
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      sx={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Remember Me
                    </Typography>
                  }
                  labelPlacement="end"
                />
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

export default Login;
