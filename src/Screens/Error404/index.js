import Box from 'Elements/Box';
import { Link } from 'react-router-dom';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Card, Grid } from '@mui/material';
import { getDashboardPattern } from 'Routes/routeConfig';

// const styles = (theme) => ({
//   root: {
//     backgroundColor: 'blue',
//     [theme.breakpoints.up('md')]: {
//       backgroundColor: 'red'
//     }
//   }
// });

const Error404 = () => (
  <Grid sx={{ mt: 13 }} xl={12} lg={12} sm={12}>
    <Card>
      <Box sx={{ p: 10 }} alignSelf="center">
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">ERROR PAGE</Typography>
        <Typography>Uh Oh!! you're lost.</Typography>
        <Typography fontWeight="bold">This page could not be found.</Typography>
        <Button
          sx={{ mt: 2 }}
          component={Link}
          to={getDashboardPattern()}
          type="button"
          color="info"
        >
          Go Back to Home page
        </Button>
      </Box>
    </Card>
  </Grid>
);
export default Error404;
