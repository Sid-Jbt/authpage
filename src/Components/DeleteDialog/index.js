import { Grid } from '@mui/material';
import React from 'react';
import Box from '../../Elements/Box';
import Typography from '../../Elements/Typography';
import Button from '../../Elements/Button';

export const DeleteDialogContent = ({ content }) => (
  <Box sx={{ height: '100%' }}>
    <Grid>
      <Typography variant="button" fontWeight="bold" mr={10}>
        {content}
      </Typography>
    </Grid>
  </Box>
);

export const DeleteDialogAction = ({ handleDialogClose, selectedId, deleteItem }) => (
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
      color="error"
      variant="contained"
      size="small"
      sx={{ marginRight: '10px' }}
      onClick={handleDialogClose}
    >
      Cancel
    </Button>
    <Button
      type="submit"
      color="info"
      variant="contained"
      size="small"
      onClick={() => deleteItem(selectedId)}
    >
      Delete
    </Button>
  </Box>
);
