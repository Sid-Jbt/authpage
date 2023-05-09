import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Card } from '@mui/material';
import colors from 'Theme/base/colors';
import configs from './configs';

const DefaultLineChart = ({ title, description, height, chart }) => {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 2,
        pointBackgroundColor: colors[dataset.color]
          ? colors[dataset.color || 'dark'].main
          : colors.dark.main,
        borderColor: colors[dataset.color]
          ? colors[dataset.color || 'dark'].main
          : colors.dark.main,
        maxBarThickness: 6
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
            <Line data={data} options={options} />
          </Box>
        ),
        [chart, height]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
};

DefaultLineChart.defaultProps = {
  title: '',
  description: '',
  height: '19.125rem'
};

export default DefaultLineChart;
