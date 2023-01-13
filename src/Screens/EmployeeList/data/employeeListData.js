import Icon from '@mui/material/Icon';
import Typography from 'Elements/Typography';
import logoSpotify from 'Assets/images/logo-spotify.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const action = (
  <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
    <MoreVertIcon />
  </Icon>
);

const empListData = {
  columns: [
    { name: 'empcode', align: 'left' },
    { name: 'name', align: 'left' },
    { name: 'role', align: 'left' },
    { name: 'dob', align: 'center' },
    { name: 'dol', align: 'center' },
    { name: 'action', align: 'center' }
  ],

  rows: [
    {
      empcode: 'empcode-1',
      name: [logoSpotify, 'Spotift'],
      role: (
        <Typography variant="button" color="text" fontWeight="medium">
          Developer
        </Typography>
      ),
      dob: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      dol: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      action
    },
    {
      empcode: 'empcode-2',
      name: [logoSpotify, 'Spotift'],
      role: (
        <Typography variant="button" color="text" fontWeight="medium">
          HR
        </Typography>
      ),
      dob: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      dol: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      action
    },
    {
      empcode: 'empcode-3',
      name: [logoSpotify, 'Spotift'],
      role: (
        <Typography variant="button" color="text" fontWeight="medium">
          Developer
        </Typography>
      ),
      dob: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      dol: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      action
    },
    {
      empcode: 'empcode-4',
      name: [logoSpotify, 'Spotift'],
      role: (
        <Typography variant="button" color="text" fontWeight="medium">
          Developer
        </Typography>
      ),
      dob: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      dol: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      action
    },
    {
      empcode: 'empcode-5',
      name: [logoSpotify, 'Spotift'],
      role: (
        <Typography variant="button" color="text" fontWeight="medium">
          Developer
        </Typography>
      ),
      dob: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      dol: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      action
    },
    {
      empcode: 'empcode-6',
      name: [logoSpotify, 'Spotift'],
      role: (
        <Typography variant="button" color="text" fontWeight="medium">
          Developer
        </Typography>
      ),
      dob: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      dol: (
        <Typography variant="caption" color="text" fontWeight="medium">
          01/02/2023
        </Typography>
      ),
      action
    }
  ]
};

export default empListData;
