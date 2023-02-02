import React from 'react';
import { Card } from '@mui/material';
import Box from 'Elements/Box';
import Typography from '../../Elements/Typography';

export const NoticeBoard = () => (
  <Card>
    <Box p={3} pb={0}>
      <Typography variant="h5">Notice Board Coming soon...</Typography>
    </Box>
  </Card>
);

export default NoticeBoard;
