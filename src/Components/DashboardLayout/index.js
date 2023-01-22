import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
import Logo from 'Assets/logo/jbt-logo.svg';
import FullLogo from 'Assets/logo/jbt-full-logo.svg';
import { profilePattern, profileSetupPattern } from 'Routes/routeConfig';
import Images from 'Assets/Images/team-4-800x800.jpg';
import DashboardNavbar from './Navbar';
import Sidenav from './Sidenav';
import Footer from './Footer';

const DashboardLayout = ({ children, ...rest }) => {
  const customization = useSelector((state) => state.customization);
  const { pathname } = useLocation();
  const bgImage = Images;

  return (
    <Box>
      <Box
        bgColor="info"
        height="300px"
        width="100vw"
        position="fixed"
        top={0}
        left={0}
        zIndex={-1}
        sx={
          pathname === profilePattern && {
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 1),
                rgba(gradients.info.state, 0.8)
              )}, url(${bgImage})`,
            backgroundPositionY: '50%'
          }
        }
        {...rest}
      />
      {pathname !== profileSetupPattern ? (
        <Sidenav brandFullLogo={FullLogo} brandSmallLogo={Logo} brandName="Jarvis Bitz" />
      ) : null}
      <Box
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          [breakpoints.up('xl')]: {
            marginLeft:
              pathname !== profileSetupPattern
                ? customization.miniSidenav
                  ? pxToRem(120)
                  : pxToRem(274)
                : 0,
            transition: transitions.create(['margin-left', 'margin-right'], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard
            })
          }
        })}
      >
        <DashboardNavbar />
        <Box sx={{ p: 3, pt: 0 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
