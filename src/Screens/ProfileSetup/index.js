import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Card, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { WorkingHours } from 'Helpers/Global';
import { useNavigate, useOutletContext } from 'react-router';
import { getDashboardPattern } from 'Routes/routeConfig';
import moment from 'moment/moment';
import Basic from './component/Basic';
import Address from './component/Address';
import Account from './component/Account';
import Organisation from './component/Organisation';

let newValues = {};
function getSteps(permission) {
  return permission.r && permission.w && permission.d
    ? ['Organisation', 'Basic', 'Address']
    : ['Basic', 'Address', 'Account'];
}
// TODO: Need to work on permission for the profileSetup page

function getStepContent(permission, stepIndex, props) {
  const permissionStatus = permission.r && permission.w && permission.d;

  switch (stepIndex) {
    case 0:
      return permissionStatus ? (
        <Organisation props={props} />
      ) : (
        <Basic role={permissionStatus} props={props} />
      );
    case 1:
      return permissionStatus ? (
        <Basic role={permissionStatus} props={props} />
      ) : (
        <Address props={props} />
      );
    case 2:
      return permissionStatus ? <Address props={props} /> : <Account props={props} />;
    default:
      return null;
  }
}

const ProfileSetup = () => {
  const { GetProfileSetup, DashboardData, Loading, permission } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps(permission.profileSetup);
  const { bankInfo, organisation, profile, ...rest } = DashboardData.user;

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    dob: moment().format('YYYY-MM-DD'),
    alternatePhone: '',
    phoneNumber: '',
    permanentAddress: '',
    presentAddress: '',
    gender: 'male',
    ...(permission === 'admin'
      ? {
          largeLogo: '',
          smallLogo: '',
          workingHours: WorkingHours[0].value,
          location: ''
        }
      : {
          fatherName: '',
          employeeCode: '',
          designation: '',
          bankName: '',
          branchName: '',
          accountName: '',
          accountNumber: '',
          ifscCode: '',
          panNumber: ''
        })
  };

  const handleNext = (values, actions) => {
    if (values.hasOwnProperty('punchIn') && values.hasOwnProperty('punchOut')) {
      delete values.punchIn;
      delete values.punchOut;
    }

    if (JSON.stringify({ ...bankInfo, ...organisation, ...profile }) !== JSON.stringify(values)) {
      Object.keys({ ...bankInfo, ...organisation, ...profile }).map((key) => {
        if (values[key] !== { ...bankInfo, ...organisation, ...profile }[key]) {
          newValues = { ...newValues, [key]: values[key] };
        }
      });
      GetProfileSetup(values, (res) => {
        const data = res.data;
        if (data.status) {
          if (activeStep === 2) {
            dispatch({ type: 'LOGIN_COMPLETED' });
            navigate(getDashboardPattern());
          }
          setActiveStep(activeStep + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
        }
      });
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
      if (activeStep === 2) {
        dispatch({ type: 'LOGIN_COMPLETED' });
        navigate(getDashboardPattern());
      }
    }
  };

  useEffect(() => {
    if (!DashboardData.isProfileSetup) {
      navigate(getDashboardPattern());
    }
  }, [DashboardData]);

  const onClickSkip = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      dispatch({ type: 'LOGIN_COMPLETED' });
      navigate(getDashboardPattern());
    }
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
          <Card sx={{ overflow: 'visible' }}>
            <Box p={2}>
              <Formik
                initialValues={
                  { ...bankInfo, ...organisation, ...profile, ...rest } || initialValues
                }
                onSubmit={handleNext}
              >
                {(props) => {
                  const { handleSubmit, isSubmitting } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      {permission && getStepContent(permission.profileSetup, activeStep, props)}
                      <Box mt={3} width="100%" display="flex" justifyContent="space-between">
                        {activeStep === 0 ? (
                          <Box />
                        ) : (
                          <Button
                            type="button"
                            variant="gradient"
                            color="light"
                            onClick={onClickSkip}
                          >
                            Skip
                          </Button>
                        )}
                        <Button
                          variant="gradient"
                          color="dark"
                          type="submit"
                          disabled={isSubmitting || Loading}
                        >
                          {Loading ? <CircularProgress size={20} color="inherit" /> : 'Continue'}
                        </Button>
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

export default ProfileSetup;
