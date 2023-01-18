import Badge from 'Elements/Badge';
import Icon from '@mui/material/Icon';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const action = (
  <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
    <MoreVertIcon />
  </Icon>
);

const expenseListData = {
  columns: [
    { name: 'name', align: 'center' },
    { name: 'title', align: 'center' },
    { name: 'purchase From', align: 'center' },
    { name: 'purchase Date', align: 'center' },
    { name: 'amount', align: 'center' },
    { name: 'status', align: 'center' },
    { name: 'action', align: 'center' }
  ],

  rows: [
    {
      title: 'Water bill',
      name: 'Sonika',
      'purchase From': 'local',
      'purchase Date': '01/02/2023',
      amount: '350',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action
    },
    {
      title: 'Birthday decoration',
      name: 'Hinal',
      'purchase From': 'local store',
      'purchase Date': '01/02/2023',
      amount: '500',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action
    },
    {
      title: 'Office cleaning',
      name: 'Hetali',
      'purchase From': 'Other',
      'purchase Date': '01/02/2023',
      amount: '1000',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action
    },
    {
      title: 'Water bill',
      name: 'Hiren',
      'purchase From': 'local',
      'purchase Date': '01/02/2023',
      amount: '350',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action
    },
    {
      title: 'Birthday decoration',
      name: 'Bhavy',
      'purchase From': 'local store',
      'purchase Date': '01/02/2023',
      amount: '500',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action
    },
    {
      title: 'Office cleaning',
      name: 'Mridul',
      'purchase From': 'Other',
      'purchase Date': '01/02/2023',
      amount: '1000',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action
    }
  ]
};

export default expenseListData;
