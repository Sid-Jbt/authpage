import React, { useState } from 'react';
import { Card, Icon, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, ImportExportRounded, MoreTime, WatchOff } from '@mui/icons-material';
// import Input from 'Elements/Input';
import Select from 'Elements/Select';
import { Months, Years, Status } from 'Helpers/Globle';
import FilterLayout from 'Components/FilterLayout';
import attendanceData from './data/attendanceData';
import LeaveCard from '../../Components/CardLayouts/LeaveCard';

const AttendanceList = () => {
  const { columns: prCols, rows: prRows } = attendanceData;
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState('');

  const handleChangeStatus = (value) => {
    setStatus(value.value);
  };

  const handleChangeMonth = (value) => {
    setMonth(value.value);
  };

  const handleChangeYear = (value) => {
    setYear(value.value);
  };

  const handleChangeUser = (value) => {
    setUser(value.value);
  };
  console.log('Month, Year, Status --> ', month, year, status);

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="Total Late Coming"
            count="12"
            icon={{ color: 'error', component: <WatchOff /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="Total Early Leaving"
            count="3"
            icon={{ color: 'info', component: <DirectionsRun /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="Total Overtime"
            count="4"
            icon={{ color: 'warning', component: <MoreTime /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        <Grid item xs={12} md="auto">
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
        <Grid item xs={12} md="auto">
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
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid>
      </Grid>
      <Card
        mb={3}
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout>
          <Grid item sm={12} md={4} lg={2.4}>
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

          <Grid item xs={12} md={4} lg={2.4}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              <Select options={Months} onChange={(value) => handleChangeMonth(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={2.4}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              <Select options={Years} onChange={(value) => handleChangeYear(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={2.4}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select options={Status} onChange={(value) => handleChangeStatus(value)} />
            </FormControl>
          </Grid>
          {/* <Grid item sm={12} md={4} lg={2.4}> */}
          {/*  <FormControl sx={{ width: '100%' }}> */}
          {/*    <FormLabel>Status</FormLabel> */}
          {/*    <Select */}
          {/*      id="selectStatus" */}
          {/*      value={status} */}
          {/*      onChange={handleChangeStatus} */}
          {/*      displayEmpty */}
          {/*      renderValue={status !== '' ? undefined : () => 'All'} */}
          {/*    > */}
          {/*      <MenuItem value="all">All</MenuItem> */}
          {/*      <MenuItem value="pre">Present</MenuItem> */}
          {/*      <MenuItem value="abs">Absent</MenuItem> */}
          {/*      <MenuItem value="late">Late</MenuItem> */}
          {/*      <MenuItem value="ovt">Overtime</MenuItem> */}
          {/*    </Select> */}
          {/*  </FormControl> */}
          {/* </Grid> */}
        </FilterLayout>
        <Table columns={prCols} rows={prRows} />
      </Card>
    </>
  );
};
export default AttendanceList;
