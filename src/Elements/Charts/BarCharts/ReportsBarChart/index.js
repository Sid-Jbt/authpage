import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Card, Grid } from '@mui/material';
import BarReportsChartItem from './ReportsBarChartItem';
import configs from './configs';

const ReportsBarChart = ({ color, title, description, chart, items }) => {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderItems = items.map(({ icon, label, progress }) => (
    <Grid item xs={6} sm={3} key={label}>
      <BarReportsChartItem
        color={color}
        icon={{ color: icon.color, component: icon.component }}
        label={label}
        progress={{ content: progress.content, percentage: progress.percentage }}
      />
    </Grid>
  ));

  return (
    <Card sx={{ height: '100%' }}>
      <Box padding="1rem">
        {useMemo(
          () => (
            <Box
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              py={2}
              pr={0.5}
              mb={3}
              height="12.5rem"
            >
              <Bar data={data} options={options} />
            </Box>
          ),
          [chart, color]
        )}
        <Box px={1}>
          <Box mb={2}>
            <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
              {title}
            </Typography>
            <Typography component="div" variant="button" color="text" fontWeight="regular">
              {description}
            </Typography>
          </Box>
          <Box py={1} px={0.5}>
            <Grid container spacing={2}>
              {renderItems}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

ReportsBarChart.defaultProps = {
  color: 'dark',
  description: '',
  items: []
};

export default ReportsBarChart;
