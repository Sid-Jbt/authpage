import React, { useEffect, useState } from 'react';
import breakpoints from 'Theme/base/breakpoints';
import { Card, Grid } from '@mui/material';
import Typography from 'Elements/Typography';
import Header from './components/Header';

const EmployeeDetails = () => {
  const [tabsOrientation, setTabsOrientation] = useState('vertical');
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
    <Grid container>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} sx={{ ml: 'auto' }}>
          <Card height="8rem" width="20rem">
            <Typography>Card List</Typography>
          </Card>
        </Grid>
        <Grid item>
          <Header
            tabsOrientation={tabsOrientation}
            tabIndex={tabIndex}
            handleSetTabIndex={(event, value) => handleSetTabIndex(event, value)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmployeeDetails;
