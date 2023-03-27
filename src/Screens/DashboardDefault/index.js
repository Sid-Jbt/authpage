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
  getAttendancePattern,
  getEmployeeListPattern,
  getExpensePattern,
  getLeavePattern,
  getSupportTicketPattern
} from 'Routes/routeConfig';
import DashboardCard from 'Components/CardLayouts/StaticCard';
import withStateDispatch from 'Helpers/withStateDispatch';

const DashboardDefault = ({ GetDashboard }) => {
  const { role } = useOutletContext();
  const navigate = useNavigate();
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [currentWeekHour, setCurrentWeekHour] = useState('');
  const [currentMonthHour, setCurrentMonthHour] = useState('');
  const [employeeCount, setEmployeeCount] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [expenseCount, setExpenseCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const noticeEventList = [
    {
      title: 'JBT Timer',
      eventName: 'JBT Timer',
      eventType: 'event',
      eventClass: 'error',
      start: '2023-03-31',
      end: '2023-03-31'
    },
    {
      title: 'Notice',
      eventName: 'Notice',
      eventType: 'notice',
      eventClass: 'warning',
      start: '2023-03-20',
      end: '2023-03-22'
    }
  ];

  useEffect(() => {
    GetDashboard({}, (res) => {
      if (res && res.data && res.data.data) {
        const {
          holidayList,
          currentWeekHours,
          currentMonthHours,
          totalEmployee,
          totalPresent,
          totalAbsent,
          totalPendingExpense,
          totalPendingLeave,
          totalPendingSupportTicket
        } = res.data.data;
        setCalendarEventsData(holidayList);
        setCurrentWeekHour(currentWeekHours);
        setCurrentMonthHour(currentMonthHours);
        setEmployeeCount(totalEmployee);
        setPresentCount(totalPresent);
        setAbsentCount(totalAbsent);
        setExpenseCount(totalPendingExpense);
        setLeaveCount(totalPendingLeave);
        setTicketCount(totalPendingSupportTicket);
      }
      const calenderData = calendarEventsData.map((holiday) => ({
        title: holiday.title,
        eventName: 'holiday.title',
        eventType: 'holiday',
        eventClass: 'info',
        start: holiday.holidayDate,
        end: holiday.holidayDate
      }));
      setCalendarEventsData([...calenderData, ...noticeEventList]);
    });
  }, []);

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
                  count={currentWeekHour === 0 ? '00:00:00' : currentMonthHour}
                  icon={{ color: 'secondary', component: <WatchRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <DashboardCard
                  title="Current month"
                  count={currentMonthHour === 0 ? '00:00:00' : currentMonthHour}
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
                  count={employeeCount && employeeCount}
                  icon={{ color: 'info', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                onClick={() => navigate(getAttendancePattern())}
                sx={{ cursor: 'pointer' }}
              >
                <DashboardCard
                  title="Today Present"
                  count={presentCount && presentCount}
                  icon={{ color: 'success', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                onClick={() => navigate(getAttendancePattern())}
                sx={{ cursor: 'pointer' }}
              >
                <DashboardCard
                  title="Today Absent"
                  count={absentCount && absentCount}
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
                  count={expenseCount && expenseCount}
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
                  count={leaveCount && leaveCount}
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
                  count={ticketCount && ticketCount}
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
