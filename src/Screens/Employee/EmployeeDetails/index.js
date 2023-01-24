import React from 'react';
import {
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { DetailsRounded, DeleteRounded, PasswordRounded } from '@mui/icons-material';
import Header from './components/Header';
import BasicInfo from './components/BasicInfo';
import ChangePassword from './components/ChangePassword';
import DeleteAccount from './components/DeleteAccount';

const EmployeeDetails = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={6} lg={4}>
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { sm } }) => sm
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: '10px' }}>
                <ListItemIcon>
                  <DetailsRounded />
                </ListItemIcon>
                <ListItemText primary="Basic Info" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: '10px' }}>
                <ListItemIcon>
                  <PasswordRounded />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: '10px' }}>
                <ListItemIcon>
                  <DeleteRounded />
                </ListItemIcon>
                <ListItemText primary="Delete Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Card>
    </Grid>
    <Grid item>
      <Header />
    </Grid>
    <Grid item>
      <BasicInfo />
    </Grid>
    <Grid item>
      <ChangePassword />
    </Grid>
    <Grid item>
      <DeleteAccount />
    </Grid>
  </Grid>
);

export default EmployeeDetails;
