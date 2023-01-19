import React from 'react';
import { Drawer, Slide } from '@mui/material';
import Typography from 'Elements/Typography';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

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
        height: '100%'
      }
    }}
  >
    <Typography variant="h4" sx={{ p: 1, ml: 1 }}>
      {title}
    </Typography>
    {children}
  </Drawer>
);

export default DialogMenu;
