import React, { useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
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

  const sidenav = [
    { component: <BasicInfo data={initialValues} />, ref: useRef(), key: 'basic-info' },
    { component: <BankDetails />, ref: useRef(), key: 'account-info' },
    { component: <ChangePassword />, ref: useRef(), key: 'change-password' }
  ];

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        lg={3}
        sx={({ breakpoints }) => ({
          [breakpoints.down('lg')]: { display: 'none' }
        })}
      >
        <Header sidenav={sidenav} />
      </Grid>
      <Grid container spacing={3} item xs={12} lg={9}>
        {sidenav &&
          sidenav.map((value, key) => (
            <Grid item xs={12} ref={value.ref} key={key}>
              {value.component}
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default EmployeeDetails;
