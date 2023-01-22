import Icon from '@mui/material/Icon';
import logoSpotify from 'Assets/logo/jbt-logo.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

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
      <MenuItem onClick={handleCloseMenu}>Action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Another action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Something else here</MenuItem>
    </Menu>
  );
  return (
    <>
      <Icon
        id={id}
        sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        fontSize="small"
        onClick={handleOpenMenu}
      >
        <MoreVertIcon />
      </Icon>
      {renderMenu()}
    </>
  );
};

const empListData = {
  columns: [
    { id: 'name', name: 'name', align: 'center', headerName: 'Name' },
    { id: 'empcode', name: 'empcode', align: 'center', headerName: 'Emp Code' },
    { id: 'role', name: 'role', align: 'center', headerName: 'Role' },
    { id: 'dob', name: 'dob', align: 'center', headerName: 'Date Of Birth' },
    { id: 'doj', name: 'doj', align: 'center', headerName: 'Date Of Join' },
    { id: 'dol', name: 'dol', align: 'center', headerName: 'Date Of Leave' },
    { id: 'action', name: 'action', align: 'center', headerName: 'Action' }
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
