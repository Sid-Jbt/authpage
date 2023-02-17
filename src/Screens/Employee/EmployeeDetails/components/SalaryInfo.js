import React from 'react';
import { Card, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';

const SalaryInfo = () => (
  <Card id="salary-info">
    <Box p={3} pb={0}>
      <Typography variant="h5">Salary Info</Typography>
      <Grid container spacing={1} p={2} justifyContent="flex-end">
        <Typography variant="h6">Coming Soon...</Typography>
        <Grid item xs={12} md={6} lg={4} textAlign="end">
          <Button variant="gradient" color="dark" size="small" type="submit">
            Update Salary Info
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default SalaryInfo;
