import Typography from 'Elements/Typography';
import profileImage from 'Assets/Images/bruce-mars.jpg';
import { Card, Grid, Tab, Tabs } from '@mui/material';
import { AccountBalance, CurrencyRupeeOutlined, PersonOutlined } from '@mui/icons-material';
import Avatar from 'Elements/Avatar';
import { useSelector } from 'react-redux';

const Header = ({ tabIndex, tabsOrientation, handleSetTabIndex }) => {
  const { role } = useSelector((state) => state.route);

  return (
    <Card
      sx={{
        py: 2,
        px: 2,
        boxShadow: ({ boxShadows: { sm } }) => sm
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Avatar src={profileImage} alt="profile-image" variant="rounded" size="xl" />
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
          {role === 'admin' ? (
            <Tabs
              orientation={tabsOrientation}
              value={tabIndex}
              onChange={(event, value) => handleSetTabIndex(event, value)}
            >
              <Tab label="Personal" icon={<PersonOutlined style={{ marginRight: '8px' }} />} />
            </Tabs>
          ) : (
            <Tabs
              orientation={tabsOrientation}
              value={tabIndex}
              onChange={(event, value) => handleSetTabIndex(event, value)}
            >
              <Tab label="Personal" icon={<PersonOutlined style={{ marginRight: '8px' }} />} />
              <Tab label="Account" icon={<AccountBalance style={{ marginRight: '8px' }} />} />
              <Tab label="Salary" icon={<CurrencyRupeeOutlined style={{ marginRight: '8px' }} />} />
            </Tabs>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};
export default Header;
