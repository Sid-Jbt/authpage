import Icon from '@mui/material/Icon';
import logoSpotify from 'Assets/logo/jbt-logo.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Action = ({ id }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleCloseMenu} variant="contained" component={Link} to="/employee/1">
        View
      </MenuItem>
      <MenuItem onClick={handleCloseMenu} variant="contained" component={Link} to="/employee/1">
        Edit
      </MenuItem>
      <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
    </Menu>
  );
  return (
    <Icon
      id={id}
      sx={{ cursor: 'pointer', fontWeight: 'bold' }}
      fontSize="small"
      onClick={handleOpenMenu}
    >
      <MoreVertIcon />
      {renderMenu()}
    </Icon>
  );
};

const empListData = {
  columns: [
    { id: 'name', name: 'name', align: 'center', headerName: 'Name', mobileHeader: 'Name' },
    {
      id: 'empcode',
      name: 'empcode',
      align: 'center',
      headerName: 'Emp Code',
      mobileHeader: 'ECode'
    },
    { id: 'role', name: 'role', align: 'center', headerName: 'Role', mobileHeader: 'Role' },
    { id: 'dob', name: 'dob', align: 'center', headerName: 'Date Of Birth', mobileHeader: 'Dob' },
    { id: 'doj', name: 'doj', align: 'center', headerName: 'Date Of Join', mobileHeader: 'Doj' },
    { id: 'dol', name: 'dol', align: 'center', headerName: 'Date Of Leave', mobileHeader: 'Dol' },
    { id: 'action', name: 'action', align: 'center', headerName: 'Action', mobileHeader: 'Action' }
  ],

  rows: [
    {
      id: '1',
      empcode: 'empcode-1',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action: <Action id={1} />
    },
    {
      id: '2',
      empcode: 'empcode-2',
      name: [logoSpotify, 'Spotift'],
      role: 'HR',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action: <Action id={2} />
    },
    {
      id: '3',
      empcode: 'empcode-3',
      name: [logoSpotify, 'Spotift'],
      role: 'CEO',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action: <Action id={3} />
    },
    {
      id: '4',
      empcode: 'empcode-4',
      name: [logoSpotify, 'Spotift'],
      role: 'Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action: <Action id={4} />
    },
    {
      id: '5',
      empcode: 'empcode-5',
      name: [logoSpotify, 'Spotift'],
      role: 'Super Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action: <Action id={5} />
    }
  ]
};

export default empListData;
