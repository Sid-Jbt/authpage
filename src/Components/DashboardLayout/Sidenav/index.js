import { Divider, List } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import DashboardRoutes from 'Routes/MainRoutes';
import SidenavItem from './SidenavItem';
import SidenavRoot from './SidenavRoot';

const Sidenav = ({ color, brandFullLogo, brandSmallLogo, brandName, ...rest }) => {
  const customization = useSelector((state) => state.customization);
  const miniSidenav = customization.miniSidenav;
  const location = useLocation();
  const { pathname } = location;
  const itemName = pathname.split('/').slice(1)[0];

  const renderRoutes = DashboardRoutes.children.map(({ name, icon, key, path }) => (
    <NavLink to={path} key={key} style={{ textDecoration: 'none' }}>
      <SidenavItem name={name} icon={icon} active={key === itemName} />
    </NavLink>
  ));

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ miniSidenav }}>
      <Box pb={2} pt={2} textAlign="center">
        <Box
          component={NavLink}
          to="/dashboard"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ textDecoration: 'none' }}
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
