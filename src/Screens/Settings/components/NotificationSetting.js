import React, { useContext, useState } from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Card, Grid, Switch } from '@mui/material';
import { SnackbarContext } from 'Context/SnackbarProvider';
import Button from 'Elements/Button';

const NotificationSetting = () => {
  const { setSnack } = useContext(SnackbarContext);
  const [isEmail, setIsEmail] = useState(false);
  const [isPush, setIsPush] = useState(false);
  const [isNotice, setIsNotice] = useState(false);
  const [isEvent, setIsEvent] = useState(false);

  const handleSetIsEmail = () => setIsEmail(!isEmail);

  const handleSetIsPush = () => setIsPush(!isPush);

  const handleSetIsNotice = () => setIsNotice(!isNotice);

  const handleSetIsEvent = () => setIsEvent(!isEvent);

  const handleUpdateSettings = () => {
    setSnack({
      title: 'Success',
      message: 'Notification settings updated successfully',
      time: false,
      color: 'success',
      open: true
    });
  };

  return (
    <Card id="notification-setting">
      <Box p={3} pb={0}>
        <Typography variant="h5">Notification Settings</Typography>
      </Box>
      <Grid container spacing={1} p={2} justifyContent="flex-end">
        <Grid item xs={12} md={6} lg={6}>
          <Box mt={0.5}>
            <Switch checked={isEmail} onChange={handleSetIsEmail} />
            <Typography
              variant="button"
              fontWeight="regular"
              onClick={handleSetIsEmail}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              &nbsp;&nbsp;Email Notification {isEmail ? 'On' : 'Off'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box mt={0.5}>
            <Switch checked={isPush} onChange={handleSetIsPush} />
            <Typography
              variant="button"
              fontWeight="regular"
              onClick={handleSetIsPush}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              &nbsp;&nbsp;Push Notification {isPush ? 'On' : 'Off'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box mt={0.5}>
            <Switch checked={isNotice} onChange={handleSetIsNotice} />
            <Typography
              variant="button"
              fontWeight="regular"
              onClick={handleSetIsNotice}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              &nbsp;&nbsp;Notice Notification {isNotice ? 'On' : 'Off'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box mt={0.5}>
            <Switch checked={isEvent} onChange={handleSetIsEvent} />
            <Typography
              variant="button"
              fontWeight="regular"
              onClick={handleSetIsEvent}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              &nbsp;&nbsp;Event Notification {isEvent ? 'On' : 'Off'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4} textAlign="end">
          <Button
            variant="gradient"
            color="dark"
            size="small"
            type="submit"
            onClick={handleUpdateSettings}
            disabled={!isEmail && !isPush && !isNotice && !isEvent}
          >
            Update Notification Settings
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default NotificationSetting;
