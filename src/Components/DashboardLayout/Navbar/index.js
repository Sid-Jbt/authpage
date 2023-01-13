import { AppBar, Icon, IconButton, Menu, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Box from 'Elements/Box';
import { MINI_SIDENAV } from 'Redux/actions/ui/actions';
import { MenuOpenTwoTone, MenuTwoTone, Notifications } from '@mui/icons-material';
import { useState } from 'react';
import NotificationItem from 'Elements/Item';

import { navbar, navbarContainer, navbarIconButton, navbarRow } from './styles';

const DashboardNavbar = ({ isMini }) => {
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMiniSidenav = () =>
    dispatch({ type: MINI_SIDENAV, value: !customization.miniSidenav });
  const handleMenu = () => setOpenMenu(!openMenu);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={Boolean(openMenu)}
      onClose={handleMenu}
      sx={{ mt: 2, top: 77 }}
    >
      <NotificationItem
        // image={<img src={team2} alt="person" />}
        title={['New message', 'from Laur']}
        date="13 minutes ago"
        onClick={handleMenu}
      />
      <NotificationItem
        // image={<img src={logoSpotify} alt="person" />}
        title={['New album', 'by Travis Scott']}
        date="1 day"
        onClick={handleMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={['', 'Payment successfully completed']}
        date="2 days"
        onClick={handleMenu}
      />
    </Menu>
  );

  return (
    <AppBar position="sticky" color="inherit" sx={(theme) => navbar(theme)}>
      <Toolbar sx={(theme) => navbarContainer(theme, { position: 'static' })}>
        <Box color="white" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          {!customization.miniSidenav ? (
            <MenuOpenTwoTone onClick={handleMiniSidenav} />
          ) : (
            <MenuTwoTone onClick={handleMiniSidenav} />
          )}
          {/* <Breadcrumbs
          icon="home"
          title={route[route.length - 1]}
          route={route}
          light={transparentNavbar ? light : false}
        /> */}
        </Box>
        <Box sx={(theme) => navbarRow(theme, { isMini })}>
          <Box color="white">
            <IconButton
              size="small"
              color="white"
              sx={navbarIconButton}
              variant="contained"
              onClick={handleMenu}
            >
              <Notifications />
            </IconButton>
            {renderMenu()}
          </Box>
        </Box>
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
