import React, { useEffect, useState } from 'react';
import Box from 'Elements/Box';
import breakpoints from 'Theme/base/breakpoints';
import Header from './components/Header';
import AccountDetails from './components/AccountDetails';
import Settings from './components/Settings';

const Profile = () => {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [tabIndex, setTabIndex] = useState(0);

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

  const handleSetTabIndex = (event, newValue) => setTabIndex(newValue);

  return (
    <Box>
      <Box height="150px" />
      <Header
        tabsOrientation={tabsOrientation}
        tabIndex={tabIndex}
        handleSetTabIndex={(event, value) => handleSetTabIndex(event, value)}
      />
      <Box mt={5} mb={3}>
        {tabIndex === 0 && <AccountDetails />}
        {tabIndex === 1 && <Settings />}
      </Box>
    </Box>
  );
};

export default Profile;
