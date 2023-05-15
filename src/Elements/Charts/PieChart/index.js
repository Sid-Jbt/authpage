import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import configs from 'examples/Charts/PieChart/configs';

const PieChart = ({ title, description, height, chart }) => {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

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
            <Pie data={data} options={options} />
          </Box>
        ),
        [chart, height]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
};

PieChart.defaultProps = {
  title: '',
  description: '',
  height: '19.125rem'
};

export default PieChart;
