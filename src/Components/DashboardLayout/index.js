import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import DashboardNavbar from './Navbar';

const DashboardLayout = ({ bgColor, children, ...rest }) => {
  const background = bgColor;
  const customization = useSelector((state) => state.customization);
  return (
    <Box
      bgColor={background || 'info'}
      height="300px"
      width="100vw"
      position="absolute"
      top={0}
      left={0}
      {...rest}
    >
      <Box
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 3,
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
