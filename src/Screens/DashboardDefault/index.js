import React, { useEffect, useMemo, useState } from 'react';
import Box from 'Elements/Box';
import { Grid } from '@mui/material';
import Calendar from 'Components/Calendar';
import { Watch, WatchLater, WatchRounded } from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/LeaveCard';

const DashboardDefault = () => {
  const [calendarEventsData, setCalendarEventsData] = useState([]);

  const getNoticeBoardEvent = async () => {
    const items = await JSON.parse(localStorage.getItem('noticeBoardEvent'));
    setCalendarEventsData(items);
  };

  useEffect(() => {
    getNoticeBoardEvent();
  }, []);

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        {/* <Grid container order={{ xs: 1, lg: 0 }} spacing={3} item xs={12} lg={7} xl={8}> */}
        <Grid container order={{ xs: 1, lg: 0 }} spacing={3} item xs={12} lg={12} xl={12}>
          <Grid item xs={12} md={6} lg={3}>
            <LeaveCard
              title="Today"
              count="07:15:34"
              icon={{ color: 'success', component: <Watch /> }}
              isPercentage={false}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <LeaveCard
              title="This week"
              count="45 hours "
              icon={{ color: 'secondary', component: <WatchRounded /> }}
              isPercentage={false}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
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
};

export default DashboardDefault;
