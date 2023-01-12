import { useState, useEffect } from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import breakpoints from 'Theme/base/breakpoints';
import profileImage from 'Assets/Images/bruce-mars.jpg';
import { Avatar, Card, Grid, AppBar, Tab, Tabs } from '@mui/material';

const Header = () => {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [tabValue, setTabValue] = useState(0);

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

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <Box position="relative">
      <Box height="150px" />
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={profileImage}
              alt="profile-image"
              variant="rounded"
              sx={{ width: 70, height: 70 }}
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                Suresh Borad
              </Typography>
              <Typography variant="button" color="text" fontWeight="medium">
                CEO / Co-Founder
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: 'auto' }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="App"
                  icon={
                    <i className="ni ni-app" style={{ marginTop: '6px', marginRight: '8px' }} />
                  }
                />
                <Tab
                  label="Settings"
                  icon={
                    <i
                      className="ni ni-settings-gear-65"
                      style={{ marginTop: '6px', marginRight: '8px' }}
                    />
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Header;
