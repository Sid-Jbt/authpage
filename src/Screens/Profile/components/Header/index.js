import React, { useState, useRef, useEffect } from 'react';
import Typography from 'Elements/Typography';
import UserPic from 'Assets/Images/team-4-800x800.jpg';
import { Card, Grid, Tab, Tabs, Icon } from '@mui/material';
import Avatar from 'Elements/Avatar';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import { Edit } from '@mui/icons-material';
import { useOutletContext } from 'react-router';
import { withStateDispatch } from 'Helpers/withStateDispatch';

const Header = ({ tabIndex, handleSetTabIndex, TabsList, GetDashboard }) => {
  const { role, user, GetProfileSetup } = useOutletContext();
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const inputFile = useRef(null);

  useEffect(() => {
    if (user.profile.profilePic && user.profile.profilePic !== '') {
      setProfilePicUrl(user.profile.profilePic);
    } else {
      setProfilePicUrl(UserPic);
    }
  }, [user, profilePicUrl]);

  const profilePicUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    GetProfileSetup({ profilePic: file }, (res) => {
      const { status } = res.data;
      if (status) {
        setProfilePicUrl(url);
        GetDashboard();
      } else {
        setProfilePicUrl(UserPic);
      }
    });
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
            <Avatar src={profilePicUrl} alt="profile picture" size="xl" variant="rounded" />
            <input
              ref={inputFile}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => profilePicUpload(e)}
            />
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
            {`${user.profile.firstName} ${user.profile.lastName}`}
          </Typography>
          <Typography variant="subtitle2" color="text" fontWeight="light">
            {user.profile.designation}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={5} sx={{ ml: 'auto' }}>
          <Tabs value={tabIndex} onChange={(event, value) => handleSetTabIndex(event, value)}>
            {TabsList &&
              TabsList.map(
                (item, index) =>
                  item.role.includes(role) && (
                    <Tab key={index} label={item.title} icon={item.icon} />
                  )
              )}
          </Tabs>
        </Grid>
      </Grid>
    </Card>
  );
};
export default withStateDispatch(Header);
