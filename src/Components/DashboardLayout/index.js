import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
import Logo from 'Assets/logo/jbt-logo.svg';
import FullLogo from 'Assets/logo/jbt-full-logo.svg';
import { getDashboardPattern, getProfilePattern, getProfileSetupPattern } from 'Routes/routeConfig';
import Images from 'Assets/Images/team-4-800x800.jpg';
import { withStateDispatch } from 'Helpers/withStateDispatch';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from './Navbar';
import Sidenav from './Sidenav';
import Footer from './Footer';

const DashboardLayout = ({ GetDashboard, DashboardData, ...rest }) => {
  const { customization } = useSelector((state) => state);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const bgImage =
    (DashboardData &&
      DashboardData.user &&
      DashboardData.user.profile &&
      DashboardData.user.profile.profilePic) ||
    Images;

  useEffect(() => {
    if (pathname === getDashboardPattern()) {
      GetDashboard();
    }
  }, [pathname]);

  useEffect(() => {
    if (DashboardData && DashboardData.isLoginFirstTime && DashboardData.isProfileSetup) {
      navigate(getProfileSetupPattern());
    }
  }, [DashboardData]);

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
      />
      {pathname !== getProfileSetupPattern() ? (
        <Sidenav
          brandFullLogo={
            DashboardData.user &&
            DashboardData.user.organisation.largeLogo &&
            DashboardData.user.organisation.largeLogo !== null
              ? DashboardData.user.organisation.largeLogo
              : FullLogo
          }
          brandSmallLogo={
            DashboardData.user &&
            DashboardData.user.organisation.smallLogo &&
            DashboardData.user.organisation.smallLogo !== null
              ? DashboardData.user.organisation.smallLogo
              : Logo
          }
          brandName="Jarvis Bitz"
        />
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
        <DashboardNavbar
          progress={DashboardData && DashboardData.profileProgress}
          user={DashboardData && DashboardData.user.profile}
          notification={DashboardData && DashboardData.notification}
          role={DashboardData && DashboardData.user.role}
        />
        <Box
          sx={({ breakpoints }) => ({
            mt: 3,
            [breakpoints.down('md')]: { p: 1, pt: 0 },
            [breakpoints.up('md')]: { p: 3, pt: 0 }
          })}
        >
          <Outlet
            context={{
              role: DashboardData.user.role,
              user: DashboardData.user,
              DashboardData,
              ...rest
            }}
          />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default withStateDispatch(DashboardLayout);
