import React, { useState } from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, Vaccines, CalendarMonth, Celebration } from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/LeaveCard';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import leaveListData from '../data/leaveListData';
import AddLeaveForm from './AddLeaveForm';

const LeaveList = () => {
  const { columns: prCols, rows: prRows } = leaveListData;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
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
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        <Grid item xs={12} md="auto">
          <Button
            sx={({ breakpoints, palette: { dark } }) => ({
              [breakpoints.down('xl' && 'lg')]: {
                color: dark.main,
                borderColor: dark.main
              }
            })}
            variant="outlined"
            size="small"
            onClick={handleDialog}
          >
            <Icon sx={{ mr: 1 }}>
              <Add />
            </Icon>
            Apply
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
        </FilterLayout>
        <Table columns={prCols} rows={prRows} />
        <AddLeaveForm isDialogOpen={isDialogOpen} handleDialog={handleDialog} />
      </Card>
    </>
  );
};

export default LeaveList;
