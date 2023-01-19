import Box from 'Elements/Box';
import { Link } from 'react-router-dom';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Card } from '@mui/material';
import { getDashboardPattern } from 'Routes/routeConfig';

const Error404 = () => (
  <Card
    sx={{
      p: '50px',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      m: 'auto'
    }}
  >
    <Box>
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">ERROR PAGE</Typography>
      <Typography>Uh Oh!! you're lost.</Typography>
      <Typography fontWeight="bold">This page could not be found.</Typography>
      <Button
        sx={{ width: 'max-content', m: 'auto', mt: 2 }}
        component={Link}
        to={getDashboardPattern()}
        type="button"
        size="small"
        color="info"
      >
        Go Back to Home page
      </Button>
    </Box>
  </Card>
);
export default Error404;
