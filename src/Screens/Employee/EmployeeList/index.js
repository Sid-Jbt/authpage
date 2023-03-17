import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Icon, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import Select from 'Elements/Select';
import { Roles } from 'Helpers/Global';
import { useNavigate, useOutletContext } from 'react-router';
import { getEmployeeDetailsPattern } from 'Routes/routeConfig';
import AddEmployeeForm from './AddEmployeeForm';
import employeeListData from './data/employeeListData';
import withStateDispatch from '../../../Helpers/withStateDispatch';

const EmployeeList = ({ GetEmployeeAdd, GetEmployeeList, Loading }) => {
  const { role } = useOutletContext();
  const { columns: prCols } = employeeListData;
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [allEmployee, setAllEmployee] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [sort, setSort] = useState({ key: 'email', order: 'asc' });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (!isDialogOpen) {
      GetEmployeeList(
        {
          limit,
          startDate,
          endDate,
          role: selectedRole.value,
          search,
          page,
          sortKey: sort.key,
          sortOrder: sort.order
        },
        (res) => {
          if (res && res.data && res.data.data) {
            setAllEmployee(res.data.data.rows);
            setEmployeeCount(res.data.data.count);
            setFilter(false);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, filter, page, sort]);

  // After clear need to call GetEmployeeList
  const handleClear = () => {
    setEndDate('');
    setStartDate('');
    setSelectedRole('');
    setSearch('');
    setFilter(false);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {role === 'admin' ? (
          <>
            <Grid item xs="auto">
              <Button
                color="white"
                variant="outlined"
                size="small"
                onClick={() => setIsDialogOpen(true)}
              >
                <Icon sx={{ mr: 1 }}>
                  <Add />
                </Icon>
                Add
              </Button>
            </Grid>
            {/* <Grid item xs="auto">
              <Button color="white" variant="outlined" size="small" onClick={onClickExport}>
                <Icon sx={{ mr: 1 }}>
                  <ImportExportRounded />
                </Icon>
                Export
              </Button>
            </Grid> */}
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
          handleSearch={(e) => setSearch(e.target.value.trim())}
          handleClear={handleClear}
          onClickSearch={() => {
            setFilter(!filter);
          }}
        >
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
              value={startDate !== '' ? startDate : ''}
              onChange={(e) => setStartDate(e.target.value)}
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
              inputProps={{
                min: startDate
              }}
              value={endDate !== '' ? endDate : ''}
              onChange={(e) => setEndDate(e.target.value)}
              errorFalse
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Role</FormLabel>
              <Select
                value={selectedRole}
                options={Roles}
                onChange={(value) => setSelectedRole(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>
        <Table
          columns={prCols}
          rows={allEmployee}
          onClickAction={(key, value) =>
            key === 'edit' && navigate(getEmployeeDetailsPattern(value.id))
          }
          rowsCount={employeeCount}
          isAction
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'Delete', value: 'delete' }
          ]}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, orderKey, orderName) =>
            setSort({ order: orderName, key: orderKey })
          }
        />
        <AddEmployeeForm
          GetEmployeeAdd={GetEmployeeAdd}
          isDialogOpen={isDialogOpen}
          handleDialog={() => setIsDialogOpen(false)}
          Loading={Loading}
        />
      </Card>
    </>
  );
};

export default withStateDispatch(EmployeeList);
