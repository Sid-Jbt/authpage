import { AppBar, Avatar, Divider, Icon, IconButton, Menu, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Box from 'Elements/Box';
import { MINI_SIDENAV } from 'Redux/actions/ui/actions';
import {
  Logout,
  MenuOpenTwoTone,
  MenuTwoTone,
  Notifications,
  Person,
  Settings
} from '@mui/icons-material';
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
      sx={({ breakpoints }) => ({
        mt: 1,
        [breakpoints.down('sm')]: {
          top: 60,
          left: 0
        },
        [breakpoints.up('md')]: {
          top: 50,
          left: -90
        }
      })}
    >
      <NotificationItem
        image={<Person />}
        title={['New message', 'from Laur']}
        date="13 minutes ago"
        onClick={handleMenu}
      />
      <NotificationItem
        image={<Person />}
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
      sx={{ mt: 2, top: 50, left: -10 }}
    >
      <NotificationItem
        color="secondary"
        title={['Hello,', 'Username']}
        disabled
        onClick={handleProfileMenu}
        width={200}
      />
      <Divider sx={{ width: 100, ml: 'auto', mr: 'auto' }} />
      <NotificationItem
        color="secondary"
        image={<Person />}
        title={['Profile']}
        onClick={handleProfileMenu}
        width={200}
      />
      <NotificationItem
        color="secondary"
        image={<Settings />}
        title={['Settings']}
        onClick={handleProfileMenu}
        width={200}
      />
      <NotificationItem
        color="secondary"
        image={<Logout />}
        title={['Logout']}
        onClick={handleProfileMenu}
        width={200}
      />
    </Menu>
  );

  return (
    <AppBar position="sticky" color="inherit" sx={(theme) => navbar(theme)}>
      <Toolbar sx={(theme) => navbarContainer(theme, { position: 'static' })}>
        <Box color="white" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          {!customization.miniSidenav ? (
            <IconButton
              size="large"
              color="white"
              sx={navbarIconButton}
              variant="contained"
              onClick={handleMiniSidenav}
            >
              <MenuTwoTone />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              color="white"
              sx={navbarIconButton}
              variant="contained"
              onClick={handleMiniSidenav}
            >
              <MenuOpenTwoTone />
            </IconButton>
          )}
          {/* <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={transparentNavbar ? light : false}
          /> */}
        </Box>
        <Box sx={(theme) => navbarRow(theme, { isMini })}>
          <IconButton
            size="large"
            color="white"
            sx={navbarIconButton}
            variant="contained"
            onClick={handleMenu}
          >
            <Notifications />
          </IconButton>
          <Avatar
            src={profileImage}
            alt="profile-image"
            variant="rounded"
            onClick={handleProfileMenu}
            sx={{ width: 50, height: 50, borderRadius: 12 }}
          />
          {renderMenu()}
          {renderProfileMenu()}
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
