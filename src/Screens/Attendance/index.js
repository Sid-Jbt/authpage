import React, { useState } from 'react';
import { Card, Icon, MenuItem, Select, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { ImportExportRounded } from '@mui/icons-material';
import Input from 'Elements/Input';
// import Select from 'Elements/Select';
import { Months, Years } from 'Helpers/Globle';
import FilterLayout from 'Components/FilterLayout';
import attendanceData from './data/attendanceData';

const AttendanceList = () => {
  const { columns: prCols, rows: prRows } = attendanceData;
  const [month, setMonth] = useState('');
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  // const Array = Years;
  // Array.push({
  //   value: '',
  //   label: ''
  // });
  // console.log(Array);

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        <Grid item xs="auto">
          <Button color="white" variant="outlined" size="small">
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
            <Input
              type="date"
              label="Select Date"
              size="small"
              fullWidth
              id="date"
              name="Date"
              errorFalse
            />
          </Grid>
          <Grid item sm={12} md={4} lg={2.4}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              {/* <Select options={Months} onChange={(value) => handleChangeMonth(value)} /> */}
              <Select
                value={month}
                onChange={handleChangeMonth}
                displayEmpty
                renderValue={month !== '' ? undefined : () => 'All'}
              >
                {Months.map((m, key) => (
                  <MenuItem key={key} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={4} lg={2.4}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              {/* <Select options={Years} onChange={(value) => handleChangeYear(value)} /> */}
              <Select
                id="selectYear"
                value={year}
                onChange={handleChangeYear}
                displayEmpty
                renderValue={year !== '' ? undefined : () => '2023'}
              >
                {Years.map((y, key) => (
                  <MenuItem key={key} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={4} lg={2.4}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Status</FormLabel>
              <Select
                id="selectStatus"
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                renderValue={status !== '' ? undefined : () => 'All'}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pre">Present</MenuItem>
                <MenuItem value="abs">Absent</MenuItem>
                <MenuItem value="late">Late</MenuItem>
                <MenuItem value="ovt">Overtime</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </FilterLayout>
        {/* <Grid container alignItems="center" spacing={2} p={2} pb={0} mb={2}> */}
        {/*  <Grid container item sm={10} alignItems="center" justifyContent="space-between"> */}
        {/*    <Grid item xs={6}> */}
        {/*      <Typography variant="h3">Attendance</Typography> */}
        {/*    </Grid> */}
        {/*    <Grid container item xs={6} justifyContent="end" sx={{ gap: 2 }}> */}
        {/*      <Button color="info" variant="contained" size="small"> */}
        {/*        <Icon> */}
        {/*          <ImportExportRounded /> */}
        {/*        </Icon> */}
        {/*        Export */}
        {/*      </Button> */}
        {/*    </Grid> */}
        {/*  </Grid> */}
        {/* <Grid container alignItems="center" spacing={2} p={2} pb={0} mb={2}> */}
        {/*  <Grid container item xs={12}> */}
        {/*    <Icon> */}
        {/*      <FilterListSharp /> */}
        {/*    </Icon> */}
        {/*    <Typography variant="h6">Filter</Typography> */}
        {/*  </Grid> */}
        {/*  <Grid item sm={12} md={4} lg={2}> */}
        {/*    <Input */}
        {/*      placeholder="Search" */}
        {/*      type="text" */}
        {/*      label="Search" */}
        {/*      size="small" */}
        {/*      fullWidth */}
        {/*      id="search" */}
        {/*      name="search" */}
        {/*      errorFalse */}
        {/*    /> */}
        {/*  </Grid> */}
        {/*  <Grid */}
        {/*    item */}
        {/*    sm={12} */}
        {/*    md={8} */}
        {/*    lg={4} */}
        {/*    pt={4} */}
        {/*    sx={({ breakpoints }) => ({ */}
        {/*      [breakpoints.down('lg' && 'md')]: { */}
        {/*        marginBottom: 2 */}
        {/*      } */}
        {/*    })} */}
        {/*  > */}
        {/*    /!* <Grid sx={{ mb: 2 }} item sm={12} md={4} lg={3}> *!/ */}
        {/*    <Button color="info" variant="contained" size="small" sx={{ marginRight: '10px' }}> */}
        {/*      <Icon sx={{ mr: '2px' }}> */}
        {/*        <SearchRounded /> */}
        {/*      </Icon> */}
        {/*      Search */}
        {/*    </Button> */}
        {/*    <Button color="error" variant="contained" size="small"> */}
        {/*      <Icon sx={{ mr: '2px' }}> */}
        {/*        <ClearRounded /> */}
        {/*      </Icon> */}
        {/*      Clear */}
        {/*    </Button> */}
        {/*  </Grid> */}
        {/* </Grid> */}
        <Table columns={prCols} rows={prRows} />
      </Card>
    </>
  );
};
export default AttendanceList;
