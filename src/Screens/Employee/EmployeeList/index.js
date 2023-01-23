import React, { useState } from 'react';
import { Card, FormControl, FormLabel, Icon, Grid } from '@mui/material';
import { Add, ImportExportRounded } from '@mui/icons-material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import Select from 'Elements/Select';
import { Roles } from 'Helpers/Globle';
import employeeListData from './data/employeeListData';
import AddEmployeeForm from './AddEmployeeForm';

const EmployeeList = () => {
  const { columns: prCols, rows: prRows } = employeeListData;
  const [role, setRole] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChangeRole = (value) => {
    setRole(value.value);
  };
  console.log('Selected Role --> ', role);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const onClickExport = () => {
    alert('Export coming soon...');
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        <Grid item xs="auto">
          <Button color="white" variant="outlined" size="small" onClick={handleDialog}>
            <Icon sx={{ mr: 1 }}>
              <Add />
            </Icon>
            Add
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button color="white" variant="outlined" size="small" onClick={onClickExport}>
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid>
      </Grid>
      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout>
          <Grid item sm={12} md={4} lg={3}>
            <Input
              type="date"
              label="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
              errorFalse
            />
          </Grid>
          <Grid item sm={12} md={4} lg={3}>
            <Input
              type="date"
              label="To Date"
              size="small"
              fullWidth
              id="toDate"
              name="toDate"
              errorFalse
            />
          </Grid>
          <Grid item sm={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Role</FormLabel>
              <Select options={Roles} onChange={(value) => handleChangeRole(value)} />
            </FormControl>
          </Grid>
        </FilterLayout>
        <Table columns={prCols} rows={prRows} />
        <AddEmployeeForm isDialogOpen={isDialogOpen} handleDialog={handleDialog} />
      </Card>
    </>
  );
};

export default EmployeeList;
