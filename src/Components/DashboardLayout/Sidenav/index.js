import { Divider, Icon, List } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from 'Elements/Typography';
import Box from 'Elements/Box';
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
    <NavLink to={path} key={key}>
      <SidenavItem name={name} icon={icon} active={key === itemName} />
    </NavLink>
  ));

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ miniSidenav: customization.miniSidenav }}
    >
      <Box pt={3} pb={1} px={4} textAlign="center">
        <Box
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </Typography>
        </Box>
        <Box component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <Box component="img" src={brand} alt="Argon Logo" width="2rem" mr={0.25} />}
          <Box
            width={!brandName && '100%'}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav: customization.miniSidenav })}
          >
            <Typography component="h6" variant="button" fontWeight="medium" color="dark">
              {brandName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
};

Sidenav.defaultProps = {
  color: 'info',
  brand: ''
};

export default Sidenav;
