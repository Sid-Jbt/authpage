import { AppBar, Icon, IconButton, Menu, Toolbar } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useLocation, Link } from 'react-router-dom';

import Box from 'Elements/Box';
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu
} from './styles';

// eslint-disable-next-line arrow-body-style
const DashboardNavbar = ({ absolute, light, isMini }) => {
  //   const [navbarType, setNavbarType] = useState('static');
  const customization = useSelector((state) => state.customization);
  const [openMenu, setOpenMenu] = useState(false);
  //   const route = useLocation().pathname.split('/').slice(1);

  //   const handleMiniSidenav = () => setMiniSidenav(dispatch, !customization.opened);
  //   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  //   const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      Item
    </Menu>
  );

  return (
    <AppBar position="absolute" color="inherit" sx={(theme) => navbar(theme, { absolute, light })}>
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <Box color="white" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          {/* <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={transparentNavbar ? light : false}
          /> */}
          <Icon fontSize="medium" sx={navbarDesktopMenu}>
            {!customization.opened ? 'menu_open' : 'menu'}
          </Icon>
        </Box>
        {isMini ? null : (
          <Box sx={(theme) => navbarRow(theme, { isMini })}>
            <Box color="inherit">
              <IconButton
                size="small"
                color="white"
                sx={navbarMobileMenu}
                // onClick={handleMiniSidenav}
              >
                <Icon>{!customization.opened ? 'menu_open' : 'menu'}</Icon>
              </IconButton>
              <IconButton
                size="small"
                color="dark"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                // onClick={handleOpenMenu}
              >
                <Icon>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false
};

export default DashboardNavbar;
