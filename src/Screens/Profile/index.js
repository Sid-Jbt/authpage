import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import { Grid, Card } from '@mui/material';
import { organisationProfileSchema, userProfileSchema } from 'Helpers/ValidationSchema';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { useOutletContext } from 'react-router';
import {
  AccountBalance,
  BungalowRounded,
  CurrencyRupeeOutlined,
  PersonOutlined
} from '@mui/icons-material';
import moment from 'moment';
import BankInfo from './components/BankInfo';
import PersonalDetails from './components/PersonalDetails';
import Header from './components/Header';
import SalaryDetails from './components/SalaryDetails';
import OrganisationDetails from './components/OrganisationDetails';
import { WorkingHours } from '../../Helpers/Global';
import { withStateDispatch } from '../../Helpers/withStateDispatch';

const profileInitialValues = {
  firstName: '',
  lastName: '',
  fatherName: '',
  department: '',
  designation: '',
  employeeCode: '',
  email: '',
  gender: 'male',
  permanentAddress: '',
  presentAddress: '',
  alternatePhone: '',
  phoneNumber: '',
  dob: moment().format('YYYY-MM-DD'),
  dateOfLeave: moment().format('YYYY-MM-DD'),
  dateOfJoin: moment().format('YYYY-MM-DD'),
  bankName: '',
  branchName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  panNumber: ''
};

const adminInitialValues = {
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
  workingHours: WorkingHours[0],
  organizationAddress: '',
  organisationName: '',
  largeLogo: '',
  smallLogo: ''
};

const TabsList = [
  {
    key: 'personal',
    title: 'Personal',
    role: ['admin', 'employee'],
    icon: <PersonOutlined style={{ marginRight: '8px' }} />
  },
  {
    key: 'organisation',
    title: 'Organisation',
    role: ['admin'],
    icon: <BungalowRounded style={{ marginRight: '8px' }} />
  },
  {
    key: 'account',
    title: 'Account',
    role: ['employee'],
    icon: <AccountBalance style={{ marginRight: '8px' }} />
  },
  {
    key: 'salary',
    title: 'Salary',
    role: ['employee'],
    icon: <CurrencyRupeeOutlined style={{ marginRight: '8px' }} />
  }
];

const Profile = ({ GetDashboard }) => {
  const { role, user, GetProfileSetup } = useOutletContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (role !== 'admin') {
      Object.keys(profileInitialValues).map((key) => {
        profileInitialValues[key] = user.profile[key] || user.bankInfo[key];
        profileInitialValues.email = user.email;
      });
    } else {
      Object.keys(adminInitialValues).map((key) => {
        adminInitialValues[key] = user.profile[key] || user.organisation[key];
        adminInitialValues.email = user.email;
        adminInitialValues.organizationAddress = user.organisation.location;
      });
    }
  }, [user]);

  const validate = (values) => {
    const errors = {};
    if (values.phoneNumber === values.alternatePhone) {
      errors.alternatePhone = 'Alternate number should not be same as phone number';
    }
    return errors;
  };

  const onSubmit = (values, actions) => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      GetProfileSetup(values, (res) => {
        const { status } = res.data;
        if (status) {
          setIsEdit(false);
          GetDashboard();
        } else {
          setIsEdit(true);
        }
      });
    }
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Box height="8rem" />
      <Header
        role={role}
        tabIndex={tabIndex}
        TabsList={TabsList}
        handleSetTabIndex={(event, value) => setTabIndex(value)}
      />
      <Card sx={{ marginTop: 2 }}>
        <Formik
          enableReinitialize
          initialValues={role === 'admin' ? adminInitialValues : profileInitialValues}
          onSubmit={onSubmit}
          validationSchema={
            isEdit &&
            (role === 'admin' ? organisationProfileSchema[tabIndex] : userProfileSchema[tabIndex])
          }
          validate={tabIndex === 0 && validate}
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
                    <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                      {tabIndex === 0
                        ? 'Basic Details'
                        : role === 'admin' && tabIndex === 1
                        ? 'Organisation Details'
                        : role !== 'admin' && tabIndex === 1
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
                        disabled={isSubmitting}
                      >
                        {!isEdit ? 'Edit' : 'Save'}
                      </Button>
                    </Grid>
                  )}
                </Grid>
                <>
                  {tabIndex === 0 && <PersonalDetails isEdit={isEdit} role={role} props={props} />}
                  {role === 'admin' && tabIndex === 1 && (
                    <OrganisationDetails isEdit={isEdit} role={role} props={props} />
                  )}
                  {role !== 'admin' && tabIndex === 1 && (
                    <BankInfo isEdit={isEdit} role={role} props={props} />
                  )}
                  {tabIndex === 2 && <SalaryDetails role={role} props={props} />}
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
