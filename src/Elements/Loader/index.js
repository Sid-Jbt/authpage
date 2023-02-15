import React from 'react';
import { styled, LinearProgress } from '@mui/material';

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999999,
  width: '100%',
  overflow: 'visible',
  margin: 'auto',
  bottom: 0,
  right: 0
});

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="dark" />
  </LoaderWrapper>
);

export default Loader;
