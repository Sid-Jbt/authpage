import { useRef, useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import colors from 'Theme/base/colors';
import gradientChartLine from 'Theme/functions/gradientChartLine';
import { Card } from '@mui/material';
import configs from './configs';

const GradientLineChart = ({ title, description, height, chart }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  useEffect(() => {
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
          ...dataset,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 3,
          borderColor: colors[dataset.color]
            ? colors[dataset.color || 'dark'].main
            : colors.dark.main,
          fill: true,
          maxBarThickness: 6,
          backgroundColor: gradientChartLine(
            chartRef.current.children[0],
            colors[dataset.color] ? colors[dataset.color || 'dark'].main : colors.dark.main
          )
        }))
      : [];

    setChartData(configs(chart.labels || [], chartDatasets));
  }, [chart]);

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
          <Box ref={chartRef} sx={{ height }}>
            <Line data={data} options={options} />
          </Box>
        ),
        [chartData, height]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
};

GradientLineChart.defaultProps = {
  title: '',
  description: '',
  height: '19.125rem'
};

export default GradientLineChart;
