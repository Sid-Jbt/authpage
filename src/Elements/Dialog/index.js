import React from 'react';
import { Drawer, Slide } from '@mui/material';
import Typography from 'Elements/Typography';
import Box from 'Elements/Box';

const DialogMenu = ({ children, anchor = 'right', open, onClose, title }) => (
  <Drawer
    anchor={anchor}
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: 500,
        borderRadius: 0,
        m: 0,
        height: '100%',
        p: 2,
        pt: 4
      }
    }}
  >
    <Typography variant="h3" color="dark">
      {title}
    </Typography>
    <Box sx={{ mt: 2 }}>{children}</Box>
  </Drawer>
);

export default DialogMenu;
