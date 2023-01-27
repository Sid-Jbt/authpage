import { Card, Checkbox, Grid } from '@mui/material';
import React, { useState } from 'react';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import { Link } from 'react-router-dom';
import { loginPattern } from 'Routes/routeConfig';

const image = 'https://jarvisbitz.com/wp-content/uploads/2022/02/banner-shape-1.png';

const OrganisationSignup = () => {
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);
  return (
    <Box
      display="grid"
      alignItems="center"
      width="100%"
      height="100vh"
      minHeight="100vh"
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          image &&
          `${linearGradient(
            rgba(gradients.dark.main, 0.6),
            rgba(gradients.dark.state, 0.6)
          )}, url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box px={1} width="100%" mx="auto">
        <Grid container justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <Box p={3} mb={1} textAlign="center">
                <Typography variant="h5" fontWeight="medium">
                  Register Organisation
                </Typography>
              </Box>
              <Box pt={2} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box>
                    <Input placeholder="Name" />
                  </Box>
                  <Box>
                    <Input type="email" placeholder="Email" />
                  </Box>
                  <Box>
                    <Input type="password" placeholder="Password" />
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Checkbox checked={agreement} onChange={handleSetAgremment} />
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      onClick={handleSetAgremment}
                      sx={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      &nbsp;&nbsp;I agree the&nbsp;
                    </Typography>
                    <Typography
                      component="a"
                      href="#"
                      variant="button"
                      fontWeight="bold"
                      textGradient
                    >
                      Terms and Conditions
                    </Typography>
                  </Box>
                  <Box mt={4} mb={1}>
                    <Button variant="gradient" color="dark" fullWidth>
                      Sign up
                    </Button>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="button" color="text" fontWeight="regular">
                      Already have an account?&nbsp;
                      <Typography
                        component={Link}
                        to={loginPattern}
                        variant="button"
                        color="dark"
                        fontWeight="bold"
                        textGradient
                      >
                        Sign in
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrganisationSignup;
