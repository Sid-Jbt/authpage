import React from 'react';
import Box from 'Elements/Box';
import { Outlet } from 'react-router';
import { Card, Grid, Link, Typography, useTheme } from '@mui/material';
import linearGradient from 'Theme/functions/linearGradient';
import LogoWithName from 'Assets/logo/jbt-full-logo.svg';
import bgImage from 'Assets/Illustrations/404.svg';

const AuthLayout = () => {
  const theme = useTheme();

  return (
    <Box width="100vw" height="100%" minHeight="100vh" bgColor="white" sx={{ overflowX: 'hidden' }}>
      <Box
        component="img"
        src={bgImage}
        alt="background"
        width="100vw"
        height="100vh"
        position="absolute"
      />
      <Box
        bgColor={linearGradient(
          theme.palette.gradients.light.main,
          theme.palette.gradients.secondary.state
        )}
        width="100vw"
        height="100vh"
        position="absolute"
        top={0}
        left={0}
        opacity={0.7}
      />
      <Grid
        container
        minHeight="100vh"
        alignItems="end"
        justifyContent="center"
        sx={{ zIndex: 9999 }}
      >
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3}>
          <Card sx={{ p: 3 }}>
            <Box
              component="img"
              src={LogoWithName}
              alt="Logo"
              sx={({ breakpoints }) => ({
                width: '70%',
                ml: 'auto',
                mr: 'auto',
                mb: 3,
                [breakpoints.down('md')]: {
                  width: '60%',
                  ml: 'auto',
                  mr: 'auto',
                  mb: 1
                }
              })}
            />
            <Outlet />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ background: 'transparent', boxShadow: 'none', p: 1 }}>
            <Typography textAlign="center" fontSize="medium">
              Powered By{' '}
              <Link href="www.jarvisbitz.com" target="_blank" color="info" underline="hover">
                JarvisBitz Tech
              </Link>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
