import React, { useState } from 'react';
import Typography from 'Elements/Typography';
import profileImage from 'Assets/Images/bruce-mars.jpg';
import { Card, Grid, Switch } from '@mui/material';
import Avatar from 'Elements/Avatar';

const Header = () => {
  const [invisible, setInvisible] = useState(false);

  const handleInvisibleSwitch = () => setInvisible(!invisible);

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
          <Typography
            variant="button"
            fontWeight="regular"
            onClick={handleInvisibleSwitch}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Switch to invisible &nbsp;&nbsp;
          </Typography>
          <Switch checked={invisible} onChange={handleInvisibleSwitch} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Header;
