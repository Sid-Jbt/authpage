import { Divider, Link, List } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { useDispatch, useSelector } from 'react-redux';
import DashboardRoutes from 'Routes/MainRoutes';
import { MINI_SIDENAV } from 'Redux/actions/ui/actions';
import breakpoints from 'Theme/base/breakpoints';
import SidenavItem from './SidenavItem';
import SidenavRoot from './SidenavRoot';
import { useState } from 'react';

const Sidenav = ({ color, brandFullLogo, brandSmallLogo, brandName, ...rest }) => {
  const customization = useSelector((state) => state.customization);
  const miniSidenav = customization.miniSidenav;
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const itemName = pathname.split('/').slice(1)[0];
  const itemNameSub = pathname.split('/').slice(1)[1];

  const handleMiniSidenav = () => {
    if (window.innerWidth < breakpoints.values.xl) {
      dispatch({ type: MINI_SIDENAV, value: !customization.miniSidenav });
    }
  };

  const renderRoutes = DashboardRoutes.children.map(
    ({ type, name, icon, title, key, href, path, children }) => {
      let returnValue;

      if (type === 'route') {
        if (href) {
          returnValue = (
            <Link href={href} key={key} target="_blank" rel="noreferrer">
              <SidenavItem name={name} icon={icon} active={key === itemName} />
            </Link>
          );
        } else {
          returnValue = (
            <NavLink to={path} key={key} onClick={() => handleMiniSidenav()}>
              <SidenavItem name={name} icon={icon} active={key === itemName} />
            </NavLink>
          );
        }
      } else if (type === 'title') {
        returnValue = (
          <Typography
            key={key}
            color={'dark'}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </Typography>
        );
      } else if (type === 'divider') {
        returnValue = <Divider key={key} light />;
      } else if (type === 'collapse') {
        returnValue = (
          <Box key={key}>
            <SidenavItem
              name={name}
              icon={icon}
              active={key === itemName}
              type={type}
              child={children}
            />
          </Box>
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ miniSidenav }}>
      <Box pb={2} pt={2} textAlign="center">
        <Box
          component={NavLink}
          to="/dashboard"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          {brandFullLogo && brandSmallLogo && (
            <Box
              component="img"
              src={miniSidenav ? brandSmallLogo : brandFullLogo}
              alt="Logo"
              width={miniSidenav ? '2rem' : '10rem'}
            />
          )}
        </Box>
      </Box>
      <Divider sx={{ m: 0, mb: 2 }} />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
};

Sidenav.defaultProps = {
  color: 'info',
  brand: ''
};

export default Sidenav;
