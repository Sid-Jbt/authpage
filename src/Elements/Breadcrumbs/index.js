import { Link } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import Icon from '@mui/material/Icon';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { getDashboardPattern } from 'Routes/routeConfig';

const Breadcrumbs = ({ icon, title, route, light }) => {
  console.log('title', title);
  const routes = route.slice(0, -1);

  return (
    <Box mr={{ xs: 0, xl: 8 }} sx={{ flexDirection: 'columns' }}>
      <MuiBreadcrumbs
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600])
          }
        }}
      >
        <Link to={getDashboardPattern()}>
          <Typography
            component="span"
            variant="body2"
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </Typography>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <Typography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? 'white' : 'dark'}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </Typography>
          </Link>
        ))}
        {/* <Typography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? 'white' : 'dark'}
          sx={{ lineHeight: 0 }}
        >
          {title.replace('-', ' ')}
        </Typography> */}
        <Typography
          fontWeight="bold"
          textTransform="capitalize"
          variant="h6"
          color={light ? 'white' : 'dark'}
          noWrap
        >
          {title.replace('-', ' ')}
        </Typography>
      </MuiBreadcrumbs>
    </Box>
  );
};

Breadcrumbs.defaultProps = {
  light: false
};

export default Breadcrumbs;
