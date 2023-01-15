import Box from 'Elements/Box';
import { Link } from 'react-router-dom';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';

const Error404 = () => (
  <Box sx={{ m: 15, h: '500px', background: 'white', borderRadius: 4, textAlign: 'center' }}>
    <Box style={{ padding: '150px', color: 'black' }}>
      <Typography variant="h1" fontSize="200px" color="black">
        404
      </Typography>
      <Typography>ERROR PAGE </Typography>
      <Typography>Uh Oh!! you're lost.</Typography>
      <Typography>
        <strong>We are sorry but the page you were looking for was not found...!</strong>
      </Typography>
      <Button sx={{ mt: 5 }} component={Link} to="/dashboard" type="button" color="info">
        Go Back to Home page
      </Button>
    </Box>
  </Box>
);
export default Error404;
