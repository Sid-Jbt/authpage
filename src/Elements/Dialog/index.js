import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Slide
} from '@mui/material';
import { Close } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const DialogMenu = ({ isOpen, onClose, dialogTitle, dialogActions, dialogContent }) => (
  <Dialog
    fullScreen
    open={isOpen}
    onClose
    TransitionComponent={Transition}
    sx={{ width: '20%', marginLeft: 'auto', background: 'white', height: '100%' }}
  >
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
    <DialogActions>{dialogActions}</DialogActions>
  </Dialog>
);

export default DialogMenu;
