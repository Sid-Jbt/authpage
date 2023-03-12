/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Icon, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, MoreTime, WatchOff } from '@mui/icons-material';
import Select from 'Elements/Select';
import { Months, Years, Status } from 'Helpers/Global';
import FilterLayout from 'Components/FilterLayout';
import { useSelector } from 'react-redux';
import AttendanceCard from 'Components/CardLayouts/StaticCard';
import attendanceColumn from './data/attendanceData';

const AttendanceList = () => {
  const { columns: prCols, adminColumns: adminPrCol } = attendanceColumn;
  const { role } = useSelector((state) => state.login);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isStatus, setIsStatus] = useState('');
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');
  const [counts, setCounts] = useState(null);
  const [loader, setLoader] = useState(false);

  const [attendanceList, setAttendanceList] = useState([]);
  const [attendanceListCount, setAttendanceListCount] = useState(0);
  const [sortKey, setSortKey] = useState('attendanceDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  const handleChangeStatus = (value) => {
    setIsStatus(value);
  };

  const handleChangeMonth = (value) => {
    setMonth(value);
  };

  const handleChangeYear = (value) => {
    setYear(value);
  };

  const handleChangeUser = (value) => {
    setUser(value);
  };
  const handleChangeSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  /*  const onClickExport = () => {
    setSnack({
      title: 'Coming Soon',
      message: 'Export coming soon...',
      time: false,
      icon: <Check color="white" />,
      color: 'warning',
      open: true
    });
  }; */

  const handleClear = () => {
    setMonth('');
    setYear('');
    setSearch('');
  };

  const onClickSearch = () => {
    setLoader(true);
    setIsSearch(true);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={4}>
          <AttendanceCard
            title="Total Late Coming"
            count={counts === null ? 0 : counts.lateComingRes}
            icon={{ color: 'error', component: <WatchOff /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AttendanceCard
            title="Total Early Leaving"
            count={counts === null ? 0 : counts.earlyLeavingRes}
            icon={{ color: 'info', component: <DirectionsRun /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AttendanceCard
            title="Total Overtime"
            count={counts === null ? 0 : counts.overTimeRes}
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
        {/* <Grid item xs="auto">
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
            onClick={onClickExport}
          >
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid> */}
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
          handleSearch={handleChangeSearch}
          handleClear={() => handleClear()}
          onClickSearch={() => onClickSearch()}
          loader={loader}
          isSearch={isSearch}
        >
          {role === 'admin' && (
            <Grid item sm={12} md={4} lg={3}>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel>Select User</FormLabel>
                <Select
                  value={user}
                  onChange={handleChangeUser}
                  displayEmpty
                  renderValue={user !== '' ? undefined : () => 'Select...'}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              <Select
                value={month}
                options={Months}
                onChange={(value) => handleChangeMonth(value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              <Select value={year} options={Years} onChange={(value) => handleChangeYear(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                value={isStatus}
                options={Status}
                onChange={(value) => handleChangeStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>
        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={attendanceList}
          rowsCount={attendanceListCount}
          initialPage={page}
          onChangePage={(value) => onPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => onRowsPerPageChange(rowsPerPage)}
          sortKey={sortKey}
          sortOrder={sortOrder}
          handleRequestSort={(event, orderName, orderKey) => onSort(event, orderName, orderKey)}
        />
      </Card>
    </>
  );
};
export default AttendanceList;
