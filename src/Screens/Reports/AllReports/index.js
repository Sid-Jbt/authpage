import { Grid } from '@mui/material';
import React from 'react';
import TicketCard from 'Components/CardLayouts/TimeActivityCard';
import { Star } from '@mui/icons-material';
import { getReportTimeActivityPattern, getReportWeeklyLimitPattern } from 'Routes/routeConfig';

const AllReport = () => (
  <>
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} md={6} lg={4}>
        <TicketCard
          title="Time & activity"
          description="See team members time worked, activity levels, and amounts earned per project or to-do"
          icon={{ color: 'warning', component: <Star /> }}
          link={getReportTimeActivityPattern()}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TicketCard
          title="Weekly Limit"
          description="Sea team members time worked. activity levels, and amount earned per days"
          icon={{ color: 'warning', component: <Star /> }}
          link={getReportWeeklyLimitPattern()}
        />
      </Grid>
    </Grid>
  </>
);

export default AllReport;
