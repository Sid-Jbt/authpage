import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import BadgeDot from 'Elements/BadgeDot';
import configs from './config';

const ProgressDoughnutChart = ({ color, icon, title, count, height, chart }) => {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderBadgeDots = chart.labels
    ? chart.labels.map((label, index) => {
        const badgeDotKey = `badge-dot-${index}`;

        return (
          <BadgeDot
            key={badgeDotKey}
            variant="gradient"
            color={
              chart.datasets.backgroundColors ? chart.datasets.backgroundColors[index] : 'info'
            }
            size="xs"
            badgeContent={label}
            font={{ color: 'text', weight: 'medium' }}
            px={0}
          />
        );
      })
    : null;

  return (
    <Card>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" pt={2} px={2}>
        <Box width="45%">
          <Box display="flex" alignItems="center">
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
              <Typography
                variant="button"
                fontWeight="medium"
                textTransform="capitalize"
                color="text"
              >
                {title}
              </Typography>
              {count ? (
                <Typography variant="h5" fontWeight="bold">
                  {count}
                </Typography>
              ) : null}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" mt={2}>
            {renderBadgeDots}
          </Box>
        </Box>
        {useMemo(
          () => (
            <Box width="55%" mb={2}>
              <Doughnut data={data} options={options} sx={{ height }} />
            </Box>
          ),
          [chart, height]
        )}
      </Box>
    </Card>
  );
};

ProgressDoughnutChart.defaultProps = {
  color: 'info',
  count: 0,
  height: '100%'
};

export default ProgressDoughnutChart;
