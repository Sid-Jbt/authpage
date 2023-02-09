import React, { useEffect, useMemo, useState } from 'react';
import Box from 'Elements/Box';
import { Grid } from '@mui/material';
import Calendar from 'Components/Calendar';
import { PeopleRounded, Watch, WatchLater, WatchRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Badge from 'Elements/Badge';
import { getEmployeeListPattern } from '../../Routes/routeConfig';
import LeaveCard from '../../Components/CardLayouts/LeaveCard';

const DashboardDefault = () => {
  const { role } = useSelector((state) => state.route);
  const navigate = useNavigate();
  const [calendarEventsData, setCalendarEventsData] = useState([]);

  useEffect(() => {
    (async () => {
      const items = await JSON.parse(localStorage.getItem('noticeBoardEvent'));
      const newRows = items.map((item) => {
        const o = { ...item };
        o.eventType = (
          <Badge
            variant="gradient"
            badgeContent={item.eventName}
            color={item.eventName}
            size="xs"
            container
            customWidth={100}
          />
        );
        return o;
      });
      setCalendarEventsData(newRows);
    })();
  }, []);

  const handleTotalEmployee = () => {
    console.log('On redirect to Employee');
    navigate(getEmployeeListPattern());
  };

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        <Grid container order={{ xs: 1, lg: 0 }} spacing={3} item xs={12} lg={12} xl={12}>
          {role === 'admin' ? (
            <>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                onClick={handleTotalEmployee}
                sx={{ cursor: 'pointer' }}
              >
                <LeaveCard
                  title="Total Employee"
                  count="10"
                  icon={{ color: 'info', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                onClick={handleTotalEmployee}
                sx={{ cursor: 'pointer' }}
              >
                <LeaveCard
                  title="Today Present"
                  count="9"
                  icon={{ color: 'success', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                onClick={handleTotalEmployee}
                sx={{ cursor: 'pointer' }}
              >
                <LeaveCard
                  title="Today Absent"
                  count="1"
                  icon={{ color: 'error', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
            </>
          ) : (
            <>
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
            </>
          )}
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
