/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import Box from 'Elements/Box';
import { Grid } from '@mui/material';
import Calendar from 'Components/Calendar';
import {
  HolidayVillage,
  PendingActionsRounded,
  PendingTwoTone,
  PeopleRounded,
  Watch,
  WatchLater,
  WatchRounded
} from '@mui/icons-material';
import { useNavigate, useOutletContext } from 'react-router';
import {
  getEmployeeListPattern,
  getExpensePattern,
  getLeavePattern,
  getSupportTicketPattern
} from 'Routes/routeConfig';
import DashboardCard from 'Components/CardLayouts/StaticCard';
import withStateDispatch from '../../Helpers/withStateDispatch';

const DashboardDefault = ({ GetDashboard }) => {
  const { role } = useOutletContext();
  const navigate = useNavigate();
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [currentWeekHour, setCurrentWeekHour] = useState(0);
  const [currentMonthHour, setCurrentMonthHour] = useState(0);

  useEffect(() => {
    GetDashboard();
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
                <DashboardCard
                  title="Today"
                  count="00:00:00"
                  icon={{ color: 'success', component: <Watch /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <DashboardCard
                  title="Current week"
                  count={currentWeekHour}
                  icon={{ color: 'secondary', component: <WatchRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <DashboardCard
                  title="Current month"
                  count={currentMonthHour}
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
                  header={{ title: 'Current Month Updates' }}
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
              <Grid
                item
                xs={12}
                lg={6}
                onClick={() => navigate(getEmployeeListPattern())}
                sx={{ cursor: 'pointer' }}
              >
                <DashboardCard
                  title="Total Employee"
                  count="10"
                  icon={{ color: 'info', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                onClick={() => navigate(getEmployeeListPattern())}
                sx={{ cursor: 'pointer' }}
              >
                <DashboardCard
                  title="Today Present"
                  count="9"
                  icon={{ color: 'success', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                onClick={() => navigate(getEmployeeListPattern())}
                sx={{ cursor: 'pointer' }}
              >
                <DashboardCard
                  title="Today Absent"
                  count="1"
                  icon={{ color: 'error', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                onClick={() => navigate(getExpensePattern())}
                sx={{ cursor: 'pointer' }}
              >
                <DashboardCard
                  title="Pending Expense"
                  count="1"
                  icon={{ color: 'warning', component: <PendingTwoTone /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                onClick={() => navigate(getLeavePattern())}
                sx={{ cursor: 'pointer' }}
              >
                <DashboardCard
                  title="Pending Leave Approval"
                  count="0"
                  icon={{ color: 'secondary', component: <HolidayVillage /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                onClick={() => navigate(getSupportTicketPattern())}
                sx={{ cursor: 'pointer' }}
              >
                <DashboardCard
                  title="Pending Support Tickets"
                  count="0"
                  icon={{ color: 'secondary', component: <PendingActionsRounded /> }}
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

export default withStateDispatch(DashboardDefault);
