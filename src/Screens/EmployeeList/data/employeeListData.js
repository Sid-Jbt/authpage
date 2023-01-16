import Icon from '@mui/material/Icon';
import logoSpotify from 'Assets/images/logo-spotify.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const action = (
  <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
    <MoreVertIcon />
  </Icon>
);

const empListData = {
  columns: [
    { name: 'name', align: 'left' },
    { name: 'empcode', align: 'center' },
    { name: 'role', align: 'center' },
    { name: 'dob', align: 'center' },
    { name: 'dol', align: 'center' },
    { name: 'action', align: 'center' }
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
    }
  ]
};

export default empListData;
