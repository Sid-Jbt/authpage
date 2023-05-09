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
import Typography from '../Typography';

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
      <DialogTitle
        sx={{
          background: (theme) => theme.palette.info.light,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          size="lg"
          sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.grey[500] }}
        >
          {dialogTitle}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Icon>
            <Close />
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>{dialogContent}</DialogContent>
      <DialogActions>{dialogAction}</DialogActions>
    </Dialog>
  );
};

export default DialogMenu;
