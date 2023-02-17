import { Drawer, styled } from '@mui/material';

export default styled(Drawer)(({ theme, ownerState }) => {
  const { palette, boxShadows, transitions, breakpoints, functions } = theme;
  const { darkSidenav, miniSidenav } = ownerState;

  const sidebarWidth = 256;
  const { white, transparent } = palette;
  const { xxl } = boxShadows;
  const { pxToRem } = functions;

  const bgColor = white.main;

  const drawerOpenStyles = () => ({
    transform: 'translateX(0)',
    transition: transitions.create('transform', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter
    }),
    backgroundColor: bgColor,
    boxShadow: darkSidenav ? 'none' : xxl,
    marginBottom: darkSidenav ? 0 : 'inherit',
    left: '0',
    [breakpoints.down('sm')]: {
      height: 'calc(100vh - 6rem)'
    },
    [breakpoints.up('xs')]: {
      top: 65,
      transform: 'translateX(0)',
      width: 'calc(100vw - 2rem)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    },
    [breakpoints.up('md')]: {
      top: 65,
      width: 'calc(100vw - 50vw)',
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    },
    [breakpoints.up('lg')]: {
      top: 65,
      width: sidebarWidth,
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    },
    [breakpoints.up('xl')]: {
      top: 0,
      width: sidebarWidth,
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    }
  });

  const drawerCloseStyles = () => ({
    transform: `translateX(${pxToRem(-320)})`,
    transition: transitions.create('transform', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter
    }),
    backgroundColor: bgColor,
    boxShadow: darkSidenav ? 'none' : xxl,
    marginBottom: darkSidenav ? 0 : 'inherit',
    left: '0',
    [breakpoints.up('xs')]: {
      width: 0,
      top: 65,
      overflowX: 'hidden',
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter
      })
    },
    [breakpoints.up('xl')]: {
      top: 0,
      width: pxToRem(96),
      overflowX: 'hidden',
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter
      })
    }
  });

  return {
    '& .MuiDrawer-paper': {
      boxShadow: xxl,
      border: 'none',
      height: 'calc(100vh - 2rem)',
      margin: pxToRem(20),
      borderRadius: pxToRem(8),
      backgroundColor: transparent.main,
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles())
    }
  };
});
