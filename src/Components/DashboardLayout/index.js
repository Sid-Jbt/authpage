import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  ListItemButton
} from '@mui/material';
import { DashboardCustomizeTwoTone, LoginTwoTone, Menu, MenuOpen } from '@mui/icons-material';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const drawerWidth = 256;

const openedMixin = (theme) => ({
  width: drawerWidth,
  height: 'calc(100vh - 2rem)',
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
  height: 'calc(100vh - 2rem)',
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
    height: 'calc(100vh - 2rem)',
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

const DashboardLayout = () => {
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
        backgroundImage: `linear-gradient(180deg, ${theme.palette.colors.gradients.primary.main} 300px, ${theme.palette.colors.background.default} 35%)`
      }}
    >
      <SideDrawer
        variant="permanent"
        open={open}
        PaperProps={{
          elevation: 10
        }}
      >
        {/* Large and small Logo */}
        <DrawerHeader sx={{ justifyContent: 'center', color: 'black' }}>LOGO</DrawerHeader>
        <Divider sx={{ width: '60%', marginRight: 'auto', marginLeft: 'auto' }} />
        <List sx={{ m: 1 }}>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={window.location.pathname === '/dashboard'}
            disableGutters
            sx={{ borderRadius: 2, pl: 1.5, marginBottom: 1 }}
          >
            <ListItemIcon>
              <DashboardCustomizeTwoTone />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="button">Dashboard</Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/"
            selected={window.location.pathname === '/'}
            disableGutters
            sx={{ borderRadius: 2, pl: 1.5, marginBottom: 1 }}
          >
            <ListItemIcon>
              <LoginTwoTone />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="button">Login</Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </SideDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0, width: '100vw' }}>
        <DrawerHeader sx={{ paddingLeft: 0 }}>
          {open ? (
            <Menu cursor="pointer" onClick={handleDrawer} />
          ) : (
            <MenuOpen cursor="pointer" onClick={handleDrawer} />
          )}
        </DrawerHeader>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
