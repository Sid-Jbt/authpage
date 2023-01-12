import React from 'react';
import { Card, Grid } from '@mui/material';
import Typography from 'Elements/Typography';

const Settings = () => (
  <Card>
    <Grid container p={2}>
      <Grid item xs={10} md={11} lg={11}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          Settings
        </Typography>
      </Grid>
    </Grid>
  </Card>
);

export default Settings;
