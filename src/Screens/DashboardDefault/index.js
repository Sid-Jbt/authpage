import React, { useMemo } from 'react';
import Box from 'Elements/Box';
import { Grid } from '@mui/material';
import CompleteProfileCard from 'Components/CardLayouts/CompleteProfileCard';
import Calendar from 'Components/Calendar';
import ivancik from 'Assets/shapes/pattern-left.png';
import { Watch, WatchLater, WatchRounded } from '@mui/icons-material';
import LeaveCard from '../../Components/CardLayouts/LeaveCard';

const calendarEventsData = [
  {
    title: 'All day conference',
    start: '2021-08-01',
    end: '2021-08-01',
    className: 'success'
  },

  {
    title: 'Meeting with Mary',
    start: '2021-08-03',
    end: '2021-08-03',
    className: 'info'
  },

  {
    title: 'Cyber Week',
    start: '2021-08-04',
    end: '2021-08-04',
    className: 'warning'
  },

  {
    title: 'Winter Hackaton',
    start: '2021-08-05',
    end: '2021-08-05',
    className: 'error'
  },

  {
    title: 'Digital event',
    start: '2021-08-09',
    end: '2021-08-11',
    className: 'warning'
  },

  {
    title: 'Marketing event',
    start: '2021-08-12',
    end: '2021-08-12',
    className: 'primary'
  },

  {
    title: 'Dinner with Family',
    start: '2021-08-21',
    end: '2021-08-21',
    className: 'error'
  },

  {
    title: 'Black Friday',
    start: '2021-08-25',
    end: '2021-08-25',
    className: 'info'
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
                header={{ title: 'calendar', date: 'Monday, 2021' }}
                headerToolbar={false}
                initialView="dayGridMonth"
                initialDate="2021-08-10"
                events={calendarEventsData}
                selectable
                editable
              />
            ),
            [calendarEventsData]
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} lg={5} xl={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CompleteProfileCard
              image={ivancik}
              title="hey user!"
              description={
                <>
                  Your Profile is 33% complete <br />
                  Please check and complete your profile.
                </>
              }
              buttonText="See More"
              action={{ type: 'internal', route: '/dashboard', label: 'See More' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default DashboardDefault;
