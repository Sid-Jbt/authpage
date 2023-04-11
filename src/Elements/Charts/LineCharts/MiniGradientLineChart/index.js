import { useRef, useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Card, colors } from '@mui/material';
import gradientChartLine from 'Theme/functions/gradientChartLine';
import configs from './configs';

const MiniGradientLineChart = ({ title, description, height, chart }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  useEffect(() => {
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
          ...dataset,
          tension: 0.5,
          pointRadius: 0,
          borderWidth: 2,
          borderColor: colors[dataset.color]
            ? colors[dataset.color || 'dark'].main
            : colors.dark.main,
          fill: true,
          maxBarThickness: 6,
          backgroundColor: gradientChartLine(
            chartRef.current.children[0],
            colors[dataset.color] ? colors[dataset.color || 'dark'].main : colors.dark.main,
            0.02
          )
        }))
      : [];

    setChartData(configs(chart.labels || [], chartDatasets, chart.customTick || ' '));
  }, [chart]);

  const renderChart = (
    <>
      {title || description ? (
        <Box pt={1} px={2}>
          {title && (
            <Typography
              variant="button"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}
            </Typography>
          )}
          {description}
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
    </>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
};

MiniGradientLineChart.defaultProps = {
  title: '',
  description: '',
  height: '6.25rem'
};

export default MiniGradientLineChart;
