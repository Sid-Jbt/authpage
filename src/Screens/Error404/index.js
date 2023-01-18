import Box from 'Elements/Box';
import { Link } from 'react-router-dom';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Card } from '@mui/material';
import { getDashboardPattern } from 'Routes/routeConfig';

const Error404 = () => (
  <Card xl={12} lg={12} sm={12}>
    <Box sx={{ p: 10 }} textAlign="center">
      <Typography variant="h1">404</Typography>
      <Typography variant="h1">ERROR PAGE</Typography>
      <Typography>Uh Oh!! you're lost.</Typography>
      <Typography fontWeight="bold">
        We are sorry but the page you were looking for was not found...!
      </Typography>
      <Button sx={{ mt: 5 }} component={Link} to={getDashboardPattern()} type="button" color="info">
        Go Back to Home page
      </Button>
    </Box>
  </Card>
);
export default Error404;
