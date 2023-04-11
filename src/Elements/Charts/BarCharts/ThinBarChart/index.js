import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Card } from '@mui/material';
import configs from './configs';

const ThinBarChart = ({ color, title, height, chart }) => {
  const { data, options } = configs(color, chart.labels || [], chart.datasets || {});

  const renderChart = (
    <Box p={2}>
      {title && (
        <Box mb={1}>
          <Typography variant="h6" color={color}>
            {title}
          </Typography>
        </Box>
      )}
      {useMemo(
        () => (
          <Box height={height} pt={2}>
            <Bar data={data} options={options} />
          </Box>
        ),
        [chart, height]
      )}
    </Box>
  );

  return title ? <Card>{renderChart}</Card> : renderChart;
};

ThinBarChart.defaultProps = {
  color: 'dark',
  title: '',
  height: '12.5rem'
};

export default ThinBarChart;
