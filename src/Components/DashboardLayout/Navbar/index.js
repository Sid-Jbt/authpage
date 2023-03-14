import { AppBar, Divider, Grid, Icon, IconButton, Menu, Toolbar, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Box from 'Elements/Box';
import {
  Home,
  Logout,
  MenuOpenTwoTone,
  MenuTwoTone,
  Notifications,
  Person,
  Settings
} from '@mui/icons-material';
import { useState } from 'react';
import NotificationItem from 'Elements/Item';

import UserPic from 'Assets/Images/team-4-800x800.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from 'Elements/Breadcrumbs';
import Avatar from 'Elements/Avatar';
import useWindowPosition from 'Hooks/useWindowPosition';
import { getLoginPattern, getProfilePattern } from 'Routes/routeConfig';
import CircularProgressWithLabel from 'Elements/CircularProgressWithLabel';
import { MINI_SIDENAV, LOGOUT } from 'APIs/constants';
import { navbar, navbarContainer, navbarIconButton, navbarRow } from './styles';

const DashboardNavbar = ({ profile, progress, isMini }) => {
  const customization = useSelector((state) => state.customization);
  const themes = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const route = pathname.split('/').slice(1);
  const position = useWindowPosition();
  const handleMiniSidenav = () =>
    dispatch({ type: MINI_SIDENAV, value: !customization.miniSidenav });

  const handleMenu = () => setOpenMenu(!openMenu);

  const handleProfileMenu = () => setOpenProfileMenu(!openProfileMenu);

  const handleProfileCircle = () => {
    navigate(getProfilePattern());
  };

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
        mt: 2,
        [breakpoints.down('sm')]: {
          top: 50,
          left: 0
        },
        [breakpoints.up('md')]: {
          top: 60,
          left: -20
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
      sx={({ breakpoints }) => ({
        mt: 2,
        [breakpoints.down('sm')]: {
          top: 50,
          left: 0
        },
        [breakpoints.up('md')]: {
          top: 60,
          left: -20
        }
      })}
    >
      <NotificationItem
        color="secondary"
        title={['Hello,', `${profile ? `${profile.firstName} ${profile.lastName}` : 'Welcome'}`]}
        disabled
        onClick={handleProfileMenu}
        width={200}
      />
      <Divider />

      <NotificationItem
        color="secondary"
        image={<Person />}
        title={['Profile']}
        onClick={handleProfileMenu}
        component={Link}
        to="/profile"
        width={200}
      />
      <NotificationItem
        color="secondary"
        image={<Settings />}
        title={['Settings']}
        onClick={handleProfileMenu}
        component={Link}
        to="/setting"
        width={200}
      />
      <NotificationItem
        color="secondary"
        image={<Logout />}
        title={['Logout']}
        onClick={() => {
          localStorage.removeItem('noticeBoardEvent');
          handleProfileMenu();
          navigate(getLoginPattern());
          dispatch({ type: LOGOUT });
        }}
        width={200}
      />
    </Menu>
  );

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar: position > 10 })}
      blur={10}
    >
      <Toolbar sx={(theme) => navbarContainer(theme, { position: 'static' })}>
        <Box color="white" sx={(theme) => navbarRow(theme, { isMini })}>
          {!customization.miniSidenav ? (
            <IconButton
              size="large"
              color={position > 10 ? 'dark' : 'white'}
              sx={navbarIconButton}
              variant="contained"
              onClick={handleMiniSidenav}
            >
              <MenuTwoTone />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              color={position > 10 ? 'dark' : 'white'}
              sx={navbarIconButton}
              variant="contained"
              onClick={handleMiniSidenav}
            >
              <MenuOpenTwoTone />
            </IconButton>
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Breadcrumbs
            icon={<Home />}
            title={route[route.length - 1]}
            route={route}
            light={false}
          />
        </Box>
        <Box sx={(theme) => navbarRow(theme, { isMini })}>
          <Grid container columnGap={2} alignItems="center">
            <Grid item>
              <IconButton
                size="large"
                color={position > 10 ? 'dark' : 'white'}
                sx={navbarIconButton}
                variant="contained"
                onClick={handleMenu}
              >
                <Notifications />
              </IconButton>
            </Grid>
            <Grid item onClick={handleProfileCircle}>
              <CircularProgressWithLabel value={progress || 0} />
            </Grid>
            <Grid item>
              <Avatar
                src={UserPic}
                alt={UserPic}
                size={window.innerWidth < themes.breakpoints.values.md ? 'sm' : 'md'}
                variant="circle"
                onClick={handleProfileMenu}
              />
            </Grid>
          </Grid>
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
