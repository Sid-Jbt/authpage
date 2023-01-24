import React from 'react';
import { Drawer, IconButton, useTheme } from '@mui/material';
import Typography from 'Elements/Typography';
import Box from 'Elements/Box';
import { Close } from '@mui/icons-material';

const SideDrawer = ({ children, anchor = 'right', open, onClose, title }) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width:
            window.innerWidth < theme.breakpoints.values.lg ? 'calc(100vw)' : 'calc(100vw - 70vw)',
          borderRadius: 0,
          m: 0,
          height: 'calc(100vh)',
          background: ({
            palette: {
              white: { main }
            },
            functions: { rgba }
          }) => rgba(main, 0.8),
          backdropFilter: 'blur(20px)'
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="dark" fontWeight="bold">
          {title}
        </Typography>
        <IconButton edge="end" onClick={onClose} size="medium">
          <Close />
        </IconButton>
      </Box>
      <Box sx={{ p: 2, height: '100%' }}>{children}</Box>
    </Drawer>
  );
};

export default SideDrawer;
