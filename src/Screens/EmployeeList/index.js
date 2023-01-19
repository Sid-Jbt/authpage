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
import employeeListData from './data/employeeListData';

const EmployeeList = () => {
  const { columns: prCols, rows: prRows } = employeeListData;
  const [role, setRole] = useState('');

  const handleChangeRole = (event) => {
    setRole(event.target.value);
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
            <Typography variant="h3">Employee</Typography>
          </Grid>
          <Grid container item xs={6} justifyContent="end" sx={{ gap: 2 }}>
            <Button color="info" variant="contained" size="small">
              <Icon>
                <Add />
              </Icon>
              Add
            </Button>
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
            label="From Date"
            size="small"
            fullWidth
            id="fromDate"
            name="fromDate"
          />
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input type="date" label="To Date" size="small" fullWidth id="toDate" name="toDate" />
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
          />
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>Select Role</FormLabel>
            <Select
              id="selectRole"
              value={role}
              onChange={handleChangeRole}
              displayEmpty
              renderValue={role !== '' ? undefined : () => 'All'}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="superAdmin">Super Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="developer">Developer</MenuItem>
              <MenuItem value="hR">HR</MenuItem>
              <MenuItem value="qA">QA</MenuItem>
              <MenuItem value="tester">Tester</MenuItem>
            </Select>
            <FormHelperText sx={{ mr: 0, ml: 0, color: 'red' }}> </FormHelperText>
          </FormControl>
        </Grid>
        <Grid
          item
          sm={12}
          md={8}
          lg={4}
          sx={({ breakpoints }) => ({
            [breakpoints.down('lg' && 'md')]: {
              marginBottom: 2
            }
          })}
        >
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

export default EmployeeList;
