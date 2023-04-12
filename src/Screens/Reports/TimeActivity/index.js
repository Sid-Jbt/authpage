import React from 'react';
import { Card, Grid } from '@mui/material';
import StaticCard from 'Components/CardLayouts/StaticCard';
import DefaultLineChart from 'Elements/Charts/LineCharts/DefaultLineChart';
import FilterLayout from 'Components/FilterLayout';
import Input from 'Elements/Input';
import Table from 'Elements/Tables/Table';
import { GraphicEqOutlined } from '@mui/icons-material';
import { timeActivityListData } from 'StaticData/timeActivityListData';
import { defaultLineChartData } from 'StaticData/defaultLineChartData';

const TimeActivity = () => {
  const { columns: prCols } = timeActivityListData;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <StaticCard title="Time" count="01:00:00" icon={false} isPercentage={false} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StaticCard title="Avg. Activity" count="41%" icon={false} isPercentage={false} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StaticCard title="Graph" count={false} icon={<GraphicEqOutlined />} isPercentage={false} />
      </Grid>
      <Grid item xs={12}>
        <DefaultLineChart title="Line chart" chart={defaultLineChartData} />
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            background: ({ palette: { grey } }) => grey[100],
            borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            boxShadow: ({ boxShadows: { md } }) => md
          }}
        >
          <FilterLayout>
            <Grid item xs={6} md={4} lg={3}>
              <Input
                type="date"
                label="From Date"
                size="small"
                fullWidth
                id="fromDate"
                name="fromDate"
              />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <Input type="date" label="To Date" size="small" fullWidth id="toDate" name="toDate" />
            </Grid>
          </FilterLayout>
          <Table columns={prCols} rows={[]} rowsCount={0} initialPage={0} rowsPerPage={10} />
        </Card>
      </Grid>
    </Grid>
  );
};
export default TimeActivity;
