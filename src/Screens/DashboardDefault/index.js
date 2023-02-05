import React, { useMemo } from 'react';
import Box from 'Elements/Box';
import { Grid } from '@mui/material';
import Calendar from 'Components/Calendar';
import { Watch, WatchLater, WatchRounded } from '@mui/icons-material';
import LeaveCard from '../../Components/CardLayouts/LeaveCard';

const calendarEventsData = [
  {
    title: 'All day conference',
    start: '2023-02-01',
    end: '2023-02-01',
    className: 'success'
  },

  {
    title: 'Meeting with Mary',
    start: '2023-02-05',
    end: '2023-02-05',
    className: 'info'
  },

  {
    title: 'Cyber Day',
    start: '2023-02-10',
    end: '2023-02-10',
    className: 'warning'
  },

  {
    title: 'Winter Hackaton',
    start: '2023-02-15',
    end: '2023-02-15',
    className: 'error'
  },

  {
    title: 'Digital event',
    start: '2023-02-18',
    end: '2023-02-18',
    className: 'warning'
  },

  {
    title: 'Marketing event',
    start: '2023-02-21',
    end: '2023-02-21',
    className: 'primary'
  },

  {
    title: 'Dinner with Family',
    start: '2023-02-28',
    end: '2023-02-28',
    className: 'error'
  }
];

const DashboardDefault = () => (
  <Box mb={3}>
    <Grid container spacing={3}>
      <Grid container order={{ xs: 1, lg: 0 }} spacing={3} item xs={12} lg={7} xl={8}>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="Today"
            count="07:15:34"
            icon={{ color: 'success', component: <Watch /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="This week"
            count="45 hours "
            icon={{ color: 'secondary', component: <WatchRounded /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="This month"
            count="160 hours"
            icon={{ color: 'info', component: <WatchLater /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12}>
          {useMemo(
            () => (
              <Calendar
                header={{ title: 'Daily Updates' }}
                headerToolbar={{
                  left: 'prev,next today',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                  center: 'title'
                }}
                initialView="dayGridMonth"
                events={calendarEventsData}
                selectable
                editable
              />
            ),
            [calendarEventsData]
          )}
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default DashboardDefault;
