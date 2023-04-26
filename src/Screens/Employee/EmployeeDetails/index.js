import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useOutletContext } from 'react-router';
import { Gender, rolesArray } from 'Helpers/Global';
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
  id: '',
  roleId: ''
};

const EmployeeDetails = () => {
  const location = useLocation();
  const { GetEmployeeBySlug, GetRoleList } = useOutletContext();
  const setSlug = location.state.slug && location.state.slug;
  const [allRoles, setAllRoles] = useState([]);

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
    GetRoleList(
      {
        limit: 0
      },
      (res) => {
        if (res && res.data && res.data.data) {
          setAllRoles(rolesArray(res.data.data.rows));
        }
      }
    );
    return () => {};
  }, []);

  const sidenav = [
    {
      component: allRoles.length > 0 && <BasicInfo data={initialValues} allRoles={allRoles} />,
      ref: useRef(),
      key: 'basic-info'
    },
    { component: <BankDetails data={initialValues} />, ref: useRef(), key: 'account-info' },
    { component: <ChangePassword data={initialValues} />, ref: useRef(), key: 'change-password' }
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
