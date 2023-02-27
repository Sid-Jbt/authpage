import React, { useState, useRef, useEffect } from 'react';
import Typography from 'Elements/Typography';
import team2 from 'Assets/Images/bruce-mars.jpg';
import { Card, Grid, Tab, Tabs, Icon } from '@mui/material';
import { AccountBalance, Edit, PersonOutlined } from '@mui/icons-material';
import Avatar from 'Elements/Avatar';
import { useSelector } from 'react-redux';
import Box from 'Elements/Box';
import Button from 'Elements/Button';

const Header = ({
  tabIndex,
  tabsOrientation,
  handleSetTabIndex,
  profileUpdate,
  employeeProfileDetails
}) => {
  const { firstName, lastName, designation } = employeeProfileDetails.profile;
  const { role } = useSelector((state) => state.route);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const inputFile = useRef(null);

  useEffect(() => {
    if (employeeProfileDetails !== null)
      setProfilePicUrl(employeeProfileDetails.profile.profilePic);
  }, [profilePicUrl]);

  const profilePicUpload = (e) => {
    const file = e.target.files[0];
    profileUpdate(file);
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
              src={profilePicUrl === '' ? team2 : profilePicUrl}
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
            {firstName} {lastName}
          </Typography>
          <Typography variant="subtitle2" color="text" fontWeight="light">
            {designation}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ ml: 'auto' }}>
          {role === 'admin' ? (
            <Tabs
              orientation={tabsOrientation}
              value={tabIndex}
              onChange={(event, value) => handleSetTabIndex(event, value)}
            >
              <Tab label="Personal" icon={<PersonOutlined style={{ marginRight: '8px' }} />} />
            </Tabs>
          ) : (
            <Tabs
              orientation={tabsOrientation}
              value={tabIndex}
              onChange={(event, value) => handleSetTabIndex(event, value)}
            >
              <Tab label="Personal" icon={<PersonOutlined style={{ marginRight: '8px' }} />} />
              <Tab label="Account" icon={<AccountBalance style={{ marginRight: '8px' }} />} />
              {/* <Tab label="Salary" icon={<CurrencyRupeeOutlined style={{ marginRight: '8px' }} />} /> */}
            </Tabs>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};
export default Header;
