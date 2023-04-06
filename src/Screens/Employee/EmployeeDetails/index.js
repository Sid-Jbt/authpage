import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import Box from 'Elements/Box';
import { useLocation } from 'react-router-dom';
import { useOutletContext } from 'react-router';
import { Gender } from 'Helpers/Global';
import Header from './components/Header';
import BasicInfo from './components/BasicInfo';
import ChangePassword from './components/ChangePassword';
import BankDetails from './components/BankDetails';

let initialValues = {
  firstName: '',
  lastName: '',
  designation: '',
  employeeCode: '',
  email: '',
  gender: Gender[0],
  permanentAddress: '',
  phoneNumber: '',
  dob: '',
  dateOfLeave: '',
  dateOfJoin: '',
  bankName: '',
  branchName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  panNumber: '',
  slug: '',
  id: ''
};

const EmployeeDetails = () => {
  const location = useLocation();
  const { GetEmployeeBySlug } = useOutletContext();
  const setSlug = location.state.slug && location.state.slug;

  useEffect(() => {
    GetEmployeeBySlug(
      {
        slug: setSlug
      },
      (res) => {
        if (res && res.data && res.data.data) {
          const { bankInfo, profile, id, ...rest } = res.data.data;
          initialValues = { ...bankInfo, ...profile, ...rest, id };
        }
      }
    );
    return () => {};
  }, []);

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
                <BasicInfo data={initialValues} />
              </Grid>
              <Grid item xs={12}>
                <BankDetails data={initialValues} />
              </Grid>
              {/* <Grid item xs={12}> */}
              {/*   <SalaryInfo /> */}
              {/* </Grid> */}
              <Grid item xs={12}>
                <ChangePassword id={initialValues.id} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDetails;
