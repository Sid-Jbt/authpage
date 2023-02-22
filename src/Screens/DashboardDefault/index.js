import React, { useEffect, useMemo, useState } from 'react';
import Box from 'Elements/Box';
import { Grid } from '@mui/material';
import Calendar from 'Components/Calendar';
import {
  HolidayVillage,
  PendingTwoTone,
  PeopleRounded,
  Watch,
  WatchLater,
  WatchRounded
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Badge from 'Elements/Badge';
import {
  getEmployeeListPattern,
  getExpensePattern,
  getLeavePattern
} from '../../Routes/routeConfig';
import LeaveCard from '../../Components/CardLayouts/StaticCard';

const DashboardDefault = () => {
  const { role } = useSelector((state) => state.route);
  const { currentUser } = useSelector((state) => state.route);
  console.log('currentUser', currentUser);
  const navigate = useNavigate();
  const [calendarEventsData, setCalendarEventsData] = useState([]);

  useEffect(() => {
    (async () => {
      const items = await JSON.parse(localStorage.getItem('noticeBoardEvent'));
      const newRows =
        items &&
        items.map((item) => {
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
    navigate(getEmployeeListPattern());
  };

  const handlePendingExpense = () => {
    navigate(getExpensePattern());
  };

  const handlePendingLeave = () => {
    navigate(getLeavePattern());
  };

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        <Grid
          container
          order={{ xs: 1, lg: 0 }}
          alignItems="flex-start"
          spacing={3}
          item
          xs={12}
          lg={12}
          xl={12}
        >
          {role === 'admin' ? null : (
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
          <Grid item xs={12} lg={role === 'admin' ? 8 : 12}>
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
          {role === 'admin' ? (
            <Grid container item spacing={3} xs={12} lg={4}>
              <Grid item xs={12} lg={6} onClick={handleTotalEmployee} sx={{ cursor: 'pointer' }}>
                <LeaveCard
                  title="Total Employee"
                  count="10"
                  icon={{ color: 'info', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} lg={6} onClick={handleTotalEmployee} sx={{ cursor: 'pointer' }}>
                <LeaveCard
                  title="Today Present"
                  count="9"
                  icon={{ color: 'success', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} lg={6} onClick={handleTotalEmployee} sx={{ cursor: 'pointer' }}>
                <LeaveCard
                  title="Today Absent"
                  count="1"
                  icon={{ color: 'error', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} lg={6} onClick={handlePendingExpense} sx={{ cursor: 'pointer' }}>
                <LeaveCard
                  title="Pending Expense"
                  count="1"
                  icon={{ color: 'warning', component: <PendingTwoTone /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} lg={6} onClick={handlePendingLeave} sx={{ cursor: 'pointer' }}>
                <LeaveCard
                  title="Pending Leave Approval"
                  count="0"
                  icon={{ color: 'secondary', component: <HolidayVillage /> }}
                  isPercentage={false}
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardDefault;
