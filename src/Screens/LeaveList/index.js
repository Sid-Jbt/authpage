import React from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Typography from 'Elements/Typography';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, Vaccines, CalendarMonth, Celebration } from '@mui/icons-material';
import DetailedStatisticsCard from 'Components/CardLayout';
import leaveListData from './data/leaveListData';

const LeaveList = () => {
  const { columns: prCols, rows: prRows } = leaveListData;

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <DetailedStatisticsCard
            title="Total Leave"
            count="12"
            icon={{ color: 'info', component: <CalendarMonth /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DetailedStatisticsCard
            title="Medical Leave"
            count="3"
            icon={{ color: 'warning', component: <Vaccines /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DetailedStatisticsCard
            title="Other Leave"
            count="4"
            icon={{ color: 'primary', component: <Celebration /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DetailedStatisticsCard
            title="Remaining Leave"
            count="5"
            icon={{ color: 'success', component: <DirectionsRun /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>
      <Card
        mb={3}
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <Grid container alignItems="center" spacing={2} p={2} pb={2}>
          <Grid container item sm={12} alignItems="center" justifyContent="space-between">
            <Grid item xs={6}>
              <Typography variant="h3">Leaves</Typography>
            </Grid>
            <Grid container item xs={6} justifyContent="end" sx={{ gap: 2 }}>
              <Button color="info" variant="contained" size="small">
                <Icon>
                  <Add />
                </Icon>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Table columns={prCols} rows={prRows} />
      </Card>
    </>
  );
};

export default LeaveList;
