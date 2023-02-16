import React, { useContext, useEffect, useState } from 'react';
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
import { getCompanyEmployee } from '../../../APIs/API';
import logoSpotify from '../../../Assets/logo/jbt-logo.svg';

const EmployeeList = () => {
  const { role } = useSelector((state) => state.route);
  const { columns: prCols } = employeeListData;
  const { setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search, setSearch] = useState('');
  const [allEmployee, setAllEmployee] = useState([]);
  const [sortKey, setSortKey] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [countEmployee, setCountEmployee] = useState(0);
  const [isClear, setIsClear] = useState(false);

  console.log(setSortOrder, setSortKey, setPage, countEmployee, setCountEmployee);

  const getAllCompanyEmployee = async (
    selectedSortKey = 'lastName',
    selectedSortOrder = 'asc',
    selectedPage = 0,
    text = '',
    count = 0
  ) => {
    const employeeData = {
      limit: 10,
      page: selectedPage,
      sortKey: selectedSortKey,
      sortOrder: selectedSortOrder,
      search: text,
      count
    };
    console.log('empData', employeeData);
    const employeeRes = await getCompanyEmployee(employeeData);
    const {
      status,
      data: { rows },
      message
    } = employeeRes;
    if (status) {
      const employee = rows.map((employeeId) => ({
        ...employeeId,
        name: [logoSpotify, employeeId.firstName]
      }));
      setAllEmployee(employee);
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        color: 'success',
        open: true
      });
    }
  };

  useEffect(() => {
    getAllCompanyEmployee();
  }, []);

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
    setSearch(event.target.value);
  };

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const onClickExport = () => {
    alert('Export coming soon...');
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

  useEffect(() => {
    if (isClear) {
      getAllCompanyEmployee(sortKey, sortOrder, page, '', 1);
    }
  }, [isClear]);

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    setSelectedRole('');
    setSearch('');
    setIsClear(!isClear);
  };

  const onClickSearch = () => {
    getAllCompanyEmployee(sortKey, sortOrder, page, search, 1);
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
          handleSearch={handleChangeSearch}
          handleClear={() => handleClear()}
          onClickSearch={() => onClickSearch()}
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
          rows={allEmployee}
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
