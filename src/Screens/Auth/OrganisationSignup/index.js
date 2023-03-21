import { Checkbox } from '@mui/material';
import React, { useState } from 'react';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginPattern, loginPattern } from 'Routes/routeConfig';
import { Formik } from 'formik';
import { organisationSignupSchema } from 'Helpers/ValidationSchema';
import withStateDispatch from 'Helpers/withStateDispatch';

const OrganisationSignup = ({ GetOrganisationSignup }) => {
  const navigate = useNavigate();
  const [agreement, setAgreemment] = useState(false);

  return (
    <>
      <Box mb={1} textAlign="center">
        <Typography variant="h4" fontWeight="bold">
          Create Organisation
        </Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={{ organisationName: '', email: '', password: '', domain: '' }}
        onSubmit={(values, actions) => {
          GetOrganisationSignup(
            {
              email: values.email,
              password: values.password,
              organisationName: values.organisationName
            },
            (res) => {
              if (res.data.status) {
                navigate(getLoginPattern());
              }
            },
            (err) => {
              // eslint-disable-next-line no-console
              console.log(err);
            }
          );
          actions.setSubmitting(false);
        }}
        validationSchema={organisationSignupSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Box mb={0.5}>
                <Input
                  type="name"
                  placeholder="Name"
                  size="large"
                  fullWidth
                  id="organisationName"
                  name="organisationName"
                  value={values.organisationName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={
                    errors.organisationName && touched.organisationName && errors.organisationName
                  }
                  error={errors.organisationName && touched.organisationName}
                  success={!errors.organisationName && touched.organisationName}
                />
              </Box>
              <Box mb={0.5}>
                <Input
                  placeholder="White Label Domain"
                  size="large"
                  fullWidth
                  id="domain"
                  name="domain"
                  value={values.domain}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.domain && touched.domain && errors.domain}
                  error={errors.domain && touched.domain}
                  success={!errors.domain && touched.domain}
                  type="text"
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
                  type="password"
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Checkbox checked={agreement} onChange={() => setAgreemment(!agreement)} />
                <Typography
                  variant="button"
                  fontWeight="regular"
                  onClick={() => setAgreemment(!agreement)}
                  sx={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </Typography>
                <Typography component="a" href="#" variant="button" fontWeight="bold" textGradient>
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
    </>
  );
};

export default withStateDispatch(OrganisationSignup);
