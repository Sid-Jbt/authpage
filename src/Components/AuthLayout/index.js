import React, { useLayoutEffect, useState } from 'react';
import Box from 'Elements/Box';
import { Navigate, Outlet, useLocation } from 'react-router';
import { Card, Grid, Link, Typography, useTheme } from '@mui/material';
import linearGradient from 'Theme/functions/linearGradient';
import { withStateDispatchAuth } from 'Helpers/withStateDispatch';
import { getDashboardPattern } from 'Routes/routeConfig';
import { store } from 'APIs/store';
import bgImage from '../../Assets/Images/404.svg';
import LogoWithName from '../../Assets/Images/jbt-full-logo.svg';

const AuthLayout = ({ ...rest }) => {
  const theme = useTheme();
  const token = store.getState().login.token;
  const [navigate, setNavigate] = useState(false);
  const { search } = useLocation();

  useLayoutEffect(() => {
    if (token) {
      if (search.split('=')[1] === 'desktop') {
        window.open(`${process.env.REACT_APP_DEEPLINK_PROTOCOL}://token=${token}`);
      }
      setNavigate(true);
      return;
    }
    setNavigate(false);
  }, [token]);

  return navigate ? (
    <Navigate to={getDashboardPattern()} />
  ) : (
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
                mb: 1,
                [breakpoints.down('md')]: {
                  width: '60%',
                  ml: 'auto',
                  mr: 'auto',
                  mb: 1
                }
              })}
            />
            <Outlet context={{ ...rest }} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ background: 'transparent', boxShadow: 'none', p: 1 }}>
            <Typography textAlign="center" fontSize="medium">
              © {new Date().getFullYear()}{' '}
              <Link
                href="https://www.jarvisbitz.com"
                target="_blank"
                color="info"
                underline="hover"
              >
                JarvisBitz Tech
              </Link>
              . All rights reserved
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStateDispatchAuth(AuthLayout);
