import Box from 'Elements/Box';
import { Link } from 'react-router-dom';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { useTheme } from '@mui/material';

const Error404 = () => {
  const theme = useTheme();
  console.log(theme.breakpoints);
  return (
    <Box
      xl={12}
      lg={12}
      sm={12}
      sx={{
        m: 'auto',
        marginTop: '100px',
        textAlign: 'center',
        background: 'white',
        borderRadius: 7
      }}
    >
      <Box sx={{ padding: '50px' }}>
        <Typography variant="h1" fontWeight="bold">
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
};
export default Error404;
