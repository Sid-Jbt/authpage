import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import { Error } from '@mui/icons-material';
import Box from '../../Elements/Box';
import Typography from '../../Elements/Typography';
import Dropzone from '../../Elements/Dropzone';
import Button from '../../Elements/Button';
import { SnackbarContext } from '../../Context/SnackbarProvider';

const ImportDialog = ({ isHover, handleMouseEnter, handleMouseLeave, handleDialogClose }) => {
  const { setSnack } = useContext(SnackbarContext);

  const onClickUpload = () => {
    setSnack({
      title: 'Warning',
      message: 'Import feature coming soon...',
      time: false,
      icon: <Error color="white" />,
      color: 'warning',
      open: true
    });
    handleDialogClose();
  };

  return (
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
          <Button
            type="submit"
            color="info"
            variant="contained"
            size="large"
            onClick={() => onClickUpload()}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ImportDialog;
