import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { MenuOutlined, InboxOutlined, MailOutline } from '@mui/icons-material';
import { Outlet } from 'react-router';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  margin: 15,
  borderRadius: 10,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  margin: 15,
  borderRadius: 10,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const SideDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

const MiniDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundImage: `linear-gradient(180deg, ${theme.palette.colors.gradients.primary.main} 35%, ${theme.palette.colors.background.default} 35%)`
      }}
    >
      <SideDrawer
        variant="permanent"
        open={open}
        PaperProps={{
          elevation: 20
        }}
      >
        {/* Large and small Logo */}
        <DrawerHeader sx={{ justifyContent: 'center' }}>LOGO</DrawerHeader>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SideDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0 }}>
        <DrawerHeader sx={{ paddingLeft: 0 }}>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawer} edge="start">
            <MenuOutlined />
          </IconButton>
        </DrawerHeader>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MiniDrawer;
