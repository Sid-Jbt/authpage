import logoSpotify from 'Assets/logo/jbt-logo.svg';
import Badge from 'Elements/Badge';

const leaveListData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id' },
    { name: 'leaveType', align: 'center', headerName: 'Leave Type' },
    { name: 'from', align: 'center', headerName: 'From' },
    { name: 'to', align: 'center', headerName: 'To' },
    { name: 'noOfDays', align: 'center', headerName: 'No Of Days' },
    { name: 'reason', align: 'center', headerName: 'Reason' },
    { name: 'status', align: 'center', headerName: 'Status' },
    { name: 'approvedBy', align: 'center', headerName: 'Approved By' }
  ],

  rows: [
    {
      id: 0,
      leaveType: 'Sick Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: [logoSpotify, 'Suresh Borad']
    },
    {
      id: 1,
      leaveType: 'Loss Of Pay Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="rejected" color="error" size="xs" container />
      ),
      approvedBy: [logoSpotify, 'Suresh Borad']
    },
    {
      id: 2,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="pending" color="warning" size="xs" container />
      ),
      approvedBy: [logoSpotify, 'Suresh Borad']
    },
    {
      id: 3,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: [logoSpotify, 'Suresh Borad']
    },
    {
      id: 4,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: [logoSpotify, 'Suresh Borad']
    }
  ]
};

export default leaveListData;
