import React, { useEffect, useState } from 'react';
import { Card, Icon, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, MoreTime, WatchOff } from '@mui/icons-material';
import Select from 'Elements/Select';
import { Months, Years, attendanceStatus } from 'Helpers/Global';
import FilterLayout from 'Components/FilterLayout';
import AttendanceCard from 'Components/CardLayouts/StaticCard';
import { useOutletContext } from 'react-router';
import attendanceColumn from './data/attendanceData';

const AttendanceList = () => {
  const { columns: prCols, adminColumns: adminPrCol } = attendanceColumn;
  const { role, GetAttendanceList } = useOutletContext();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [attendanceListCount, setAttendanceListCount] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({ key: 'attendanceDate', order: 'asc' });
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    GetAttendanceList(
      {
        limit,
        month: month.value,
        year: year.value,
        status: status.value,
        search,
        page,
        sortKey: sort.key,
        sortOrder: sort.order
      },
      (res) => {
        if (res && res.data && res.data.data) {
          setAttendanceList(res.data.data.rows);
          setAttendanceListCount(res.data.data.count);
          setFilter(false);
        }
      }
    );
    return () => {};
  }, [filter, page, sort]);

  const handleClear = () => {
    setMonth('');
    setYear('');
    setSearch('');
  };

  return (
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
      <Card
        mb={3}
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={(e) => setSearch(e.target.value)}
          handleClear={handleClear}
          onClickSearch={() => {
            setFilter(!filter);
          }}
        >
          {role === 'admin' && (
            <Grid item sm={12} md={4} lg={3}>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel>Select User</FormLabel>
                <Select
                  value={user}
                  onChange={(value) => setUser(value)}
                  displayEmpty
                  renderValue={user !== '' ? undefined : () => 'Select...'}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              <Select value={month} options={Months} onChange={(value) => setMonth(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              <Select value={year} options={Years} onChange={(value) => setYear(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                value={status}
                options={attendanceStatus}
                onChange={(value) => setStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={attendanceList}
          rowsCount={attendanceListCount.total}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, orderKey, orderName) =>
            setSort({ order: orderName, key: orderKey })
          }
        />
      </Card>
    </>
  );
};
export default AttendanceList;
