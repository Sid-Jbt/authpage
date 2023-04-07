import Badge from 'Elements/Badge';

const leaveListData = {
  columns: [
    // { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'leaveType', align: 'center', headerName: 'Leave', mobileHeader: 'Leave' },
    { name: 'selectType', align: 'center', headerName: 'Leave Type', mobileHeader: 'Type' },
    { name: 'fromDate', align: 'center', headerName: 'From', mobileHeader: 'From' },
    { name: 'toDate', align: 'center', headerName: 'To', mobileHeader: 'To' },
    { name: 'noOfDays', align: 'center', headerName: 'No Of Days', mobileHeader: 'Days' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
    // { name: 'leaveReason', align: 'center', headerName: 'Reason', mobileHeader: 'Reason' },
    // { name: 'approvedBy', align: 'center', headerName: 'Approved By', mobileHeader: 'Approved By' }
  ],

  adminColumns: [
    // { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'firstName', align: 'center', headerName: 'User', mobileHeader: 'user' },
    { name: 'leaveType', align: 'center', headerName: 'Leave', mobileHeader: 'Leave' },
    { name: 'selectType', align: 'center', headerName: 'Leave Type', mobileHeader: 'Type' },
    { name: 'fromDate', align: 'center', headerName: 'From', mobileHeader: 'From' },
    { name: 'toDate', align: 'center', headerName: 'To', mobileHeader: 'To' },
    { name: 'noOfDays', align: 'center', headerName: 'No Of Days', mobileHeader: 'Days' },
    /*  { name: 'leaveReason', align: 'center', headerName: 'Reason', mobileHeader: 'Reason' }, */
    { name: 'approvedBy', align: 'center', headerName: 'Approved By', mobileHeader: 'Approved' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  rows: [
    {
      id: 1,
      leaveType: 'Sick Leave',
      selectType: 'Full Day',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: 1,
      leaveReason: 'Going To Hospital',
      status: (
        <Badge
          variant="gradient"
          badgeContent="pending"
          color="warning"
          size="xs"
          container
          customWidth={100}
        />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 2,
      leaveType: 'Loss Of Pay Leave',
      selectType: 'Full Day',
      from: '05 March 2019',
      to: '07 March 2019',
      noOfDays: 2,
      leaveReason: 'Going To Hospital',
      status: (
        <Badge
          variant="gradient"
          badgeContent="declined"
          color="error"
          size="xs"
          container
          customWidth={100}
        />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 3,
      leaveType: 'Medical Leave',
      selectType: 'Full Day',
      from: '15 June 2019',
      to: '17 June 2019',
      noOfDays: 3,
      leaveReason: 'Going To Hospital',
      status: (
        <Badge
          variant="gradient"
          badgeContent="pending"
          color="warning"
          size="xs"
          container
          customWidth={100}
        />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 4,
      leaveType: 'Earned Leave',
      selectType: 'Full Day',
      from: '20 Sep 2019',
      to: '20 Sep 2019',
      noOfDays: 4,
      leaveReason: 'Earned Leave',
      status: (
        <Badge
          variant="gradient"
          badgeContent="approved"
          color="success"
          size="xs"
          container
          customWidth={100}
        />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 5,
      leaveType: 'Casual Leave',
      selectType: 'Half Day',
      from: '31 Dec 2022',
      to: '01 Jan 2023',
      noOfDays: 5,
      leaveReason: 'Casual Leave',
      status: (
        <Badge
          variant="gradient"
          badgeContent="declined"
          color="error"
          size="xs"
          container
          customWidth={100}
        />
      ),
      approvedBy: 'Suresh Borad'
    }
  ]
};

export default leaveListData;
