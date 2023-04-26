import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import { Grid, Card, CircularProgress } from '@mui/material';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { useOutletContext } from 'react-router';
import { AccountBalance, BungalowRounded, PersonOutlined } from '@mui/icons-material';
import moment from 'moment';
import { withStateDispatch } from 'Helpers/withStateDispatch';
import {
  getAccountsProfilePattern,
  getOrganisationProfilePattern,
  getPersonalProfilePattern
} from 'Routes/routeConfig';
import BankInfo from './components/BankInfo';
import PersonalDetails from './components/PersonalDetails';
import Header from './components/Header';
// import SalaryDetails from './components/SalaryDetails';
import OrganisationDetails from './components/OrganisationDetails';

let oldValues = {};
let newValues = {};

const Profile = ({ GetDashboard }) => {
  const { permission, user, GetProfileSetup, Loading } = useOutletContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const { bankInfo, organisation, profile, ...rest } = user;

  const organisationPermission =
    permission &&
    permission.organisation &&
    permission.organisation.r &&
    permission.organisation.w &&
    permission.organisation.u &&
    permission.organisation.d;

  const accountsPermission =
    permission &&
    permission.accounts &&
    permission.accounts.r &&
    permission.accounts.w &&
    permission.accounts.u &&
    permission.accounts.d;

  const TabsList = [
    {
      key: 'personal',
      title: 'Personal',
      link: getPersonalProfilePattern(),
      permissionStatus: true,
      icon: <PersonOutlined style={{ marginRight: '8px' }} />
    },
    {
      key: 'organisation',
      title: 'Organisation',
      link: getOrganisationProfilePattern(),
      permissionStatus: organisationPermission,
      icon: <BungalowRounded style={{ marginRight: '8px' }} />
    },
    {
      key: 'account',
      title: 'Account',
      link: getAccountsProfilePattern(),
      permissionStatus: accountsPermission,
      icon: <AccountBalance style={{ marginRight: '8px' }} />
    }
  ];

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
    ...(organisationPermission
      ? {
          largeLogo: '',
          smallLogo: '',
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
        role={organisationPermission}
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
                        : organisationPermission && tabIndex === 1
                        ? 'Organisation Details'
                        : accountsPermission && tabIndex === 1
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
                    <PersonalDetails isEdit={isEdit} role={organisationPermission} props={props} />
                  )}
                  {organisationPermission && tabIndex === 1 && (
                    <OrganisationDetails
                      isEdit={isEdit}
                      role={organisationPermission}
                      props={props}
                    />
                  )}
                  {accountsPermission && tabIndex === 1 && (
                    <BankInfo isEdit={isEdit} props={props} />
                  )}
                  {/* {!permissionStatus && tabIndex === 2 && <SalaryDetails props={props} />} */}
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
