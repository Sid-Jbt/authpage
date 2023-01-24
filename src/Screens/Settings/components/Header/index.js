import { Grid, Tab, Tabs } from '@mui/material';
import { AccountBoxOutlined, NotificationsActiveOutlined, Password } from '@mui/icons-material';

const Header = ({ tabIndex, tabsOrientation, handleSetTabIndex }) => (
  <Grid container spacing={3} alignItems="center">
    <Grid item xs={12} md={6} lg={4}>
      <Tabs
        orientation={tabsOrientation}
        value={tabIndex}
        onChange={(event, value) => handleSetTabIndex(event, value)}
      >
        <Tab label="Password" icon={<Password style={{ marginRight: '8px' }} />} />
        <Tab
          label="Notification"
          icon={<NotificationsActiveOutlined style={{ marginRight: '8px' }} />}
        />
        <Tab label="Account" icon={<AccountBoxOutlined style={{ marginRight: '8px' }} />} />
      </Tabs>
    </Grid>
  </Grid>
);

export default Header;
