import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Logo from 'Assets/logo/jbt-logo.svg';
import DashboardNavbar from './Navbar';
import Sidenav from './Sidenav';

const DashboardLayout = ({ bgColor, children, ...rest }) => {
  const background = bgColor;
  const customization = useSelector((state) => state.customization);
  return (
    <Box>
      <Box
        bgColor={background || 'info'}
        height="300px"
        width="100vw"
        position="fixed"
        top={0}
        left={0}
        zIndex={-1}
        {...rest}
      >
        <Sidenav brand={Logo} brandName="Jarvis Bitz" />
      </Box>
      <Box
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 3,
          pt: 0,
          [breakpoints.up('xl')]: {
            marginLeft: customization.miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(['margin-left', 'margin-right'], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard
            })
          }
        })}
      >
        <DashboardNavbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
