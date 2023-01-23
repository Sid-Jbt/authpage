import { Divider, Link, List } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { useDispatch, useSelector } from 'react-redux';
import DashboardRoutes from 'Routes/MainRoutes';
import { MINI_SIDENAV } from 'Redux/actions/ui/actions';
import breakpoints from 'Theme/base/breakpoints';
import { useEffect, useState } from 'react';
import SidenavItem from './SidenavItem';
import SidenavRoot from './SidenavRoot';
import SidenavList from './SidenavList';
import SidenavCollapse from './SidenavCollapse';

const Sidenav = ({ color, brandFullLogo, brandSmallLogo, brandName, ...rest }) => {
  const customization = useSelector((state) => state.customization);
  const miniSidenav = customization.miniSidenav;
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const collapseName = pathname.split('/').slice(1)[0];
  const itemName = pathname.split('/').slice(1)[1];

  useEffect(() => {
    function handleMiniSidenav() {
      if (window.innerWidth < breakpoints.values.xl) {
        dispatch({ type: MINI_SIDENAV, value: !customization.miniSidenav });
      }
    }

    window.addEventListener('resize', handleMiniSidenav);

    handleMiniSidenav();

    return () => window.removeEventListener('resize', handleMiniSidenav);
  }, [dispatch, location]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch({ type: MINI_SIDENAV, value: false });
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch({ type: MINI_SIDENAV, value: true });
      setOnMouseEnter(false);
    }
  };

  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, href }) =>
      href ? (
        <Link key={key} href={href} target="_blank" rel="noreferrer">
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key}>
          <SidenavItem name={name} active={route === pathname} nested />
        </NavLink>
      )
    );
    return template;
  };

  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            name={name}
            active={key === itemName}
            open={openNestedCollapse === name}
            onClick={() =>
              openNestedCollapse === name
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(name)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link href={href} key={key} target="_blank" rel="noreferrer">
            <SidenavItem name={name} active={key === itemName} />
          </Link>
        ) : (
          <NavLink to={route} key={key}>
            <SidenavItem name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  const renderRoutes = DashboardRoutes.children.map(
    ({ type, name, icon, title, children, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === 'collapse') {
        if (href) {
          returnValue = (
            <Link href={href} key={key} target="_blank" rel="noreferrer">
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
                miniSidenav={miniSidenav}
              />
            </Link>
          );
        } else if (noCollapse && route) {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
                miniSidenav={miniSidenav}
              >
                {children ? renderCollapse(children) : null}
              </SidenavCollapse>
            </NavLink>
          );
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              miniSidenav={miniSidenav}
              onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
            >
              {children ? renderCollapse(children) : null}
            </SidenavCollapse>
          );
        }
      } else if (type === 'title' && !miniSidenav) {
        returnValue = (
          <Typography
            key={key}
            color="dark"
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </Typography>
        );
      } else if (type === 'divider') {
        returnValue = <Divider key={key} light={false} />;
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ miniSidenav }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <Box pb={2} pt={2} textAlign="center">
        <Box
          component={NavLink}
          to="/dashboard"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ textDecoration: 'none', cursor: 'pointer' }}
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
