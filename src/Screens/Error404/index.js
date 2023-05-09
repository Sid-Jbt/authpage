import Box from 'Elements/Box';
import { Link, useNavigate } from 'react-router-dom';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { Card, Grid } from '@mui/material';
import { getDashboardPattern, getLoginPattern } from 'Routes/routeConfig';
import typography from 'Theme/base/typography';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import bgImage from '../../Assets/Images/404.svg';

const Error404 = () => {
  const { d1, d3, d4, d5 } = typography;
  const { login } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login.role) {
      navigate(getLoginPattern());
    }
  }, []);

  return (
    <Card
      sx={{
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        m: 'auto'
      }}
    >
      <Box
        minHeight="100vh"
        sx={{
          width: '100%',
          display: 'grid',
          placeItems: 'center',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: '50%'
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ textAlign: 'center', mx: 'auto' }}>
            <Box
              color="info"
              fontWeight="bold"
              fontSize={{ xs: d5.fontSize, sm: d4.fontSize, md: d3.fontSize, lg: d1.fontSize }}
              lineHeight={1.2}
              mb={2}
            >
              Error 404
            </Box>
            <Typography variant="h2" color="dark" fontWeight="bold">
              Erm. Page not found
            </Typography>
            <Typography variant="body1" color="text">
              We suggest you to go to the homepage while we solve this issue.
            </Typography>
            <Button
              variant="gradient"
              component={Link}
              to={getDashboardPattern()}
              color="dark"
              sx={{ mt: 5 }}
            >
              Go to Homepage
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
export default Error404;
