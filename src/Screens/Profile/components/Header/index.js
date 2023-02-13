import Typography from 'Elements/Typography';
import { Card, Grid, Tab, Tabs } from '@mui/material';
import { AccountBalance, CurrencyRupeeOutlined, Edit, PersonOutlined } from '@mui/icons-material';
import Avatar from 'Elements/Avatar';
import { useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import Box from 'Elements/Box';
import team2 from 'Assets/Images/bruce-mars.jpg';
import Button from 'Elements/Button';
import Icon from '@mui/material/Icon';

const Header = ({ tabIndex, tabsOrientation, handleSetTabIndex }) => {
  const { role } = useSelector((state) => state.route);
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
        <Grid item xs={12} sm={3}>
          <Box position="relative" height="max-content" mx="auto">
            <Box>
              <input ref={inputFile} type="file" hidden onChange={(e) => profilePicUpload(e)} />
              <Avatar
                src={profilePicUrl === '' ? team2 : profilePicUrl}
                alt="profile picture"
                size="xxl"
                variant="rounded"
              />
              <Box alt="spotify logo" position="absolute" pl={11} bottom={0} mr={-1} mb={-1}>
                <Button
                  variant="gradient"
                  color="light"
                  component="label"
                  onClick={() => inputFile.current && inputFile.current.click()}
                  iconOnly
                >
                  <Icon>
                    <Edit />
                  </Icon>
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item ml={-28}>
          <Typography variant="h4" fontWeight="medium">
            Suresh Borad
          </Typography>
          <Typography variant="subtitle2" color="text" fontWeight="light">
            CEO / Co-Founder
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
              <Tab label="Salary" icon={<CurrencyRupeeOutlined style={{ marginRight: '8px' }} />} />
            </Tabs>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};
export default Header;
