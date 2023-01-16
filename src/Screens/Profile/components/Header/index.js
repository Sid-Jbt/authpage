import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import profileImage from 'Assets/Images/bruce-mars.jpg';
import { Avatar, Grid, Tab, Tabs } from '@mui/material';
import { AccountBoxOutlined, PersonOutlined } from '@mui/icons-material';

const Header = ({ tabIndex, tabsOrientation, handleSetTabIndex }) => (
  <Box
    sx={{
      py: 2,
      px: 2,
      background: ({ palette: { white } }) => white.main,
      borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
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
  </Box>
);

export default Header;