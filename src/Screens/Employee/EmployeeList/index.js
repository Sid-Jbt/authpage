import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Icon, Grid } from '@mui/material';
import { Add, EditOutlined, PersonOffRounded, PersonRounded } from '@mui/icons-material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import Select from 'Elements/Select';
import { Roles } from 'Helpers/Global';
import { useNavigate, useOutletContext } from 'react-router';
import { getEmployeeDetailsPattern } from 'Routes/routeConfig';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import AddEmployeeForm from './AddEmployeeForm';
import employeeListData from './data/employeeListData';

const EmployeeList = () => {
  const { role, GetEmployeeAdd, GetEmployeeList, GetEmployeeDisable, Loading } = useOutletContext();
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
  const [selectedData, setSelectedData] = useState(null);
  const [isActiveDialogOpen, setIsActiveDialogOpen] = useState(false);

  useEffect(() => {
    if (!isDialogOpen || !isActiveDialogOpen) {
      GetEmployeeList(
        {
          limit: isNaN(limit) ? 0 : limit,
          startDate,
          endDate,
          role: selectedRole.value,
          search,
          page,
          sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
          sortOrder: sort.order
        },
        (res) => {
          if (res && res.data && res.data.data) {
            setAllEmployee(res.data.data.rows);
            setEmployeeCount(res.data.data.count);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, isActiveDialogOpen, filter, page, sort, limit]);

  const handleClear = () => {
    setEndDate('');
    setStartDate('');
    setSelectedRole('');
    setSearch('');
    setFilter(!filter);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {role === 'admin' ? (
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
          handleSearch={(e) => setSearch(e.target.value)}
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
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Role</FormLabel>
              <Select
                size="small"
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
          rowsCount={employeeCount}
          onClickAction={(key, value) => {
            setSelectedData({
              action: key === 'deactivate' ? 0 : 1,
              id: value.id,
              diaLogTitle: value.employee !== ' ' ? value.employee : value.email
            });
            setIsActiveDialogOpen(!!(key === 'deactivate' || key === 'activate'));
            if (key === 'edit') {
              navigate(getEmployeeDetailsPattern(value.slug), { state: { slug: value.slug } });
            }
          }}
          isView={[
            {
              name: 2,
              tooltip: 'Edit',
              color: 'info',
              icon: <EditOutlined />,
              value: 'edit'
            },
            {
              name: 1,
              tooltip: 'Click to enable',
              color: 'error',
              icon: <PersonOffRounded />,
              value: 'deactivate'
            },
            {
              name: 0,
              tooltip: 'Click to disable',
              color: 'success',
              icon: <PersonRounded />,
              value: 'activate'
            }
          ]}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={isNaN(limit) ? employeeCount : limit}
          onRowsPerPageChange={(rowsPerPage) => setLimit(rowsPerPage)}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
        />
        <AddEmployeeForm
          GetEmployeeAdd={GetEmployeeAdd}
          isDialogOpen={isDialogOpen}
          handleDialog={() => setIsDialogOpen(false)}
          Loading={Loading}
        />

        {isActiveDialogOpen && (
          <DialogMenu
            isOpen={isActiveDialogOpen}
            onClose={() => setIsActiveDialogOpen(false)}
            dialogTitle={selectedData.diaLogTitle}
            dialogContent={
              <DialogContent
                content={`Are you sure you want to ${
                  selectedData.action === 0 ? 'enable' : 'disable'
                } this account?`}
              />
            }
            dialogAction={
              <DialogAction
                approveTitle="Yes"
                rejectTitle="No"
                approveColor="error"
                rejectColor="info"
                handleReject={() => setIsActiveDialogOpen(false)}
                handleApprove={() =>
                  GetEmployeeDisable(selectedData, () => {
                    setIsActiveDialogOpen(false);
                  })
                }
              />
            }
          />
        )}
      </Card>
    </>
  );
};

export default EmployeeList;
