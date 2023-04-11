import React from 'react';
import Box from 'Elements/Box';
import Typography from '../../../Elements/Typography';

const TimeActivity = () => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
    <Box sx={{ border: 3, borderColor: 'red' }}>
      <Typography variant="h6" fontWeight="regular" color="white" mb={1}>
        TIME
      </Typography>
      <Typography variant="h6" fontWeight="regular" color="white" mb={1}>
        55:14:26
      </Typography>
    </Box>
    <Box sx={{ border: 3, borderColor: 'red' }}>
      <Typography variant="h6" fontWeight="regular" color="white" mb={1}>
        TIME
      </Typography>
      <Typography variant="h6" fontWeight="regular" color="white" mb={1}>
        55:14:26
      </Typography>
    </Box>
    <Box sx={{ border: 3, borderColor: 'red' }}>
      <Typography variant="h6" fontWeight="regular" color="white" mb={1}>
        TIME
      </Typography>
      <Typography variant="h6" fontWeight="regular" color="white" mb={1}>
        55:14:26
      </Typography>
    </Box>
  </Box>
);
export default TimeActivity;
