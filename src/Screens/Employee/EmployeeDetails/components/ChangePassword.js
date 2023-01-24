import { Card, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';

const ChangePassword = () => {
  const passwordRequirements = [
    'One special characters',
    'Min 6 characters',
    'One number (2 are recommended)',
    'Change it often'
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <Box key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <Typography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </Typography>
      </Box>
    );
  });

  return (
    <Card id="change-password">
      <Box p={3}>
        <Typography variant="h5">Change Password</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Input
              label="Current password"
              placeholder="Current Password"
              inputProps={{ type: 'password', autoComplete: '' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="New password"
              placeholder="New Password"
              inputProps={{ type: 'password', autoComplete: '' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Confirm New Password"
              placeholder="Confirm Password"
              inputProps={{ type: 'password', autoComplete: '' }}
            />
          </Grid>
        </Grid>
        <Box mt={2} mb={1}>
          <Typography variant="h5">Password requirements</Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="body2" color="text">
            Please follow this guide for a strong password
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <Box component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </Box>
          <Box ml="auto">
            <Button variant="gradient" color="dark" size="small">
              Update Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ChangePassword;
