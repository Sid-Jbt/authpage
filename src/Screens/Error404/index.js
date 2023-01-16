import Box from 'Elements/Box';
import { Link } from 'react-router-dom';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';

const Error404 = () => (
  <Box
    sx={{
      m: 'auto',
      marginTop: '100px',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',
      background: 'white',
      borderRadius: 7
    }}
  >
    <Box sx={{ padding: '50px' }}>
      <Typography variant="h1" fontSize="8vw" fontWeight="bold" color="black">
        404
      </Typography>
      <Typography sx={{ fontWeight: 'bold', fontSize: '3.2vw', color: 'black' }}>
        ERROR PAGE
      </Typography>
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
