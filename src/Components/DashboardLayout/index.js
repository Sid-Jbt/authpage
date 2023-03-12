import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Logo from 'Assets/logo/jbt-logo.svg';
import FullLogo from 'Assets/logo/jbt-full-logo.svg';
import { getProfilePattern, getProfileSetupPattern } from 'Routes/routeConfig';
import Images from 'Assets/Images/team-4-800x800.jpg';
import withStateDispatch from 'Helpers/withStateDispatch';
import { useEffect } from 'react';
import DashboardNavbar from './Navbar';
import Sidenav from './Sidenav';
import Footer from './Footer';

const DashboardLayout = ({ GetDashboard, UserData, children, ...rest }) => {
  const { customization } = useSelector((state) => state);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const bgImage = Images;

  useEffect(() => {
    if (UserData && UserData.isLoginFirstTime) {
      navigate(getProfileSetupPattern());
    }
  }, [UserData]);

  useEffect(() => {
    GetDashboard();
  }, []);

  return (
    <>
      <Box
        bgColor="info"
        height="300px"
        width="100vw"
        position="fixed"
        top={0}
        left={0}
        zIndex={-1}
        sx={
          pathname === getProfilePattern() && {
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
      {pathname !== getProfileSetupPattern() ? (
        <Sidenav brandFullLogo={FullLogo} brandSmallLogo={Logo} brandName="Jarvis Bitz" />
      ) : null}
      <Box
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          [breakpoints.up('xl')]: {
            marginLeft:
              pathname !== getProfileSetupPattern()
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
        <DashboardNavbar user={UserData && UserData.user} />
        <Box
          sx={({ breakpoints }) => ({
            [breakpoints.down('md')]: { p: 1, pt: 0 },
            [breakpoints.up('md')]: { p: 3, pt: 0 }
          })}
        >
          <Outlet context={{ role: UserData.role }} />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default withStateDispatch(DashboardLayout);
