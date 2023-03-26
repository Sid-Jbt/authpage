import React, { useEffect, useState } from 'react';
import Box from 'Elements/Box';
import breakpoints from 'Theme/base/breakpoints';
import Header from './components/Header';
import ChangePasswordSetting from './components/ChangePasswordSetting';
import NotificationSetting from './components/NotificationSetting';
import withStateDispatch from '../../Helpers/withStateDispatch';

const Setting = ({ GetChangePassword }) => {
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
      <Header
        tabsOrientation={tabsOrientation}
        tabIndex={tabIndex}
        handleSetTabIndex={(event, value) => handleSetTabIndex(event, value)}
      />
      <Box mt={3}>
        {tabIndex === 0 && <ChangePasswordSetting GetChangePassword={GetChangePassword} />}
        {tabIndex === 1 && <NotificationSetting />}
      </Box>
    </Box>
  );
};

export default withStateDispatch(Setting);
