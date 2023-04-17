import React, { useEffect, useState } from 'react';
import { Card, Icon, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, MoreTime, RemoveRedEye, WatchOff } from '@mui/icons-material';
import Select from 'Elements/Select';
import { Months, Years, userArray } from 'Helpers/Global';
import FilterLayout from 'Components/FilterLayout';
import AttendanceCard from 'Components/CardLayouts/StaticCard';
import { useOutletContext } from 'react-router';
import { attendanceColumn } from 'StaticData/attendanceData';
import Input from 'Elements/Input';

const AttendanceList = () => {
  const { columns: prCols, adminColumns: adminPrCol } = attendanceColumn;
  const { role, GetAttendanceList, GetEmployeeList } = useOutletContext();
  // const [user, setUser] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [attendanceListCount, setAttendanceListCount] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({ key: 'attendanceDate', order: 'asc' });
  const [filter, setFilter] = useState(false);
  const [userList, setUserList] = useState([]);

  const [filterData, setFilterData] = useState({
    search: '',
    startDate: '',
    endDate: '',
    month: '',
    year: '',
    user: ''
  });
  const isValues = !Object.values(filterData).some((x) => x !== '');

  useEffect(() => {
    if (role === 'admin') {
      GetEmployeeList({ limit: 0 }, (res) => {
        if (res && res.data && res.data.data) {
          setUserList(userArray(res.data.data.rows));
        }
      });
    }
  }, []);

  useEffect(() => {
    GetAttendanceList(
      {
        limit: isNaN(limit) ? 0 : limit,
        user: filterData.user.value,
        month: filterData.month.value,
        year: filterData.year.value,
        search: filterData.search,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        page,
        sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
        sortOrder: sort.order
      },
      (res) => {
        if (res && res.data && res.data.data) {
          setAttendanceList(res.data.data.rows);
          setAttendanceListCount(res.data.data.count);
        }
      }
    );
    return () => {};
  }, [filter, page, sort, limit]);

  const handleClear = () => {
    setFilterData({
      search: '',
      startDate: '',
      endDate: '',
      month: '',
      year: '',
      user: ''
    });
    setFilter(!filter);
  };

  return (
    <>
      {role !== 'admin' && (
        <>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6} lg={4}>
              <AttendanceCard
                title="Total Late Coming"
                count={attendanceListCount && attendanceListCount.lateComingRes}
                icon={{ color: 'error', component: <WatchOff /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AttendanceCard
                title="Total Early Leaving"
                count={attendanceListCount && attendanceListCount.earlyLeavingRes}
                icon={{ color: 'info', component: <DirectionsRun /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AttendanceCard
                title="Total Overtime"
                count={attendanceListCount && attendanceListCount.overTimeRes}
                icon={{ color: 'warning', component: <MoreTime /> }}
                isPercentage={false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
            {role === 'admin' && (
              <Grid item xs="auto">
                <Button
                  color="white"
                  variant="outlined"
                  size="small"
                  sx={({ breakpoints, palette: { dark } }) => ({
                    [breakpoints.down('xl' && 'lg')]: {
                      color: dark.main,
                      borderColor: dark.main
                    }
                  })}
                >
                  <Icon sx={{ mr: 1 }}>
                    <Add />
                  </Icon>
                  Add
                </Button>
              </Grid>
            )}
          </Grid>
        </>
      )}

      <Card
        mb={3}
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={filterData.search}
          handleSearch={(e) => setFilterData({ ...filterData, search: e.target.value })}
          handleClear={() => !isValues && handleClear()}
          isDisable={attendanceListCount && attendanceListCount.TotalAttendance <= 0}
          onClickSearch={() => !isValues && setFilter(!filter)}
        >
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
              errorFalse
              value={filterData.startDate}
              onChange={(e) => setFilterData({ ...filterData, startDate: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="To Date"
              size="small"
              fullWidth
              id="toDate"
              name="toDate"
              errorFalse
              inputProps={{
                min: filterData.startDate
              }}
              value={filterData.endDate}
              onChange={(e) => setFilterData({ ...filterData, endDate: e.target.value })}
            />
          </Grid>
          {role === 'admin' && (
            <Grid item sm={12} md={4} lg={3}>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel>Select User</FormLabel>
                <Select
                  size="small"
                  value={filterData.user}
                  options={userList}
                  onChange={(value) => setFilterData({ ...filterData, user: value })}
                  renderValue={filterData.user !== '' ? undefined : () => 'Select...'}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              <Select
                size="small"
                options={Months}
                value={filterData.month}
                onChange={(value) => setFilterData({ ...filterData, month: value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              <Select
                size="small"
                options={Years}
                value={filterData.year}
                onChange={(value) => setFilterData({ ...filterData, year: value })}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={attendanceList}
          rowsCount={attendanceListCount && attendanceListCount.total}
          badge={['status']}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={isNaN(limit) ? attendanceListCount.total : limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          // onClickAction={(value, { id }) => {}}
          isView={[
            {
              name: 3,
              tooltip: 'Click to view',
              color: 'info',
              icon: <RemoveRedEye />,
              value: 'view'
            }
          ]}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
        />
      </Card>
    </>
  );
};
export default AttendanceList;
