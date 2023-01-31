import Badge from 'Elements/Badge';

const leaveListData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'leaveType', align: 'center', headerName: 'Leave Type', mobileHeader: 'Leave Type' },
    { name: 'from', align: 'center', headerName: 'From', mobileHeader: 'From' },
    { name: 'to', align: 'center', headerName: 'To', mobileHeader: 'To' },
    { name: 'noOfDays', align: 'center', headerName: 'No Of Days', mobileHeader: 'NOD' },
    { name: 'leaveReason', align: 'center', headerName: 'Reason', mobileHeader: 'Reason' },
    // { name: 'approvedBy', align: 'center', headerName: 'Approved By', mobileHeader: 'Approved By' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],
  adminColumns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'leaveType', align: 'center', headerName: 'Leave Type', mobileHeader: 'Leave Type' },
    { name: 'from', align: 'center', headerName: 'From', mobileHeader: 'From' },
    { name: 'to', align: 'center', headerName: 'To', mobileHeader: 'To' },
    { name: 'noOfDays', align: 'center', headerName: 'No Of Days', mobileHeader: 'NOD' },
    { name: 'leaveReason', align: 'center', headerName: 'Reason', mobileHeader: 'Reason' },
    { name: 'approvedBy', align: 'center', headerName: 'Approved By', mobileHeader: 'Approved By' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  rows: [
    {
      id: 1,
      leaveType: 'Sick Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: 1,
      leaveReason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 2,
      leaveType: 'Loss Of Pay Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: 2,
      leaveReason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="rejected" color="error" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 3,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: 3,
      leaveReason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="pending" color="warning" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 4,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: 4,
      leaveReason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 5,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: 5,
      leaveReason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    }
  ]
};

export default leaveListData;
