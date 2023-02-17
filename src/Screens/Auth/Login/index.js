import React, { Suspense, useContext, useState } from 'react';
import { IconButton, InputAdornment, Switch } from '@mui/material';
import { Check, Visibility, VisibilityOff, Error } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { loginSchema } from 'Helpers/ValidationSchema';
import {
  forgotPasswordPattern,
  getDashboardPattern,
  getDefaultPattern,
  organisationSignupPattern
} from 'Routes/routeConfig';
import { useDispatch } from 'react-redux';
import { CURRENTUSER, ROLE, ROLELIST } from 'Redux/actions';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { AdminRoleList, EmployeeRoleList } from 'Helpers/Global';
import Loader from 'Elements/Loader';
import { login } from 'APIs/API';

const Login = () => {
  const dispatchRole = useDispatch();
  const dispatchRoleList = useDispatch();
  const dispatchCurrentUser = useDispatch();
  const navigate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  console.log('------', process.env.REACT_APP_DESCRIPTION);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const onLogin = async (formData, actions) => {
    const loginRes = await login(formData);
    const { status, message, data } = loginRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      if (data.role === 'admin') {
        dispatchRoleList({
          type: ROLELIST,
          value: AdminRoleList
        });
        dispatchRole({ type: ROLE, value: 'admin' });
      } else if (data.role === 'employee') {
        dispatchRoleList({
          type: ROLELIST,
          value: EmployeeRoleList
        });
        dispatchRole({ type: ROLE, value: 'employee' });
      } else {
        getDefaultPattern();
      }
      dispatchCurrentUser({
        type: CURRENTUSER,
        value: data
      });
      actions.setSubmitting(false);
      navigate(getDashboardPattern());
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
      <Suspense fallback={<Loader />}>
        <Box mb={1}>
          <Typography variant="h4" fontWeight="bold">
            Sign In
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text" mb={1}>
          Enter your email and password to sign in
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => onLogin(values, actions)}
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
                      to={forgotPasswordPattern}
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
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
        <Box mt={3} textAlign="center">
          <Typography variant="button" color="text" fontWeight="regular">
            Don't have an account?&nbsp;
            <Typography
              component={Link}
              to={organisationSignupPattern}
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign Up
            </Typography>
          </Typography>
        </Box>
      </Suspense>
    </>
  );
};

export default Login;
