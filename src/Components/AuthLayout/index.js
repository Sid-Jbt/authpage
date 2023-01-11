import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Outlet } from 'react-router';
import { Grid, useTheme } from '@mui/material';
import linearGradient from '../../Theme/functions/linearGradient';

const AuthLayout = () => {
  const theme = useTheme();
  console.log(theme);
  const bgImage = 'https://jarvisbitz.com/wp-content/uploads/2022/02/banner-shape-1.png';
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
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="calc(100vh - 2rem)"
            >
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
                top={50}
                left={0}
              />
              <Box
                bgColor={linearGradient(
                  theme.palette.gradients.info.main,
                  theme.palette.gradients.info.state
                )}
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
                    JarvisBitz Tech
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
      </Box>
    </>
  );
};

export default AuthLayout;
