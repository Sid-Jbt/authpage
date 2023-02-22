import React, { useContext, useState } from 'react';
import { Card, FormControl, FormLabel, Icon, Grid } from '@mui/material';
import { Add, Check, ImportExportRounded } from '@mui/icons-material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import Select from 'Elements/Select';
import { Roles } from 'Helpers/Global';
import { useNavigate } from 'react-router';
import { getEmployeeDetailsPattern } from 'Routes/routeConfig';
import { useSelector } from 'react-redux';
import employeeListData from './data/employeeListData';
import AddEmployeeForm from './AddEmployeeForm';
import { SnackbarContext } from '../../../Context/SnackbarProvider';

const EmployeeList = () => {
  const { role } = useSelector((state) => state.route);
  const { columns: prCols, rows: prRows } = employeeListData;
  const { setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search, setSearch] = useState('');

  const handleChangeStartDate = (event, string) => {
    if (string === 'fromDate') {
      setFromDate(event.target.value);
    } else {
      setToDate(event.target.value);
    }
  };

  const handleChangeRole = (value) => {
    setSelectedRole(value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event);
  };

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const onClickExport = () => {
    setSnack({
      title: 'Warning',
      message: 'Export coming soon...',
      time: false,
      icon: <Check color="white" />,
      color: 'warning',
      open: true
    });
  };

  const onClickAction = (value, id) => {
    if (value === 'details') {
      return navigate(getEmployeeDetailsPattern(id));
    }
    setSnack({
      title: 'Success',
      message: `Selected employee data deleted successfully.`,
      time: false,
      icon: <Check color="white" />,
      color: 'success',
      open: true
    });
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    setSelectedRole('');
    setSearch('');
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {role === 'admin' ? (
          <>
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
          </>
        ) : null}
      </Grid>
      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={() => handleChangeSearch()}
          handleClear={() => handleClear()}
        >
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
              value={fromDate !== '' ? fromDate : ''}
              onChange={(value) => handleChangeStartDate(value, 'fromDate')}
              errorFalse
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
              value={toDate !== '' ? toDate : ''}
              onChange={(value) => handleChangeStartDate(value, 'toDate')}
              errorFalse
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Role</FormLabel>
              <Select
                value={selectedRole}
                options={Roles}
                onChange={(value) => handleChangeRole(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>
        <Table
          columns={prCols}
          rows={prRows}
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction
          options={[
            { title: 'Details', value: 'details' },
            { title: 'Delete', value: 'delete' }
          ]}
        />
        <AddEmployeeForm isDialogOpen={isDialogOpen} handleDialog={handleDialog} />
      </Card>
    </>
  );
};

export default EmployeeList;
