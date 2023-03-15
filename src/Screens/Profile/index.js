import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import { Grid, Card } from '@mui/material';
import { bankFormSchema, profileSchema } from 'Helpers/ValidationSchema';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { useOutletContext } from 'react-router';
import BankInfo from './components/BankInfo';
import PersonalDetails from './components/PersonalDetails';
import Header from './components/Header';
import SalaryDetails from './components/SalaryDetails';

const profileInitialValues = {
  firstName: '',
  lastName: '',
  fatherName: '',
  department: '',
  designation: '',
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

const Profile = () => {
  const { role, user } = useOutletContext();
  const [tabIndex, setTabIndex] = useState(0);
  const handleSetTabIndex = (event, newValue) => setTabIndex(newValue);
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
        handleSetTabIndex={(event, value) => handleSetTabIndex(event, value)}
      />
      <Card sx={{ marginTop: 2 }}>
        <Formik
          enableReinitialize
          initialValues={tabIndex === 0 ? profileInitialValues : bankInitialValues}
          onSubmit={(values) => {
            // eslint-disable-next-line no-console
            console.log(values);
          }}
          validationSchema={tabIndex === 0 ? profileSchema : bankFormSchema}
          validate={tabIndex === 0 && validate}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid
                container
                p={1}
                pl={2}
                pr={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                    My Account
                  </Typography>
                </Grid>
                <Grid item>
                  <Button type="button" color="info" variant="contained">
                    Edit
                  </Button>
                </Grid>
              </Grid>
              <>
                {tabIndex === 0 && <PersonalDetails props={props} />}
                {tabIndex === 1 && <BankInfo props={props} />}
                {tabIndex === 2 && <SalaryDetails />}
              </>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Profile;
