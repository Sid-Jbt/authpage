import Icon from '@mui/material/Icon';
import logoSpotify from 'Assets/logo/jbt-logo.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const action = (
  <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
    <MoreVertIcon />
  </Icon>
);

const empListData = {
  columns: [
    { name: 'name', align: 'center', headerName: 'Name' },
    { name: 'empcode', align: 'center', headerName: 'Emp Code' },
    { name: 'role', align: 'center', headerName: 'Role' },
    { name: 'dob', align: 'center', headerName: 'Date Of Birth' },
    { name: 'dol', align: 'center', headerName: 'Date Of Leave' },
    { name: 'action', align: 'center', headerName: 'Action' }
  ],

  rows: [
    {
      empcode: 'empcode-1',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-2',
      name: [logoSpotify, 'Spotift'],
      role: 'HR',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-3',
      name: [logoSpotify, 'Spotift'],
      role: 'CEO',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-4',
      name: [logoSpotify, 'Spotift'],
      role: 'Admin',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-5',
      name: [logoSpotify, 'Spotift'],
      role: 'Super Admin',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-6',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },

    {
      empcode: 'empcode-1',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-2',
      name: [logoSpotify, 'Spotift'],
      role: 'HR',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-3',
      name: [logoSpotify, 'Spotift'],
      role: 'CEO',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-4',
      name: [logoSpotify, 'Spotift'],
      role: 'Admin',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-5',
      name: [logoSpotify, 'Spotift'],
      role: 'Super Admin',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      empcode: 'empcode-6',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      dol: '01/02/2023',
      action
    }
  ]
};

export default empListData;
