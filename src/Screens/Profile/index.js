import React, { useContext, useEffect, useState } from 'react';
import Box from 'Elements/Box';
import breakpoints from 'Theme/base/breakpoints';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Check, Error } from '@mui/icons-material';
import Header from './components/Header';
import PersonalDetails from './components/PersonalDetails';
import BankInfo from './components/BankInfo';
import { getEmployeeById, updateEmployee } from '../../APIs/API';
import { getDashboardPattern } from '../../Routes/routeConfig';
import { SnackbarContext } from '../../Context/SnackbarProvider';

const Profile = () => {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [tabIndex, setTabIndex] = useState(0);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [isProfileUpdate, setIsProfileUpdate] = useState(null);
  const { currentUser } = useSelector((state) => state.route);
  const navigate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);

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
  }, []);

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

  console.log('isProfileUpdate', isProfileUpdate);
  return (
    <Box>
      <Box height="8rem" />
      <Header
        tabsOrientation={tabsOrientation}
        tabIndex={tabIndex}
        handleSetTabIndex={(event, value) => handleSetTabIndex(event, value)}
        employeeProfileDetails={employeeDetails}
        profileUpdate={(value) => {
          setIsProfileUpdate(value);
          onSubmitProfile(value, true);
        }}
      />
      <Box mt={3}>
        {tabIndex === 0 && (
          <PersonalDetails
            employeeProfileDetails={employeeDetails}
            onFormSubmit={(data) => {
              onSubmitProfile(data);
            }}
          />
        )}
        {tabIndex === 1 && (
          <BankInfo
            employeeBankDetails={employeeDetails}
            onFormSubmit={(data) => {
              onSubmitProfile(data);
            }}
          />
        )}
        {/* {tabIndex === 2 && <SalaryDetails />} */}
      </Box>
    </Box>
  );
};

export default Profile;
