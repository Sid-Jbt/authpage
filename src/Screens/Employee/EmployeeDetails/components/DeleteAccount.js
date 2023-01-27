import React, { useState } from 'react';
import { Card, Switch } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';

const DeleteAccount = () => {
  const [visibility, setVisibility] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleSetVisibility = () => setVisibility(!visibility);
  const handleSetDelete = () => setIsDelete(!isDelete);

  return (
    <Card id="delete-account">
      <Box p={3} lineHeight={1}>
        <Box mb={1}>
          <Typography variant="h5">Delete Account</Typography>
        </Box>
        <Typography variant="button" color="text" fontWeight="regular">
          Once you delete your account, there is no going back. Please be certain.
        </Typography>
      </Box>
      <Box
        pb={3}
        px={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box display="flex" alignItems="center" mb={{ xs: 3, sm: 0 }}>
          <Switch checked={visibility} onChange={handleSetVisibility} />
          <Box ml={2} lineHeight={0} sx={{ cursor: 'pointer' }} onClick={handleSetVisibility}>
            <Typography display="block" variant="button" fontWeight="medium">
              Visibility
            </Typography>
            <Typography variant="caption" color="text">
              User Visibility switch.
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 3, sm: 0 }}>
          <Switch checked={isDelete} onChange={handleSetDelete} />
          <Box ml={2} lineHeight={0} sx={{ cursor: 'pointer' }} onClick={handleSetDelete}>
            <Typography display="block" variant="button" fontWeight="medium">
              Confirm
            </Typography>
            <Typography variant="caption" color="text">
              I want to delete my account.
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
          <Button variant="outlined" color="secondary">
            Deactivate
          </Button>
          <Box ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
            <Button variant="gradient" color="error" sx={{ height: '100%' }}>
              Delete Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default DeleteAccount;
