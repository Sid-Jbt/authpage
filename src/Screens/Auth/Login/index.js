import React, { Suspense, useContext, useState } from 'react';
import { IconButton, InputAdornment, Switch } from '@mui/material';
import { Check, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { loginSchema } from 'Helpers/ValidationSchema';
import { getProfileSetupPattern } from 'Routes/routeConfig';
import { useDispatch } from 'react-redux';
import { ROLE, ROLELIST } from 'Redux/actions';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { AdminRoleList, EmployeeRoleList } from 'Helpers/Global';
import Loader from '../../../Elements/Loader';

const Login = () => {
  const dispatchRole = useDispatch();
  const dispatchRoleList = useDispatch();

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const onLogin = (formData, actions) => {
    const { email } = formData;
    setSnack({
      title: 'Success',
      message: 'Logged in successfully',
      time: false,
      icon: <Check color="white" />,
      color: 'success',
      open: true
    });
    if (email === 'admin@gmail.com') {
      dispatchRoleList({
        type: ROLELIST,
        value: AdminRoleList
      });
      dispatchRole({ type: ROLE, value: 'admin' });
    } else {
      dispatchRoleList({
        type: ROLELIST,
        value: EmployeeRoleList
      });
      dispatchRole({ type: ROLE, value: 'employee' });
    }
    actions.setSubmitting(false);
    navigate(getProfileSetupPattern());
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
      </Suspense>
    </>
  );
};

export default Login;
