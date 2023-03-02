import { Box, CircularProgress, circularProgressClasses, Tooltip } from '@mui/material';
import Typography from 'Elements/Typography';
import { useSelector } from 'react-redux';

const CircularProgressWithLabel = (props) => {
  const { currentUser } = useSelector((state) => state.route);

  return (
    <Tooltip title={`Your Profile is ${currentUser.profilePercentage}% completed`}>
      <Box sx={{ position: 'relative', display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) => theme.palette.grey[800]
          }}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          disableShrink
          sx={{
            color: (theme) => theme.palette.success.light,
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round'
            }
          }}
          size={40}
          thickness={4}
          {...props}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default CircularProgressWithLabel;
