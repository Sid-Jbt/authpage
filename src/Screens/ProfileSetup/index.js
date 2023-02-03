import React, { useState } from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Card, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { getDashboardPattern } from 'Routes/routeConfig';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Basic from './component/Basic';
import Address from './component/Address';
import Account from './component/Account';
import Organisation from './component/Organisation';

function getSteps() {
  const customization = useSelector((state) => state.route);

  return customization.role === 'admin'
    ? ['Organisation', 'Basic', 'Address']
    : ['Basic', 'Address', 'Account'];
}

const ProfileSetup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [details, setDetails] = useState({
    selectTime: '',
    permanentAdd: ''
  });
  const [basicdetails, setBasicDetails] = useState({
    fname: '',
    lname: ''
  });
  const navigate = useNavigate();
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  function getStepContent(stepIndex) {
    const customization = useSelector((state) => state.route);

    switch (stepIndex) {
      case 0:
        return customization.role === 'admin' ? (
          <Organisation details={details} setDetails={setDetails} />
        ) : (
          <Basic basicdetails={basicdetails} setBasicDetails={setBasicDetails} />
        );
      case 1:
        return customization.role === 'admin' ? (
          <Basic basicdetails={basicdetails} setBasicDetails={setBasicDetails} />
        ) : (
          <Address />
        );
      case 2:
        return customization.role === 'admin' ? <Address /> : <Account />;
      default:
        return null;
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      if (details.permanentAdd !== '' && details.selectTime !== '') {
        setActiveStep(activeStep + 1);
      } else alert('fill your form');
    } else if (activeStep === 1) {
      if (basicdetails.fname !== '' && basicdetails.lname !== '') {
        setActiveStep(activeStep + 1);
      } else alert('fill your form');
    } else if (activeStep === 2) {
      // eslint-disable-next-line no-unused-expressions
      !isLastStep ? setActiveStep(activeStep + 1) : navigate(getDashboardPattern());
    }
  };
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
                <Box>
                  {getStepContent(activeStep)}
                  <Box mt={3} width="100%" display="flex" justifyContent="space-between">
                    {activeStep === 0 ? (
                      <Box />
                    ) : (
                      <Button variant="gradient" color="light" onClick={handleBack}>
                        Back
                      </Button>
                    )}
                    <Button variant="gradient" color="dark" onClick={handleNext}>
                      {isLastStep ? 'Continue' : 'Next'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfileSetup;
