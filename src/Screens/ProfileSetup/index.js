import React, { useState } from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Formik } from 'formik';
import { Card, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { getDashboardPattern } from 'Routes/routeConfig';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Basic from './component/Basic';
import Address from './component/Address';
import Account from './component/Account';
import Organisation from './component/Organisation';
import { basicSchema } from '../../Helpers/ValidationSchema';

const initialValues = {
  workingHours: '',
  permanentAdd: '',
  firstName: '',
  lastName: '',
  bankName: '',
  branchName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  panNumber: '',
  perAddress: '',
  currentAdd: ''
};

function getSteps() {
  const customization = useSelector((state) => state.route);

  return customization.role === 'admin'
    ? ['Organisation', 'Basic', 'Address']
    : ['Basic', 'Address', 'Account'];
}

function getStepContent(stepIndex, props) {
  console.log('props', props);
  const customization = useSelector((state) => state.route);

  switch (stepIndex) {
    case 0:
      return customization.role === 'admin' ? (
        <Organisation props={props} />
      ) : (
        <Basic props={props} />
      );
    case 1:
      return customization.role === 'admin' ? <Basic props={props} /> : <Address />;
    case 2:
      return customization.role === 'admin' ? <Address /> : <Account props={props} />;
    default:
      return null;
  }
}

const ProfileSetup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () =>
    !isLastStep ? setActiveStep(activeStep + 1) : navigate(getDashboardPattern());
  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <>
      <Box pt={3} pb={8} position="relative">
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Box mt={2} mb={12} textAlign="center">
              <Box mb={1}>
                <Typography variant="h3" color="white" fontWeight="bold">
                  Setup Your Profile
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="regular" color="white">
                This information will let us know more about you.
              </Typography>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Card>
              <Box p={2}>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={() => {
                    handleNext();
                  }}
                  validationSchema={basicSchema}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      {getStepContent(activeStep, props)}
                      <Box mt={3} width="100%" display="flex" justifyContent="space-between">
                        {activeStep === 0 ? (
                          <Box />
                        ) : (
                          <Button variant="gradient" color="light" onClick={() => handleBack()}>
                            Back
                          </Button>
                        )}
                        <Button variant="gradient" color="dark" type="submit">
                          {activeStep === 0 || isLastStep ? 'Continue' : 'SKIP'}
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfileSetup;
