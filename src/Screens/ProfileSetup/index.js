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
import { Check, Error } from '@mui/icons-material';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { getEmployeeById, updateEmployee } from '../../APIs/Employee';
import Basic from './component/Basic';
import Address from './component/Address';
import Account from './component/Account';
import Organisation from './component/Organisation';

const orgInitialValues = {
  workingHours: '',
  organizationAddress: '',
  firstName: '',
  lastName: '',
  permanentAddress: '',
  presentAddress: ''
};

const employeeInitialValues = {
  firstName: '',
  lastName: '',
  permanentAddress: '',
  presentAddress: '',
  bankName: '',
  branchName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  panNumber: ''
};

function getSteps() {
  const customization = useSelector((state) => state.route);

  return customization.role === 'admin'
    ? ['Organisation', 'Basic', 'Address']
    : ['Basic', 'Address', 'Account'];
}

function getStepContent(stepIndex, props, employeeDetails, onChangeGender) {
  const customization = useSelector((state) => state.route);

  switch (stepIndex) {
    case 0:
      return customization.role === 'admin' ? (
        <Organisation props={props} />
      ) : (
        <Basic
          props={props}
          employeeProfileDetails={employeeDetails}
          onChangeGender={() => onChangeGender()}
        />
      );
    case 1:
      return customization.role === 'admin' ? (
        <Basic
          props={props}
          employeeProfileDetails={employeeDetails}
          onChangeGender={() => onChangeGender()}
        />
      ) : (
        <Address props={props} />
      );
    case 2:
      return customization.role === 'admin' ? <Address props={props} /> : <Account props={props} />;
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
  const [gender, setGender] = useState('male');

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
      formData.gender = gender;
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

  const onChangeGender = () => setGender(gender === 'male' ? 'female' : 'male');

  return (
    <>
      {employeeDetails !== null && (
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
                    initialValues={role === 'admin' ? orgInitialValues : employeeInitialValues}
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
                        {getStepContent(activeStep, props, employeeDetails, onChangeGender)}
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
                                : activeStep === 1
                                ? props.values.presentAddress === '' &&
                                  props.values.permanentAddress === ''
                                  ? 'Skip'
                                  : 'Continue'
                                : activeStep === 2
                                ? props.values.bankName === '' &&
                                  props.values.branchName === '' &&
                                  props.values.accountName === '' &&
                                  props.values.accountNumber === '' &&
                                  props.values.ifscCode === '' &&
                                  props.values.panNumber === ''
                                  ? 'Skip'
                                  : 'Continue'
                                : 'Skip'
                              : activeStep === 0
                              ? 'Continue'
                              : activeStep === 1
                              ? 'Continue'
                              : activeStep === 2 &&
                                props.values.presentAddress === '' &&
                                props.values.permanentAddress === ''
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
      )}
    </>
  );
};

export default ProfileSetup;
