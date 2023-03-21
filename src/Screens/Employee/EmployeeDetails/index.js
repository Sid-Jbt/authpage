import React from 'react';
import { Grid } from '@mui/material';
import Box from 'Elements/Box';
import Header from './components/Header';
import BasicInfo from './components/BasicInfo';
import ChangePassword from './components/ChangePassword';
import DeleteAccount from './components/DeleteAccount';
import BankDetails from './components/BankDetails';
import SalaryInfo from './components/SalaryInfo';
import withStateDispatch from '../../../Helpers/withStateDispatch';

const EmployeeDetails = ({ GetEmployeeBySlug }) => {
  // eslint-disable-next-line no-console
  console.log('GetEmployeeBySlug --> ', GetEmployeeBySlug);

  return (
    <Box mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Header />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Box mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BasicInfo />
              </Grid>
              <Grid item xs={12}>
                <BankDetails />
              </Grid>
              <Grid item xs={12}>
                <SalaryInfo />
              </Grid>
              <Grid item xs={12}>
                <ChangePassword />
              </Grid>
              <Grid item xs={12}>
                <DeleteAccount />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStateDispatch(EmployeeDetails);
