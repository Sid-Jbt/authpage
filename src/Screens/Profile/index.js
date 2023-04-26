import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import { Grid, Card, CircularProgress } from '@mui/material';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { useOutletContext } from 'react-router';
import { AccountBalance, BungalowRounded, PersonOutlined } from '@mui/icons-material';
import moment from 'moment';
import BankInfo from './components/BankInfo';
import PersonalDetails from './components/PersonalDetails';
import Header from './components/Header';
import SalaryDetails from './components/SalaryDetails';
import OrganisationDetails from './components/OrganisationDetails';
// import { WorkingHours } from '../../Helpers/Global';
import { withStateDispatch } from '../../Helpers/withStateDispatch';

const TabsList = [
  {
    key: 'personal',
    title: 'Personal',
    icon: <PersonOutlined style={{ marginRight: '8px' }} />
  },
  {
    key: 'organisation',
    title: 'Organisation',
    icon: <BungalowRounded style={{ marginRight: '8px' }} />
  },
  {
    key: 'account',
    title: 'Account',
    icon: <AccountBalance style={{ marginRight: '8px' }} />
  }
];
let oldValues = {};
let newValues = {};

const Profile = ({ GetDashboard }) => {
  const { permission, user, GetProfileSetup, Loading } = useOutletContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const { bankInfo, organisation, profile, ...rest } = user;

  // TODO: Need to work on permission for the profile page
  const permissionStatus = permission.profile.r && permission.profile.w && permission.profile.d;

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    dob: moment().format('YYYY-MM-DD'),
    dateOfLeave: moment().format('YYYY-MM-DD'),
    dateOfJoin: moment().format('YYYY-MM-DD'),
    alternatePhone: '',
    phoneNumber: '',
    permanentAddress: '',
    presentAddress: '',
    gender: 'male',
    ...(permissionStatus
      ? {
          largeLogo: '',
          smallLogo: '',
          // workingHours: WorkingHours[0].value,
          punchIn: '',
          punchOut: '',
          organisationName: '',
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

  useEffect(() => {
    GetDashboard();
  }, []);

  const onSubmit = (values, actions) => {
    if (values.workingHours) {
      values.workingHours = values.workingHours.value;
    }
    if (!isEdit) {
      setIsEdit(true);
      oldValues = values;
    } else if (JSON.stringify(oldValues) !== JSON.stringify(values)) {
      Object.keys(oldValues).map((key) => {
        if (values[key] !== oldValues[key]) {
          newValues = { ...newValues, [key]: values[key] };
        }
      });
      GetProfileSetup(newValues, (res) => {
        const { status } = res.data;
        if (status) {
          setIsEdit(false);
          GetDashboard();
        } else {
          setIsEdit(true);
        }
      });
    } else {
      setIsEdit(false);
    }
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Box height="8rem" />
      <Header
        role={permissionStatus}
        user={user}
        Loading={Loading}
        GetProfileSetup={GetProfileSetup}
        GetDashboard={GetDashboard}
        tabIndex={tabIndex}
        TabsList={TabsList}
        handleSetTabIndex={(event, value) => setTabIndex(value)}
      />
      <Card sx={{ marginTop: 2, overflow: 'visible' }}>
        <Formik
          enableReinitialize
          initialValues={{ ...bankInfo, ...organisation, ...profile, ...rest } || initialValues}
          onSubmit={onSubmit}
        >
          {(props) => {
            const { isSubmitting, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  p={1.5}
                  pl={2}
                  pr={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
                      {tabIndex === 0
                        ? 'Basic Details'
                        : permissionStatus && tabIndex === 1
                        ? 'Organisation Details'
                        : !permissionStatus && tabIndex === 1
                        ? 'Bank Details'
                        : 'Salary Details'}
                    </Typography>
                  </Grid>
                  {tabIndex !== 2 && (
                    <Grid item>
                      <Button
                        type="submit"
                        color="info"
                        variant="contained"
                        size="small"
                        disabled={isSubmitting && Loading}
                      >
                        {Loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : !isEdit ? (
                          'Edit'
                        ) : (
                          'Save'
                        )}
                      </Button>
                    </Grid>
                  )}
                </Grid>
                <>
                  {tabIndex === 0 && (
                    <PersonalDetails isEdit={isEdit} role={permissionStatus} props={props} />
                  )}
                  {permissionStatus && tabIndex === 1 && (
                    <OrganisationDetails isEdit={isEdit} role={permissionStatus} props={props} />
                  )}
                  {!permissionStatus && tabIndex === 1 && (
                    <BankInfo isEdit={isEdit} props={props} />
                  )}
                  {tabIndex === 2 && <SalaryDetails props={props} />}
                </>
              </form>
            );
          }}
        </Formik>
      </Card>
    </Box>
  );
};

export default withStateDispatch(Profile);
