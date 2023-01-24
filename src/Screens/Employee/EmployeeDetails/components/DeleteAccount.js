import React, { useState } from 'react';
import { Card, Grid, Switch } from '@mui/material';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';

const DeleteAccount = () => {
  const [isConfirm, setIsConfirm] = useState(false);

  const handleIsConfirmSwitch = () => setIsConfirm(!isConfirm);

  return (
    <Card id="changePassword">
      <Grid container p={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" fontWeight="medium">
            Delete Account
          </Typography>
          <Typography variant="h6" fontWeight="regular">
            Once you delete your account, there is no going back. Please be certain.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} md={6} lg={12}>
          <Grid item alignItems="center">
            <Switch checked={isConfirm} onChange={handleIsConfirmSwitch} />
            <Typography
              variant="button"
              fontWeight="regular"
              onClick={handleIsConfirmSwitch}
              sx={{ cursor: 'pointer', userSelect: 'none', ml: '1%', display: 'inline-block' }}
            >
              Confirm <br /> I want to delete my account.
            </Typography>
          </Grid>
          <Grid container spacing={2} p={2} alignItems="end" justifyContent="flex-end">
            <Grid item>
              <Button color="info" variant="outlined">
                Deactivate
              </Button>
            </Grid>
            <Grid item>
              <Button color="error" variant="contained">
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DeleteAccount;
