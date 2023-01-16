import { AppBar, Avatar, Icon, IconButton, Menu, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Box from 'Elements/Box';
import { MINI_SIDENAV } from 'Redux/actions/ui/actions';
import { MenuOpenTwoTone, MenuTwoTone, Notifications, Person } from '@mui/icons-material';
import { useState } from 'react';
import NotificationItem from 'Elements/Item';

import profileImage from 'Assets/Images/bruce-mars.jpg';
import { navbar, navbarContainer, navbarIconButton, navbarRow } from './styles';

const DashboardNavbar = ({ isMini }) => {
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const handleMiniSidenav = () =>
    dispatch({ type: MINI_SIDENAV, value: !customization.miniSidenav });

  const handleMenu = () => setOpenMenu(!openMenu);

  const handleProfileMenu = () => setOpenProfileMenu(!openProfileMenu);

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
      sx={{ mt: 2, top: 30 }}
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

  const renderProfileMenu = () => (
    <Menu
      anchorEl={openProfileMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={Boolean(openProfileMenu)}
      onClose={handleProfileMenu}
      sx={{ mt: 2, top: 30 }}
    >
      <NotificationItem image={<Person />} title={['Profile']} onClick={handleProfileMenu} />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={['', 'Payment successfully completedasfdsfdsf']}
        date="2 days"
        onClick={handleProfileMenu}
      />
    </Menu>
  );

  return (
    <AppBar position="sticky" color="inherit" sx={(theme) => navbar(theme)}>
      <Toolbar sx={(theme) => navbarContainer(theme, { position: 'static' })}>
        <Box color="white" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          {!customization.miniSidenav ? (
            <MenuTwoTone onClick={handleMiniSidenav} style={{ cursor: 'pointer' }} />
          ) : (
            <MenuOpenTwoTone onClick={handleMiniSidenav} style={{ cursor: 'pointer' }} />
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
              size="medium"
              color="white"
              sx={navbarIconButton}
              variant="contained"
              onClick={handleProfileMenu}
            >
              <Avatar
                src={profileImage}
                alt="profile-image"
                variant="rounded"
                sx={{ width: 25, height: 25, borderRadius: 12 }}
              />
            </IconButton>
            <IconButton
              size="medium"
              color="white"
              sx={navbarIconButton}
              variant="contained"
              onClick={handleMenu}
            >
              <Notifications />
            </IconButton>
            {renderMenu()}
            {renderProfileMenu()}
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
