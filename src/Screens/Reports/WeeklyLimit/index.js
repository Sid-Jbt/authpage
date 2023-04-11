import React from 'react';
import Box from 'Elements/Box';
import { Grid } from '@mui/material';
import GradientLineChart from 'Elements/Charts/LineCharts/GradientLineChart';
import DefaultLineChart from 'Elements/Charts/LineCharts/DefaultLineChart';
import HorizontalBarChart from 'Elements/Charts/BarCharts/HorizontalBarChart';
import VerticalBarChart from 'Elements/Charts/BarCharts/VerticalBarChart';
import defaultLineChartData from './data/defaultLineChartData';
import gradientLineChartData from './data/gradientLineChartData';
import verticalBarChartData from './data/verticalBarChartData';
import horizontalBarChartData from './data/horizontalBarChartData';

const TimeActivity = () => (
  <>
    <Box mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DefaultLineChart title="Line chart" chart={defaultLineChartData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GradientLineChart title="Line chart with gradient" chart={gradientLineChartData} />
        </Grid>
      </Grid>
    </Box>
    <Box mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalBarChart title="Bar chart" chart={verticalBarChartData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <HorizontalBarChart title="Bar chart horizontal" chart={horizontalBarChartData} />
        </Grid>
      </Grid>
    </Box>
  </>
);

export default TimeActivity;
