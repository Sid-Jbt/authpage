import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Progess from 'Elements/Progess';
import { Card, Icon } from '@mui/material';
import configs from './config';

const ProgressLineChart = ({ color, icon, title, count, progress, height, chart }) => {
  const { data, options } = configs(color, chart.labels || [], title, chart.data || []);

  return (
    <Card>
      <Box display="flex" alignItems="center" pt={2} px={2}>
        <Box
          width="3rem"
          height="3rem"
          display="grid"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          shadow="md"
          color="white"
          bgColor={color}
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </Box>
        <Box ml={2} lineHeight={1}>
          <Typography variant="button" fontWeight="medium" textTransform="capitalize" color="text">
            {title}
          </Typography>
          {count ? (
            <Typography variant="h5" fontWeight="bold">
              {count}
            </Typography>
          ) : null}
        </Box>
        <Box width="25%" ml="auto">
          <Typography display="block" variant="caption" fontWeight="medium" color="text">
            {progress}%
          </Typography>
          <Box mt={0.25}>
            <Progess variant="gradient" color={color} value={progress} sx={{ height: '8px' }} />
          </Box>
        </Box>
      </Box>
      {useMemo(
        () => (
          <Box mt={2}>
            <Line data={data} options={options} style={{ height }} />
          </Box>
        ),
        [chart, height, color]
      )}
    </Card>
  );
};

ProgressLineChart.defaultProps = {
  color: 'info',
  count: 0,
  height: '6.25rem'
};

export default ProgressLineChart;
