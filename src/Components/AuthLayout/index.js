import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Outlet } from 'react-router';
import { Grid } from '@mui/material';

const AuthLayout = ({ color }) => {
  const bgImage =
    'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg';
  return (
    <>
      <Box
        width="100vw"
        height="100%"
        minHeight="100vh"
        bgColor="white"
        sx={{ overflowX: 'hidden' }}
      >
        <Grid container>
          <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: 'auto' }}>
            <Box mt={1}>Header</Box>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100vh">
              <Box p={3}>
                <Outlet />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box
              display={{ xs: 'none', lg: 'flex' }}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="calc(100% - 2rem)"
              height="calc(100vh - 2rem)"
              position="relative"
              borderRadius="lg"
              textAlign="center"
              m={2}
              px={13}
              sx={{ overflow: 'hidden' }}
            >
              <Box
                component="img"
                src={bgImage}
                alt="background"
                width="100%"
                position="absolute"
                top={0}
                left={0}
              />
              <Box
                bgColor={color}
                variant="gradient"
                width="100%"
                height="100%"
                position="absolute"
                topl={0}
                left={0}
                opacity={0.7}
              />
              <Box position="relative">
                <Box mt={6} mb={1}>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    Attention is the new currency
                  </Typography>
                </Box>

                <Box mb={1}>
                  <Typography variant="body2" color="white">
                    The more effortless the writing looks, the more effort the writer actually put
                    into the process.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        Footer
      </Box>
    </>
  );
};

export default AuthLayout;
