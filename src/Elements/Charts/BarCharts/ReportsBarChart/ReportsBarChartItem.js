import typography from 'Theme/base/typography';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Progress from 'Elements/Progress';
import { Icon } from '@mui/material';

const ReportsBarChartItem = ({ color, icon, label, progress }) => {
  const { size } = typography;

  return (
    <Box width="100%">
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          bgColor={icon.color}
          width="1.25rem"
          height="1.25rem"
          borderRadius="sm"
          color="white"
          fontSize={size.xs}
          display="flex"
          justifyContent="center"
          alignItems="center"
          shadow="md"
          mr={1}
          variant="gradient"
        >
          <Icon>{icon.component}</Icon>
        </Box>
        <Typography variant="caption" textTransform="capitalize" fontWeight="medium" color="text">
          {label}
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant="h4" fontWeight="bold" color={color}>
          {progress.content}
        </Typography>
        <Box width="75%" mt={0.5}>
          <Progress value={progress.percentage} color={color} />
        </Box>
      </Box>
    </Box>
  );
};

ReportsBarChartItem.defaultProps = {
  color: 'dark'
};

export default ReportsBarChartItem;
