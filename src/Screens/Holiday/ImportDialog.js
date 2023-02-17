import { Grid } from '@mui/material';
import React from 'react';
import Box from '../../Elements/Box';
import Typography from '../../Elements/Typography';
import Dropzone from '../../Elements/Dropzone';
import Button from '../../Elements/Button';

const ImportDialog = ({ isHover, handleMouseEnter, handleMouseLeave }) => (
  <>
    <Box sx={{ height: '100%', p: 1 }}>
      <Grid container direction="row" alignItems="center">
        <Typography variant="h5" noWrap to="/" color="textPrimary" mr={30}>
          Download CVS file from{' '}
          <a
            href="/files/CV.csv"
            target="_blank"
            style={{ color: isHover ? 'red' : 'skyblue' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            download
          >
            here
          </a>
        </Typography>
      </Grid>
      <Grid mt={2}>
        <Typography variant="button" fontWeight="bold" textTransform="capitalize">
          Upload Updated CSV:
        </Typography>
        <Dropzone />
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button type="submit" color="info" variant="contained" size="large">
          Upload
        </Button>
      </Box>
    </Box>
  </>
);

export default ImportDialog;
