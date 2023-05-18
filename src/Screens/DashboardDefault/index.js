import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import Calendar from 'Components/Calendar';
import {
  CurrencyRupeeRounded,
  PeopleRounded,
  SupportRounded,
  TimeToLeaveRounded,
  Watch,
  WatchLater,
  WatchRounded
} from '@mui/icons-material';
import { useOutletContext } from 'react-router';
import {
  getEmployeeListPattern,
  getExpensePattern,
  getLeavePattern,
  getSupportTicketPattern
} from 'Routes/routeConfig';
import DashboardCard from 'Components/CardLayouts/StaticCard';
import { CheckPermission } from '../../Helpers/Global';

const DashboardDefault = () => {
  const { DashboardData, permission } = useOutletContext();
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [workingTime, setWorkingTime] = useState({
    todayHours: 0,
    currentWeekHours: 0,
    currentMonthHours: 0
  });
  const [count, setCount] = useState({
    employeeCount: 0,
    presentCount: 0,
    absentCount: 0,
    expenseCount: 0,
    leaveCount: 0,
    ticketCount: 0
  });

  const isAdmin = CheckPermission(permission && permission.organisation);

  useEffect(() => {
    if (DashboardData) {
      const {
        holidayList,
        noticeList,
        currentWeekHours,
        currentMonthHours,
        todayHours,
        totalEmployee,
        totalPresent,
        totalAbsent,
        totalPendingExpense,
        totalPendingLeave,
        totalPendingSupportTicket
      } = DashboardData;
      const calenderData = holidayList
        ? holidayList.map((holiday) => ({
            title: holiday.title,
            eventName: holiday.title,
            eventType: 'holiday',
            eventClass: 'info',
            start: holiday.holidayDate,
            end: holiday.holidayDate
          }))
        : [];
      const noticeData = noticeList
        ? noticeList.map((notice) => ({
            title: notice.title,
            eventName: 'notice.title',
            eventType: 'notice',
            eventClass: 'info',
            start: notice.noticeStartDate,
            end: notice.noticeEndDate
          }))
        : [];
      setCalendarEventsData([...calenderData, ...noticeData]);
      setWorkingTime((prev) => ({
        ...prev,
        todayHours,
        currentWeekHours,
        currentMonthHours
      }));
      setCount((prev) => ({
        ...prev,
        employeeCount: totalEmployee,
        presentCount: totalPresent,
        absentCount: totalAbsent,
        expenseCount: totalPendingExpense,
        leaveCount: totalPendingLeave,
        ticketCount: totalPendingSupportTicket
      }));
    }
  }, [DashboardData]);

  return (
    <Grid container spacing={2}>
      <Grid
        container
        order={{ xs: 1, lg: 0 }}
        alignItems="flex-start"
        spacing={2}
        item
        xs={12}
        lg={12}
        xl={12}
      >
        {isAdmin ? null : (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <DashboardCard
                title="Today"
                count={
                  workingTime.todayHours === 0 || workingTime.todayHours === undefined
                    ? '00:00:00'
                    : workingTime.todayHours
                }
                icon={{ color: 'success', component: <Watch /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DashboardCard
                title="Current week"
                count={
                  workingTime.currentWeekHours === null || workingTime.currentWeekHours === 0
                    ? '00:00:00'
                    : workingTime.currentWeekHours
                }
                icon={{ color: 'secondary', component: <WatchRounded /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DashboardCard
                title="Current month"
                count={
                  workingTime.currentMonthHours === 0 ? '00:00:00' : workingTime.currentMonthHours
                }
                icon={{ color: 'info', component: <WatchLater /> }}
                isPercentage={false}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} lg={isAdmin ? 8 : 12}>
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
        {isAdmin ? (
          <Grid container item spacing={2} xs={12} lg={4}>
            <Grid item xs={12} lg={6}>
              <DashboardCard
                title="Employee"
                percentage={{
                  color: 'success',
                  count: count && count.employeeCount,
                  text: ''
                }}
                icon={{ color: 'success', component: <PeopleRounded /> }}
                link={getEmployeeListPattern()}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DashboardCard
                title="Pending"
                percentage={{
                  color: 'warning',
                  count: count && count.expenseCount,
                  text: ''
                }}
                icon={{ color: 'warning', component: <CurrencyRupeeRounded /> }}
                link={getExpensePattern()}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DashboardCard
                title="Leaves"
                percentage={{
                  color: 'warning',
                  count: count && count.leaveCount,
                  text: ''
                }}
                icon={{ color: 'warning', component: <TimeToLeaveRounded /> }}
                link={getLeavePattern()}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DashboardCard
                title="Support"
                percentage={{
                  color: 'warning',
                  count: count && count.ticketCount,
                  text: ''
                }}
                icon={{ color: 'warning', component: <SupportRounded /> }}
                link={getSupportTicketPattern()}
              />
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
