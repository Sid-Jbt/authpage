import { Grid } from '@mui/material';
import React from 'react';
import Box from '../../Elements/Box';
import Typography from '../../Elements/Typography';
import Button from '../../Elements/Button';

export const DialogContent = ({ content, customContent }) =>
  customContent || (
    <Box sx={{ height: '100%' }}>
      <Grid>
        <Typography variant="button" fontWeight="bold" mr={10}>
          {content}
        </Typography>
      </Grid>
    </Box>
  );

export const DialogAction = ({
  handleReject,
  handleApprove,
  approveTitle,
  rejectTitle,
  approveColor = 'info',
  rejectColor = 'error'
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'right',
      justifyContent: 'right',
      textAlign: 'end',
      mt: 3
    }}
  >
    <Button
      type="submit"
      color={rejectColor}
      variant="contained"
      size="small"
      sx={{ marginRight: '10px' }}
      onClick={handleReject}
    >
      {rejectTitle}
    </Button>
    <Button
      type="submit"
      color={approveColor}
      variant="contained"
      size="small"
      onClick={handleApprove}
    >
      {approveTitle}
    </Button>
  </Box>
);
