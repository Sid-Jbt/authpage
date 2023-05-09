import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import colors from 'Theme/base/colors';
import { Card } from '@mui/material';
import configs from './configs';

const HorizontalBarChart = ({ title, description, height, chart }) => {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: colors[dataset.color]
          ? colors[dataset.color || 'dark'].main
          : colors.dark.main,
        fill: false,
        maxBarThickness: 35
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <Box p={2}>
      {title || description ? (
        <Box px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <Box mb={1}>
              <Typography variant="h6">{title}</Typography>
            </Box>
          )}
          <Box mb={2}>
            <Typography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </Typography>
          </Box>
        </Box>
      ) : null}
      {useMemo(
        () => (
          <Box height={height}>
            <Bar data={data} options={options} />
          </Box>
        ),
        [chart, height]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
};

HorizontalBarChart.defaultProps = {
  title: '',
  description: '',
  height: '19.125rem'
};

export default HorizontalBarChart;
