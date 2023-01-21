import React from 'react';
import Box from 'Elements/Box';
import CustomSelect from 'Elements/Select';
import { Icon } from '@mui/material';

const DashboardDefault = () => (
  <Box py={3}>
    Dashboard Default <CustomSelect />
    <Icon>folder</Icon>
  </Box>
);

export default DashboardDefault;
