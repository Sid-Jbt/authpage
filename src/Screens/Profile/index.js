import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const { currentUser } = useSelector((state) => state.route);
  const [profileInfo, setProfileInfo] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);
  const profileInfoRef = useRef();
  const bankInfoRef = useRef();
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

  const onSubmitProfile = async () => {
    console.log('profile', profileInfo, bankInfo);
    if (profileInfo !== null || bankInfo !== null) {
      const updateEmployeeRes = await updateEmployee({ ...profileInfo, ...bankInfo });
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
    }
  };

  useEffect(() => {
    onSubmitProfile();
  }, [profileInfo, bankInfo]);

  const onSubmit = () => {
    profileInfoRef.current.onParentSubmit();
    bankInfoRef.current.onParentSubmit();
  };

  const handleSetTabIndex = (event, newValue) => setTabIndex(newValue);

  return (
    <Box>
      <Box height="8rem" />
      <Header
        tabsOrientation={tabsOrientation}
        tabIndex={tabIndex}
        handleSetTabIndex={(event, value) => handleSetTabIndex(event, value)}
      />
      <Box mt={3}>
        {tabIndex === 0 && (
          <PersonalDetails
            employeeProfileDetails={employeeDetails}
            ref={profileInfoRef}
            onFormSubmit={(data) => {
              setProfileInfo(data);
              onSubmit();
            }}
          />
        )}
        {tabIndex === 1 && (
          <BankInfo
            employeeBankDetails={employeeDetails}
            ref={bankInfoRef}
            onFormSubmit={(data) => {
              setBankInfo(data);
              onSubmit();
            }}
          />
        )}
        {/* {tabIndex === 2 && <SalaryDetails />} */}
      </Box>
    </Box>
  );
};

export default Profile;
