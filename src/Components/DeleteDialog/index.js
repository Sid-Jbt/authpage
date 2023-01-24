import { Grid } from '@mui/material';
import React from 'react';
import Box from '../../Elements/Box';
import Typography from '../../Elements/Typography';
import Button from '../../Elements/Button';

const DeleteDialog = ({ handleDialogClose, selectedId, deleteItem }) => (
  <>
    <Box sx={{ height: '100%' }}>
      <Grid>
        <Typography variant="button" fontWeight="bold" textTransform="capitalize" mr={10}>
          Are you sure you want to delete this ?
        </Typography>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
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
    </Box>
  </>
);

export default DeleteDialog;
