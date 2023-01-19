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
      action
    },
    {
      id: '2',
      empcode: 'empcode-2',
      name: [logoSpotify, 'Spotift'],
      role: 'HR',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '3',
      empcode: 'empcode-3',
      name: [logoSpotify, 'Spotift'],
      role: 'CEO',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '4',
      empcode: 'empcode-4',
      name: [logoSpotify, 'Spotift'],
      role: 'Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '5',
      empcode: 'empcode-5',
      name: [logoSpotify, 'Spotift'],
      role: 'Super Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '6',
      empcode: 'empcode-6',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },

    {
      id: '7',
      empcode: 'empcode-1',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '8',
      empcode: 'empcode-2',
      name: [logoSpotify, 'Spotift'],
      role: 'HR',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '9',
      empcode: 'empcode-3',
      name: [logoSpotify, 'Spotift'],
      role: 'CEO',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '10',
      empcode: 'empcode-4',
      name: [logoSpotify, 'Spotift'],
      role: 'Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '11',
      empcode: 'empcode-5',
      name: [logoSpotify, 'Spotift'],
      role: 'Super Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    },
    {
      id: '12',
      empcode: 'empcode-6',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023',
      action
    }
  ]
};

export default empListData;
