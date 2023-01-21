import React from 'react';
import { Drawer } from '@mui/material';
import Typography from 'Elements/Typography';
import Box from 'Elements/Box';

const SideDrawer = ({ children, anchor = 'right', open, onClose, title }) => (
  <Drawer
    anchor={anchor}
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: 500,
        borderRadius: 0,
        m: 0,
        height: '100%'
      }
    }}
  >
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" color="dark" fontWeight="bold">
        {title}
      </Typography>
    </Box>
    <Box sx={{ p: 2, background: ({ palette: { grey } }) => grey[100], height: '100%' }}>
      {children}
    </Box>
  </Drawer>
);

export default SideDrawer;
