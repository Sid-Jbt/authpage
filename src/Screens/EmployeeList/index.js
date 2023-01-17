import React, { useState } from 'react';
import { Card, Icon, MenuItem, Select, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import Button from 'Elements/Button';
import { Add, ImportExportRounded, SearchRounded, ClearRounded } from '@mui/icons-material';
import Input from 'Elements/Input';
import Paginations from 'Components/Pagination/index';
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
      <Grid container spacing={2} p={2}>
        <Grid item sm={12}>
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Employee</Typography>
            <Box>
              <Button color="info" variant="contained" size="small" sx={{ marginRight: '10px' }}>
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
            </Box>
          </Grid>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input
            type="date"
            placeholder="From Date"
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
            height="10px"
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
            <Icon>
              <SearchRounded />
            </Icon>
            Search
          </Button>
          <Button color="info" variant="contained" size="small">
            <Icon>
              <ClearRounded />
            </Icon>
            Clear
          </Button>
        </Grid>
      </Grid>
      <Card
        sx={{
          background: ({ palette: { white } }) => white.main,
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { xl } }) => xl
        }}
      >
        <Box
          sx={{
            '& .MuiTableRow-root:not(:last-child)': {
              '& td': {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`
              }
            }
          }}
        >
          <Table columns={prCols} rows={prRows} />
        </Box>
        <Paginations rows={prRows.length} />
      </Card>
    </Card>
  );
};

export default EmployeeList;
