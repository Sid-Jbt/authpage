import Box from 'Elements/Box';
import { Link } from 'react-router-dom';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import Button from '../../Elements/Button';
import Error404Img from '../../Assets/images/404_page.png';

const Error404 = () => (
  // <Box
  //   style={{ margin: 40, border: '2px solid white', height: '1000px', background: 'white' }}
  //   align="center"
  // >
  <Box style={{ margin: 10 }} align="center">
    <Grid container>
      <Grid
        item
        lg={12}
        xl={12}
        sx={{ mx: 'auto', background: 'white', borderRadius: '8px' }}
        mt={3}
      >
        <Box textAlign="center">
          <Box style={{ marginTop: '8%' }}>
            <img src={Error404Img} alt="404page" />
          </Box>

          <Box style={{ marginTop: '2cm' }}>
            <Typography>ERROR PAGE </Typography>
            <Typography>Uh Oh!! you're lost.</Typography>
            <Typography>
              we are sorry but the page you were looking for was not found...!
            </Typography>
            <Button component={Link} to="/dashboard" type="btn">
              Go Back to Home page
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Error404;
