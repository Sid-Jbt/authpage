import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import borderRadius from 'Theme/base/borders';
import profileImage from 'Assets/Images/bruce-mars.jpg';
import { Avatar, Card, Grid, AppBar, Tab, Tabs } from '@mui/material';

const Header = ({ tabIndex, tabsOrientation, handleSetTabIndex }) => (
  <Box position="relative">
    <Card
      sx={{
        py: 2,
        px: 2,
        borderRadius: borderRadius.xl,
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
            <Tabs
              orientation={tabsOrientation}
              value={tabIndex}
              onChange={(event, value) => handleSetTabIndex(event, value)}
            >
              <Tab
                label="Account"
                icon={<i className="ni ni-app" style={{ marginTop: '6px', marginRight: '8px' }} />}
              />
              <Tab
                label="Settings"
                icon={<i className="ni ni-app" style={{ marginTop: '6px', marginRight: '8px' }} />}
              />
            </Tabs>
          </AppBar>
        </Grid>
      </Grid>
    </Card>
  </Box>
);

export default Header;
