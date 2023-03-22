import React, { useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Card, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import withStateDispatch from 'Helpers/withStateDispatch';
import { WorkingHours } from 'Helpers/Global';
import { organisationSchema, userSchema } from 'Helpers/ValidationSchema';
import { useNavigate } from 'react-router';
import { getDashboardPattern } from 'Routes/routeConfig';
import Basic from './component/Basic';
import Address from './component/Address';
import Account from './component/Account';
import Organisation from './component/Organisation';

const adminInitialValues = {
  workingHours: WorkingHours[0].value,
  location: '',
  firstName: '',
  lastName: '',
  permanentAddress: '',
  presentAddress: '',
  gender: 'male',
  largeLogo: '',
  smallLogo: ''
};

const userInitialValues = {
  firstName: '',
  lastName: '',
  fatherName: '',
  // department: '',
  designation: '',
  phoneNumber: '',
  alternatePhone: '',
  permanentAddress: '',
  presentAddress: '',
  gender: 'male',
  bankName: '',
  branchName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  panNumber: ''
};

function getSteps(role) {
  return role === 'admin' ? ['Organisation', 'Basic', 'Address'] : ['Basic', 'Address', 'Account'];
}

function getStepContent(role, stepIndex, props) {
  switch (stepIndex) {
    case 0:
      return role === 'admin' ? (
        <Organisation role={role} props={props} />
      ) : (
        <Basic role={role} props={props} />
      );
    case 1:
      return role === 'admin' ? (
        <Basic role={role} props={props} />
      ) : (
        <Address role={role} props={props} />
      );
    case 2:
      return role === 'admin' ? (
        <Address role={role} props={props} />
      ) : (
        <Account role={role} props={props} />
      );
    default:
      return null;
  }
}

const ProfileSetup = ({ GetProfileSetup, Loading }) => {
  const { role } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps(role);
  const currentValidationSchema = () =>
    role === 'admin' ? organisationSchema[activeStep] : userSchema[activeStep];
  const handleNext = (values, actions) => {
    GetProfileSetup(values, (res) => {
      const data = res.data;
      if (data.status) {
        if (activeStep === 2) {
          dispatch({ type: 'LOGIN_COMPLETED' });
          navigate(getDashboardPattern());
        }
      }
    });
    setActiveStep(activeStep + 1);
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const Continue = (isSubmitting) => (
    <Button variant="gradient" color="dark" type="submit" disabled={isSubmitting || Loading}>
      {Loading ? <CircularProgress size={20} color="inherit" /> : 'Continue'}
    </Button>
  );

  const Skip = () => (
    <Button variant="gradient" color="dark" type="button" onClick={() => handleNext()}>
      Skip
    </Button>
  );

  const validate = (values) => {
    const errors = {};
    if (values.phoneNumber === values.alternatePhone) {
      errors.alternatePhone = 'Alternate number should not be same as phone number';
    }
    return errors;
  };

  return (
    <Box pt={3} pb={3} position="relative">
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Box mt={2} mb={14} textAlign="center">
            <Typography variant="h3" color="white" fontWeight="bold">
              Setup Your Profile
            </Typography>
            <Typography variant="h5" fontWeight="regular" color="white">
              This information will let us know more about you.
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Card>
            <Box p={2}>
              <Formik
                initialValues={role === 'admin' ? adminInitialValues : userInitialValues}
                onSubmit={handleNext}
                validationSchema={currentValidationSchema}
                validate={
                  role === 'admin' ? activeStep === 1 && validate : activeStep === 0 && validate
                }
              >
                {(props) => {
                  const { values, handleSubmit, isSubmitting } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      {role && getStepContent(role, activeStep, props)}
                      <Box mt={3} width="100%" display="flex" justifyContent="space-between">
                        {activeStep === 0 ? (
                          <Box />
                        ) : (
                          <Button variant="gradient" color="light" onClick={() => handleBack()}>
                            Back
                          </Button>
                        )}
                        {role !== 'admin'
                          ? activeStep === 0
                            ? Continue(isSubmitting)
                            : (activeStep === 1 && values.permanentAddress !== '') ||
                              values.presentAddress !== ''
                            ? Continue(isSubmitting)
                            : (activeStep === 2 && values.bankName !== '') ||
                              values.branchName !== '' ||
                              values.accountName !== '' ||
                              values.accountNumber !== '' ||
                              values.ifscCode !== '' ||
                              values.panNumber !== ''
                            ? Continue(isSubmitting)
                            : Skip()
                          : activeStep === 0 || activeStep === 1
                          ? Continue(isSubmitting)
                          : activeStep === 2 &&
                            (values.permanentAddress !== '' || values.presentAddress !== '')
                          ? Continue(isSubmitting)
                          : Skip()}
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
  );
};

export default withStateDispatch(ProfileSetup);
