import React from 'react';
import { Grid } from '@mui/material';
import Box from 'Elements/Box';
import Header from './components/Header';
import BasicInfo from './components/BasicInfo';
import ChangePassword from './components/ChangePassword';
import DeleteAccount from './components/DeleteAccount';

const EmployeeDetails = () => (
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

export default EmployeeDetails;
