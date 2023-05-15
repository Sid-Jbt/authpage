import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import ComplexReportsDoughnutChartItem from './ComplexReportsDoughnutChartItem';
import configs from './configs';

const ComplexReportsDoughnutChart = ({ title, chart, tooltip, action }) => {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderItems = chart.labels
    ? chart.labels.map((label, key) => (
        <ComplexReportsDoughnutChartItem
          image={chart.images && chart.images[key]}
          title={label}
          key={label}
          percentage={`${chart.datasets && chart.datasets.data ? chart.datasets.data[key] : 0}%`}
          hasBorder={key !== chart.labels.length - 1}
        />
      ))
    : null;

  const renderButton = () => {
    let template;

    if (action) {
      template =
        action.type === 'internal' ? (
          <Box mt={3} mb={2}>
            <Button
              component={Link}
              to={action.route}
              variant="gradient"
              color={action.color}
              size="small"
            >
              {action.label}
            </Button>
          </Box>
        ) : (
          <Box mt={3} mb={2}>
            <Button
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="gradient"
              color={action.color}
              size="small"
            >
              {action.label}
            </Button>
          </Box>
        );
    }

    return template;
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h6">{title}</Typography>
        <Tooltip title={tooltip} placement="right">
          <Button variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </Button>
        </Tooltip>
      </Box>
      <Box position="relative" p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5} sx={{ textAlign: 'center' }}>
            <Box height="100%" display="flex" flexDirection="column">
              <Box height="100%" mt={5} mx={1}>
                {useMemo(
                  () => (
                    <Doughnut data={data} options={options} />
                  ),
                  [chart]
                )}
              </Box>
              {renderButton()}
            </Box>
          </Grid>
          <Grid item xs={12} lg={7}>
            {useMemo(() => renderItems, [chart])}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ComplexReportsDoughnutChart.defaultProps = {
  tooltip: '',
  action: false
};

export default ComplexReportsDoughnutChart;
