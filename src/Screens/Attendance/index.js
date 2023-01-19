import React, { useState } from 'react';
import {
  Card,
  Icon,
  MenuItem,
  Select,
  Grid,
  FormLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import Button from 'Elements/Button';
import {
  Add,
  ImportExportRounded,
  SearchRounded,
  ClearRounded,
  FilterListSharp
} from '@mui/icons-material';
import Input from 'Elements/Input';
import attendanceData from './data/attendanceData';

const AttendanceList = () => {
  const { columns: prCols, rows: prRows } = attendanceData;
  const [month, setMonth] = useState('');
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Card
      mb={3}
      sx={{
        background: ({ palette: { grey } }) => grey[100],
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
        boxShadow: ({ boxShadows: { md } }) => md
      }}
    >
      <Grid container alignItems="center" spacing={2} p={2} pb={0}>
        <Grid container item sm={12} alignItems="center" justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h3">Attendance</Typography>
          </Grid>
          <Grid container item xs={6} justifyContent="end" sx={{ gap: 2 }}>
            <Button color="info" variant="contained" size="small">
              <Icon>
                <ImportExportRounded />
              </Icon>
              Export
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Icon>
            <FilterListSharp />
          </Icon>
          <Typography variant="h6">Filter</Typography>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input
            type="date"
            label="Select Date"
            size="small"
            fullWidth
            id="date"
            name="Date"
            errorFalse={true}
          />
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>Select Month</FormLabel>
            <Select
              id="selectMonth"
              value={month}
              onChange={handleChangeMonth}
              displayEmpty
              renderValue={month !== '' ? undefined : () => 'Select Month'}
            >
              <MenuItem value="jan">January</MenuItem>
              <MenuItem value="feb">February</MenuItem>
              <MenuItem value="mar">March</MenuItem>
              <MenuItem value="april">April</MenuItem>
              <MenuItem value="may">May</MenuItem>
              <MenuItem value="june">June</MenuItem>
              <MenuItem value="july">July</MenuItem>
              <MenuItem value="aug">August</MenuItem>
              <MenuItem value="sept">September</MenuItem>
              <MenuItem value="oct">October</MenuItem>
              <MenuItem value="nov">November</MenuItem>
              <MenuItem value="dec">December</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>Select Year</FormLabel>
            <Select
              id="selectMonth"
              value={month}
              onChange={handleChangeMonth}
              displayEmpty
              renderValue={month !== '' ? undefined : () => 'Select Year'}
            >
              <MenuItem value="jan">January</MenuItem>
              <MenuItem value="feb">February</MenuItem>
              <MenuItem value="mar">March</MenuItem>
              <MenuItem value="april">April</MenuItem>
              <MenuItem value="may">May</MenuItem>
              <MenuItem value="june">June</MenuItem>
              <MenuItem value="july">July</MenuItem>
              <MenuItem value="aug">August</MenuItem>
              <MenuItem value="sept">September</MenuItem>
              <MenuItem value="oct">October</MenuItem>
              <MenuItem value="nov">November</MenuItem>
              <MenuItem value="dec">December</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
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
        <Grid item sm={12} md={4} lg={2}>
          <Input
            placeholder="Search"
            type="text"
            label="Search"
            size="small"
            fullWidth
            id="search"
            name="search"
            errorFalse={true}
          />
        </Grid>
        <Grid sx={{ mb: 2 }} item sm={12} md={4} lg={3}>
          <Button color="info" variant="contained" size="small" sx={{ marginRight: '10px' }}>
            <Icon sx={{ mr: '2px' }}>
              <SearchRounded />
            </Icon>
            Search
          </Button>
          <Button color="error" variant="contained" size="small">
            <Icon sx={{ mr: '2px' }}>
              <ClearRounded />
            </Icon>
            Clear
          </Button>
        </Grid>
      </Grid>
      <Table columns={prCols} rows={prRows} />
    </Card>
  );
};

export default AttendanceList;
