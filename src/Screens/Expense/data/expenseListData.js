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
    { name: 'id', align: 'center', headerName: 'Id' },
    { name: 'title', align: 'center', headerName: 'Title' },
    { name: 'name', align: 'left', headerName: 'Name' },
    { name: 'purchase From', align: 'center', headerName: 'Purchase From' },
    { name: 'purchase Date', align: 'center', headerName: 'Purchase Date' },
    { name: 'amount', align: 'center', headerName: 'Amount' },
    { name: 'status', align: 'center', headerName: 'Status' },
    { name: 'action', align: 'center', headerName: 'Action' }
  ],

  rows: [
    {
      id: '101',
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
      id: '102',
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
      id: '103',
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
      id: '104',
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
      id: '105',
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
      id: '106',
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
