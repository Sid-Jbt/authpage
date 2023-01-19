import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import profileImage from 'Assets/Images/bruce-mars.jpg';
import { Avatar, Card, Grid, Tab, Tabs } from '@mui/material';
import { AccountBoxOutlined, PersonOutlined } from '@mui/icons-material';

const Header = ({ tabIndex, tabsOrientation, handleSetTabIndex }) => (
  <Card
    sx={{
      py: 2,
      px: 2,
      boxShadow: ({ boxShadows: { sm } }) => sm
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
        <Typography variant="h4" fontWeight="medium">
          Suresh Borad
        </Typography>
        <Typography variant="subtitle2" color="text" fontWeight="light">
          CEO / Co-Founder
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ ml: 'auto' }}>
        <Tabs
          orientation={tabsOrientation}
          value={tabIndex}
          onChange={(event, value) => handleSetTabIndex(event, value)}
        >
          <Tab label="Personal" icon={<PersonOutlined style={{ marginRight: '8px' }} />} />
          <Tab label="Bank Account" icon={<AccountBoxOutlined style={{ marginRight: '8px' }} />} />
        </Tabs>
      </Grid>
    </Grid>
  </Card>
);

export default Header;
