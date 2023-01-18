import React, { useState } from 'react';
import { Card, Icon, MenuItem, Select, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import Button from 'Elements/Button';
import {
  Add,
  ImportExportRounded,
  SearchRounded,
  ClearRounded,
  FilterListRounded
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
      <Grid container spacing={2} p={2} pb={0}>
        <Grid container item sm={12} alignItems="center" justifyContent="space-between">
          <Typography variant="h3">Employee</Typography>
          <Box>
            <Button
              color="info"
              variant="contained"
              size="small"
              sx={{ marginRight: '10px', marginLeft: '40px' }}
            >
              <Icon sx={{ mr: '2px' }}>
                <Add />
              </Icon>
              Add
            </Button>
            <Button color="info" variant="contained" size="small">
              <Icon sx={{ mr: '2px' }}>
                <ImportExportRounded />
              </Icon>
              Export
            </Button>
          </Box>
        </Grid>
        <Grid container item xs={12}>
          <Icon>
            <FilterListRounded />
          </Icon>
          <Typography variant="h6">Filter</Typography>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input
            type="date"
            placeholder="from date"
            label="From Date"
            size="small"
            fullWidth
            id="fromDate"
            name="fromDate"
          />
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input
            type="date"
            placeholder="To Date"
            size="small"
            fullWidth
            id="toDate"
            name="toDate"
          />
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Select
            id="selectRole"
            value={role}
            onChange={handleChangeRole}
            displayEmpty
            renderValue={role !== '' ? undefined : () => 'Select Role'}
          >
            <MenuItem value="superAdmin">Super Admin</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="hR">HR</MenuItem>
            <MenuItem value="qA">QA</MenuItem>
            <MenuItem value="tester">Tester</MenuItem>
          </Select>
        </Grid>
        <Grid item sm={12} md={4} lg={6}>
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
