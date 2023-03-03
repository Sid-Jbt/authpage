import React, { useContext, useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import breakpoints from 'Theme/base/breakpoints';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Check, Error } from '@mui/icons-material';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { getDashboardPattern } from 'Routes/routeConfig';
import { Grid, Card } from '@mui/material';
import { bankFormSchema, profileSchema } from 'Helpers/ValidationSchema';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { getEmployeeById, updateEmployee } from 'APIs/Employee';
import BankInfo from './components/BankInfo';
import PersonalDetails from './components/PersonalDetails';
import Header from './components/Header';

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
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [tabIndex, setTabIndex] = useState(0);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [gender, setGender] = useState('male');
  const { currentUser } = useSelector((state) => state.route);
  const navigate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);
  const formikRef = useRef();

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal');
    }
    window.addEventListener('resize', handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener('resize', handleTabsOrientation);
  }, [tabsOrientation]);

  const getEmployeeDetails = async () => {
    const employeeDetailsRes = await getEmployeeById(currentUser.id);
    const { status, data } = employeeDetailsRes;
    if (status) {
      setEmployeeDetails(data);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, [tabIndex]);

  const onSubmitProfile = async (data = null, isProfilePic = false) => {
    const res = {};
    if (isProfilePic) {
      Object.keys(employeeDetails).forEach((property) => {
        if (property === 'profile' || property === 'bankInfo') {
          Object.keys(employeeDetails[property]).forEach((keyy) => {
            res[keyy] = employeeDetails[property][keyy];
          });
        }
      });
      res.profilePic = data;
    } else {
      Object.keys(employeeDetails).forEach((property) => {
        if (property === 'profile' || property === 'bankInfo') {
          Object.keys(employeeDetails[property]).forEach((keyy) => {
            res[keyy] = data[keyy] ? data[keyy] : employeeDetails[property][keyy];
          });
        }
      });
      delete res.profilePic;
    }
    delete res.dateOfJoin;
    delete res.dateOfLeave;
    delete res.id;
    delete res.employeeCode;
    res.gender = gender;
    const updateEmployeeRes = await updateEmployee(res);
    const { status, message } = updateEmployeeRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      navigate(getDashboardPattern());
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
    }
  };

  const handleSetTabIndex = (event, newValue) => setTabIndex(newValue);

  const onChangeGender = () => setGender(gender === 'male' ? 'female' : 'male');

  const validate = (values) => {
    const errors = {};
    if (values.phoneNumber === values.alternatePhone) {
      errors.alternatePhone = 'Alternate number should not be same as phone number';
    }
    return errors;
  };

  return (
    employeeDetails !== null && (
      <Box>
        <Box height="8rem" />
        <Header
          tabsOrientation={tabsOrientation}
          tabIndex={tabIndex}
          handleSetTabIndex={(event, value) => handleSetTabIndex(event, value)}
          employeeProfileDetails={employeeDetails}
          profileUpdate={(value) => {
            onSubmitProfile(value, true);
          }}
        />
        <Card sx={{ marginTop: 10 }}>
          <Formik
            enableReinitialize
            initialValues={tabIndex === 0 ? profileInitialValues : bankInitialValues}
            onSubmit={(values) => {
              onSubmitProfile(values, false);
            }}
            validationSchema={tabIndex === 0 ? profileSchema : bankFormSchema}
            validate={tabIndex === 0 && validate}
            innerRef={formikRef}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container p={2} alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                      My Account
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button type="submit" color="info" variant="contained">
                      Save
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  {tabIndex === 0 && (
                    <PersonalDetails
                      props={props}
                      employeeProfileDetails={employeeDetails}
                      onChangeGender={() => onChangeGender()}
                    />
                  )}
                  {tabIndex === 1 && (
                    <BankInfo employeeBankDetails={employeeDetails} props={props} />
                  )}
                  {/* {tabIndex === 2 && <SalaryDetails />} */}
                </Box>
              </form>
            )}
          </Formik>
        </Card>
      </Box>
    )
  );
};

export default Profile;
