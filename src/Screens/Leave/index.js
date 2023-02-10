import React, { useState } from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import {
  ApprovalRounded,
  Add,
  DirectionsRun,
  Vaccines,
  CalendarMonth,
  Celebration,
  PendingActionsRounded,
  TimeToLeaveRounded
} from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/StaticCard';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import { useSelector } from 'react-redux';
import leaveListData from './data/leaveListData';
import AddLeaveForm from './AddLeaveForm';

const LeaveList = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = leaveListData;
  const { role } = useSelector((state) => state.route);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search, setSearch] = useState('');

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const onClickAction = (key, index) => {
    if (key === 'edit') {
      setSelectedData(prRows.find((o) => o.id === index));
      setIsDialogOpen(!isDialogOpen);
    }
  };

  const handleChangeStartDate = (event, string) => {
    if (string === 'fromDate') {
      setFromDate(event.target.value);
    } else {
      setToDate(event.target.value);
    }
  };

  const handleChangeSearch = (event) => {
    setSearch(event);
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    setSearch('');
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        {role === 'admin' ? (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Total Request"
                count="5"
                icon={{ color: 'info', component: <TimeToLeaveRounded /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Total Approved"
                count="3"
                icon={{ color: 'success', component: <ApprovalRounded /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Total Pending"
                count="2"
                icon={{ color: 'warning', component: <PendingActionsRounded /> }}
                isPercentage={false}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Total Leave"
                count="12"
                icon={{ color: 'info', component: <CalendarMonth /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Medical Leave"
                count="3"
                icon={{ color: 'warning', component: <Vaccines /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Other Leave"
                count="4"
                icon={{ color: 'primary', component: <Celebration /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Remaining Leave"
                count="5"
                icon={{ color: 'success', component: <DirectionsRun /> }}
                isPercentage={false}
              />
            </Grid>
          </>
        )}
      </Grid>
      {role !== 'admin' && (
        <>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
            <Grid item xs="auto">
              <Button
                sx={({ breakpoints, palette: { dark } }) => ({
                  [breakpoints.down('xl' && 'lg')]: {
                    color: dark.main,
                    borderColor: dark.main
                  }
                })}
                variant="outlined"
                size="small"
                onClick={() => handleDialog()}
              >
                <Icon sx={{ mr: 1 }}>
                  <Add />
                </Icon>
                Apply
              </Button>
            </Grid>
          </Grid>
        </>
      )}

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
        </FilterLayout>
        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={prRows}
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'Delete', value: 'delete' }
          ]}
        />
        {isDialogOpen && (
          <AddLeaveForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => handleDialog()}
            selectedData={selectedData}
            setSelectedData={(value) => setSelectedData(value)}
          />
        )}
      </Card>
    </>
  );
};

export default LeaveList;
