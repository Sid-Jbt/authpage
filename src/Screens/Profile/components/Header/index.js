import React, { useState, useRef } from 'react';
import Typography from 'Elements/Typography';
import UserPic from 'Assets/Images/no-profile.png';
import { Card, Grid, Tab, Tabs, Icon } from '@mui/material';
import { AccountBalance, CurrencyRupeeOutlined, Edit, PersonOutlined } from '@mui/icons-material';
import Avatar from 'Elements/Avatar';
import Box from 'Elements/Box';
import Button from 'Elements/Button';

const Header = ({ tabIndex, handleSetTabIndex, role }) => {
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const inputFile = useRef(null);

  const profilePicUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProfilePicUrl(url);
  };

  return (
    <Card
      sx={{
        py: 2,
        px: 2,
        boxShadow: ({ boxShadows: { sm } }) => sm
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Box position="relative" height="max-content" mx="auto">
            <Avatar
              src={profilePicUrl === '' ? UserPic : profilePicUrl}
              alt="profile picture"
              size="xl"
              variant="rounded"
            />
            <input ref={inputFile} type="file" hidden onChange={(e) => profilePicUpload(e)} />
            <Box alt="spotify logo" position="absolute" pl={5.5} bottom={0} mr={-1} mb={-1}>
              <Button
                variant="gradient"
                color="light"
                component="label"
                onClick={() => inputFile.current && inputFile.current.click()}
                iconOnly
                sx={{
                  width: '2rem',
                  minWidth: '2rem',
                  height: '2rem',
                  minHeight: '2rem'
                }}
              >
                <Icon>
                  <Edit />
                </Icon>
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="h4" fontWeight="medium">
            Full Name
          </Typography>
          <Typography variant="subtitle2" color="text" fontWeight="light">
            Designation
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ ml: 'auto' }}>
          <Tabs value={tabIndex} onChange={(event, value) => handleSetTabIndex(event, value)}>
            <Tab label="Personal" icon={<PersonOutlined style={{ marginRight: '8px' }} />} />
            {role === 'admin' && (
              <>
                <Tab label="Account" icon={<AccountBalance style={{ marginRight: '8px' }} />} />
                <Tab
                  label="Salary"
                  icon={<CurrencyRupeeOutlined style={{ marginRight: '8px' }} />}
                />
              </>
            )}
          </Tabs>
        </Grid>
      </Grid>
    </Card>
  );
};
export default Header;
