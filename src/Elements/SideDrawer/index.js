import React from 'react';
import { Drawer, Grid } from '@mui/material';
import Typography from 'Elements/Typography';
import Box from 'Elements/Box';

const SideDrawer = ({ children, anchor = 'right', open, onClose, title }) => (
  <Drawer
    anchor={anchor}
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: '100vw',
        borderRadius: 0,
        m: 0,
        height: '100%',
        p: 2
      }
    }}
  >
    <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h4" color="dark" xs={6}>
        {title}
      </Typography>
      <Typography variant="h4" color="dark" xs={6}>
        x
      </Typography>
    </Grid>

    <Box sx={{ mt: 2 }}>{children}</Box>
  </Drawer>
);

export default SideDrawer;
