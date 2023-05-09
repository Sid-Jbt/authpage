import React, { useState } from 'react';
import { Checkbox, InputAdornment } from '@mui/material';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { getLoginPattern, loginPattern } from 'Routes/routeConfig';
import { Formik } from 'formik';
import { organisationSignupSchema } from 'Helpers/ValidationSchema';
import { keyDownValidation } from 'Helpers/Global';

export const PROVIDER_DOMAIN = process.env.REACT_APP_PROVIDER_DOMAIN;

const OrganisationSignup = () => {
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  const [domain, setDomain] = useState(null);
  const { GetOrganisationSignup, GetDomain } = useOutletContext();

  const getDomain = (value) => {
    GetDomain({ domain: value }, (res) => {
      if (res && res.data) {
        if (res.data.status) {
          setDomain(1);
        } else {
          setDomain(0);
        }
      }
    });
  };

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
              organisationName: values.organisationName,
              domain: values.domain
            },
            (res) => {
              if (res.data.status) {
                navigate(getLoginPattern());
              }
            }
          );
          actions.setSubmitting(false);
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
            isSubmitting,
            setFieldError
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
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
                onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
              />
              <Input
                placeholder="White Label Domain"
                type="text"
                size="large"
                fullWidth
                id="domain"
                name="domain"
                value={values.domain.toLowerCase()}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <Typography variant="caption" fontWeight="regular">
                      {PROVIDER_DOMAIN}
                    </Typography>
                  </InputAdornment>
                }
                onBlur={(e) => {
                  if (e.target.value) {
                    getDomain(e.target.value);
                  } else {
                    setFieldError('domain', 'Required');
                  }
                }}
                errorText={
                  (errors.domain && touched.domain && errors.domain) ||
                  (domain === 0 && 'Domain already used')
                }
                error={(errors.domain && touched.domain) || domain === 0}
                success={domain === 1}
                onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
              />
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
              <Box display="flex" alignItems="center">
                <Checkbox checked={agreement} onChange={() => setAgreement(!agreement)} />
                <Typography
                  variant="button"
                  fontWeight="regular"
                  onClick={() => setAgreement(!agreement)}
                  sx={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </Typography>
                <Typography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                  Terms and Conditions
                </Typography>
              </Box>
              <Button
                variant="gradient"
                color="dark"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting || !agreement}
                sx={{ mt: 1 }}
              >
                Sign up
              </Button>
              <Box mt={0.5}>
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

export default OrganisationSignup;
