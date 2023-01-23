import React from 'react';
import { Dialog, DialogContent, DialogTitle, Icon, IconButton, Slide } from '@mui/material';
import { Close } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogMenu = ({ isOpen, onClose, dialogTitle, dialogContent }) => (
  <Dialog open={isOpen} onClose TransitionComponent={Transition}>
    <DialogTitle>
      {dialogTitle}
      {isOpen && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Icon>
            <Close />
          </Icon>
        </IconButton>
      )}
    </DialogTitle>
    <DialogContent>{dialogContent}</DialogContent>
  </Dialog>
);

export default DialogMenu;
