import Icon from '@mui/material/Icon';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const action = (
  <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
    <MoreVertIcon />
  </Icon>
);

const leaveListData = {
  columns: [
    { name: 'leaveType', align: 'center', headerName: 'Leave Type' },
    { name: 'from', align: 'center', headerName: 'From' },
    { name: 'to', align: 'center', headerName: 'To' },
    { name: 'noOfDays', align: 'center', headerName: 'No Of Days' },
    { name: 'reason', align: 'center', headerName: 'Reason' },
    { name: 'status', align: 'center', headerName: 'Status' },
    { name: 'approvedBy', align: 'center', headerName: 'Approved By' },
    { name: 'action', align: 'center', headerName: 'Action' }
  ],

  rows: [
    {
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: 'Approved',
      approvedBy: 'Suresh Borad',
      action
    }
  ]
};

export default leaveListData;
