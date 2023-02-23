import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Card, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { getDashboardPattern } from 'Routes/routeConfig';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { basicSchema, organisationSchema } from 'Helpers/ValidationSchema';
import { getEmployeeById, updateEmployee } from 'APIs/API';
import { Check, Error } from '@mui/icons-material';
import { SnackbarContext } from 'Context/SnackbarProvider';
import Basic from './component/Basic';
import Address from './component/Address';
import Account from './component/Account';
import Organisation from './component/Organisation';

const initialValues = {
  workingHours: '',
  permanentAddress: '',
  firstName: '',
  lastName: '',
  bankName: '',
  branchName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  panNumber: '',
  address: '',
  presentAddress: ''
};

function getSteps() {
  const customization = useSelector((state) => state.route);

  return customization.role === 'admin'
    ? ['Organisation', 'Basic', 'Address']
    : ['Basic', 'Address', 'Account'];
}

function getStepContent(stepIndex, props, employeeDetails) {
  const customization = useSelector((state) => state.route);

  switch (stepIndex) {
    case 0:
      return customization.role === 'admin' ? (
        <Organisation props={props} />
      ) : (
        <Basic props={props} employeeProfileDetails={employeeDetails} />
      );
    case 1:
      return customization.role === 'admin' ? (
        <Basic props={props} employeeProfileDetails={employeeDetails} />
      ) : (
        <Address props={props} employeeProfileDetails={employeeDetails} />
      );
    case 2:
      return customization.role === 'admin' ? (
        <Address props={props} employeeProfileDetails={employeeDetails} />
      ) : (
        <Account props={props} employeeBankDetails={employeeDetails} />
      );
    default:
      return null;
  }
}

const ProfileSetup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const navigate = useNavigate();
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;
  const { role } = useSelector((state) => state.route);
  const { currentUser } = useSelector((state) => state.route);
  const { setSnack } = useContext(SnackbarContext);

  const getEmployeeDetails = async () => {
    const employeeDetailsRes = await getEmployeeById(currentUser.id);
    const { status, data } = employeeDetailsRes;
    if (status) {
      setEmployeeDetails(data);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  const handleNext = async (formData) => {
    if (!isLastStep) {
      setActiveStep(activeStep + 1);
    } else if (role !== 'admin') {
      delete formData.workingHours;
      delete formData.address;
      delete formData.authID;
      delete formData.createdAt;
      delete formData.dateOfJoin;
      delete formData.dateOfLeave;
      delete formData.id;
      delete formData.updatedAt;
      console.log('formData', formData);
      const updateEmployeeRes = await updateEmployee(formData);
      const { status, message } = updateEmployeeRes;
      if (status) {
        setSnack({
          title: 'Success',
          message,
          time: false,
          icon: <Check color="white" />,
          color: 'success',
          open: true
        });
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
    } else {
      navigate(getDashboardPattern());
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
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    handleNext(values);
                  }}
                  validationSchema={
                    role === 'admin'
                      ? activeStep === 0
                        ? organisationSchema
                        : activeStep === 1
                        ? basicSchema
                        : ''
                      : activeStep === 0
                      ? basicSchema
                      : ''
                  }
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      {getStepContent(activeStep, props, employeeDetails)}
                      <Box mt={3} width="100%" display="flex" justifyContent="space-between">
                        {activeStep === 0 ? (
                          <Box />
                        ) : (
                          <Button variant="gradient" color="light" onClick={() => handleBack()}>
                            Back
                          </Button>
                        )}
                        <Button variant="gradient" color="dark" type="submit">
                          {role !== 'admin'
                            ? activeStep === 0
                              ? 'Continue'
                              : (activeStep === 1 && props.values.permanentAddress !== '') ||
                                props.values.presentAddress !== ''
                              ? 'Continue'
                              : activeStep === 2 &&
                                props.values.bankName !== '' &&
                                props.values.branchName !== '' &&
                                props.values.accountName !== '' &&
                                props.values.accountNumber !== '' &&
                                props.values.ifscCode !== '' &&
                                props.values.panNumber !== ''
                              ? 'Continue'
                              : 'SKIP'
                            : activeStep === 0
                            ? 'Continue'
                            : activeStep === 1
                            ? 'Continue'
                            : activeStep === 2 &&
                              props.values.permanentAddress !== '' &&
                              props.values.presentAddress !== ''
                            ? 'Continue'
                            : 'Skip'}
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
