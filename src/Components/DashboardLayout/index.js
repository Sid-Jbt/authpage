import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Logo from 'Assets/logo/jbt-logo.svg';
import FullLogo from 'Assets/logo/jbt-full-logo.svg';
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
      />

      <Sidenav brandFullLogo={FullLogo} brandSmallLogo={Logo} brandName="Jarvis Bitz" />

      <Box
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
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
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
