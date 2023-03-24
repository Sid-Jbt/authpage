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
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMenu = ({ isOpen, onClose, dialogTitle, dialogContent, dialogAction }) => {
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick' && 'escapeKeyDown') return;
    onClose();
  };

  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={handleClose}
      TransitionComponent={Transition}
      scroll="paper"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ textTransform: 'capitalize' }}>
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
      <DialogActions>{dialogAction}</DialogActions>
    </Dialog>
  );
};

export default DialogMenu;
