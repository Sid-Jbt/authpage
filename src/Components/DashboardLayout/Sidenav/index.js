import { Divider, List } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { useSelector } from 'react-redux';
import DashboardRoutes from 'Routes/MainRoutes';
import SidenavItem from './SidenavItem';
import SidenavRoot from './SidenavRoot';
import sidenavLogoLabel from './styles/sidenav';

const Sidenav = ({ color, brand, brandName, ...rest }) => {
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  const { pathname } = location;
  const itemName = pathname.split('/').slice(1)[0];

  const renderRoutes = DashboardRoutes.children.map(({ name, icon, key, path }) => (
    <NavLink to={path} key={key} style={{ textDecoration: 'none' }}>
      <SidenavItem name={name} icon={icon} active={key === itemName} />
    </NavLink>
  ));

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ miniSidenav: customization.miniSidenav }}
    >
      <Box pt={2} pb={2} px={3} textAlign="center">
        <Box
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ textDecoration: 'none' }}
        >
          {brand && <Box component="img" src={brand} alt="Logo" width="2rem" mr={0.25} />}
          <Box
            width={!brandName && '100%'}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav: customization.miniSidenav })}
          >
            <Typography variant="h5" textAlign="start" fontWeight="medium" color="dark">
              {brandName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider width="50%" sx={{ ml: 'auto', mr: 'auto' }} />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
};

Sidenav.defaultProps = {
  color: 'info',
  brand: ''
};

export default Sidenav;
