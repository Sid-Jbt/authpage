import { Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Box from 'Elements/Box';
import { MINI_SIDENAV } from 'Redux/actions/ui/actions';
import { MenuOpenTwoTone, MenuTwoTone } from '@mui/icons-material';
import { navbarContainer, navbarRow } from './styles';

const DashboardNavbar = ({ isMini }) => {
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();

  // const [openMenu, setOpenMenu] = useState(false);

  const handleMiniSidenav = () =>
    dispatch({ type: MINI_SIDENAV, value: !customization.miniSidenav });
  // const handleCloseMenu = () => setOpenMenu(false);

  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: 'bottom',
  //       horizontal: 'left'
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     Item
  //   </Menu>
  // );

  return (
    <Toolbar sx={(theme) => navbarContainer(theme)}>
      <Box color="white" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
        {/* <Breadcrumbs
          icon="home"
          title={route[route.length - 1]}
          route={route}
          light={transparentNavbar ? light : false}
        /> */}
        {!customization.miniSidenav ? (
          <MenuOpenTwoTone onClick={handleMiniSidenav} />
        ) : (
          <MenuTwoTone onClick={handleMiniSidenav} />
        )}
      </Box>
    </Toolbar>
  );
};

DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false
};

export default DashboardNavbar;
