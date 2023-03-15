import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import { Grid, Card } from '@mui/material';
import { bankFormSchema, profileSchema, organisationProfileSchema } from 'Helpers/ValidationSchema';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { useOutletContext } from 'react-router';
import {
  AccountBalance,
  BungalowRounded,
  CurrencyRupeeOutlined,
  PersonOutlined
} from '@mui/icons-material';
import BankInfo from './components/BankInfo';
import PersonalDetails from './components/PersonalDetails';
import Header from './components/Header';
import SalaryDetails from './components/SalaryDetails';
import OrganisationDetails from './components/OrganisationDetails';
import { WorkingHours } from '../../Helpers/Global';

const profileInitialValues = {
  firstName: '',
  lastName: '',
  fatherName: '',
  department: '',
  designation: '',
  gender: 'male',
  permanentAddress: '',
  presentAddress: '',
  alternatePhone: '',
  phoneNumber: ''
};

const bankInitialValues = {
  bankName: '',
  branchName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  panNumber: ''
};

const orgInitialValues = {
  workingHours: WorkingHours[0].value,
  organizationAddress: '',
  largeLogo: '',
  smallLogo: ''
};

const TabsList = [
  {
    key: 'personal',
    title: 'Personal',
    role: ['admin', 'user'],
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
    role: ['user'],
    icon: <AccountBalance style={{ marginRight: '8px' }} />
  },
  {
    key: 'salary',
    title: 'Salary',
    role: ['user'],
    icon: <CurrencyRupeeOutlined style={{ marginRight: '8px' }} />
  }
];

const Profile = () => {
  const { role, user } = useOutletContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const handleSetTabIndex = (event, newValue) => setTabIndex(newValue);

  const handleSetIsEdit = () => setIsEdit(!isEdit);

  const validate = (values) => {
    const errors = {};
    if (values.phoneNumber === values.alternatePhone) {
      errors.alternatePhone = 'Alternate number should not be same as phone number';
    }
    return errors;
  };

  useEffect(() => {}, [user]);

  return (
    <Box>
      <Box height="8rem" />
      <Header
        role={role}
        tabIndex={tabIndex}
        TabsList={TabsList}
        handleSetTabIndex={(event, value) => handleSetTabIndex(event, value)}
      />
      <Card sx={{ marginTop: 2 }}>
        <Formik
          enableReinitialize
          initialValues={
            tabIndex === 0
              ? profileInitialValues
              : tabIndex === 1
              ? orgInitialValues
              : bankInitialValues
          }
          onSubmit={(values) => {
            // eslint-disable-next-line no-console
            console.log(values);
          }}
          validationSchema={
            tabIndex === 0
              ? profileSchema
              : tabIndex === 1
              ? organisationProfileSchema
              : bankFormSchema
          }
          validate={tabIndex === 0 && validate}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
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
                      : tabIndex === 1
                      ? 'Organisation Details'
                      : tabIndex === 2
                      ? 'Bank Details'
                      : 'Salary Details'}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    type="button"
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={() => handleSetIsEdit()}
                  >
                    {!isEdit ? 'Edit' : 'Save'}
                  </Button>
                </Grid>
              </Grid>
              <>
                {tabIndex === 0 && <PersonalDetails isEdit={isEdit} props={props} />}
                {tabIndex === 1 && <OrganisationDetails isEdit={isEdit} props={props} />}
                {tabIndex === 2 && <BankInfo isEdit={isEdit} props={props} />}
                {tabIndex === 3 && <SalaryDetails props={props} />}
              </>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Profile;
