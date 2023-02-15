import { Card, Checkbox, Grid, IconButton, InputAdornment } from '@mui/material';
import React, { useContext, useState } from 'react';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginPattern, loginPattern } from 'Routes/routeConfig';
import { Formik } from 'formik';
import { Check, Visibility, VisibilityOff } from '@mui/icons-material';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { organisationSignupSchema } from 'Helpers/ValidationSchema';

const image = 'https://jarvisbitz.com/wp-content/uploads/2022/02/banner-shape-1.png';

const OrganisationSignup = () => {
  const navigate = useNavigate();
  const [agreement, setAgremment] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { setSnack } = useContext(SnackbarContext);

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      display="grid"
      alignItems="center"
      width="100%"
      height="100vh"
      minHeight="100vh"
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          image &&
          `${linearGradient(
            rgba(gradients.dark.main, 0.6),
            rgba(gradients.dark.state, 0.6)
          )}, url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box px={1} width="100%" mx="auto">
        <Grid container justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <Box p={3} mb={1} textAlign="center">
                <Typography variant="h5" fontWeight="medium">
                  Register Organisation
                </Typography>
              </Box>
              <Box pb={3} px={3}>
                <Formik
                  enableReinitialize
                  initialValues={{ name: '', email: '', password: '' }}
                  onSubmit={(values, actions) => {
                    setSnack({
                      title: 'Success',
                      message:
                        'Organisation sigup successfully. Please login with your credentials',
                      time: false,
                      icon: <Check color="white" />,
                      color: 'success',
                      open: true
                    });
                    actions.setSubmitting(false);
                    navigate(getLoginPattern());
                  }}
                  validationSchema={organisationSignupSchema}
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
                            type="name"
                            placeholder="Name"
                            size="large"
                            fullWidth
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorText={errors.name && touched.name && errors.name}
                            error={errors.name && touched.name}
                            success={!errors.name && touched.name}
                          />
                        </Box>
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
                        <Box display="flex" alignItems="center">
                          <Checkbox checked={agreement} onChange={handleSetAgremment} />
                          <Typography
                            variant="button"
                            fontWeight="regular"
                            onClick={handleSetAgremment}
                            sx={{ cursor: 'pointer', userSelect: 'none' }}
                          >
                            &nbsp;&nbsp;I agree the&nbsp;
                          </Typography>
                          <Typography
                            component="a"
                            href="#"
                            variant="button"
                            fontWeight="bold"
                            textGradient
                          >
                            Terms and Conditions
                          </Typography>
                        </Box>
                        <Box mt={4} mb={1}>
                          <Button
                            variant="gradient"
                            color="dark"
                            size="large"
                            fullWidth
                            type="submit"
                            disabled={isSubmitting || !agreement}
                          >
                            Sign up
                          </Button>
                        </Box>
                        <Box mt={2}>
                          <Typography variant="button" color="text" fontWeight="regular">
                            Already have an account?&nbsp;
                            <Typography
                              component={Link}
                              to={loginPattern}
                              variant="button"
                              color="dark"
                              fontWeight="bold"
                              textGradient
                            >
                              Sign in
                            </Typography>
                          </Typography>
                        </Box>
                      </form>
                    );
                  }}
                </Formik>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrganisationSignup;
