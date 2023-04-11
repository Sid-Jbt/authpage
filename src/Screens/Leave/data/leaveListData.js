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
    { name: 'employee', align: 'center', headerName: 'Employee', mobileHeader: 'Employee' },
    { name: 'leaveType', align: 'center', headerName: 'Leave', mobileHeader: 'Leave' },
    { name: 'selectType', align: 'center', headerName: 'Type', mobileHeader: 'Type' },
    { name: 'fromDate', align: 'center', headerName: 'From', mobileHeader: 'From' },
    { name: 'toDate', align: 'center', headerName: 'To', mobileHeader: 'To' },
    { name: 'noOfDays', align: 'center', headerName: 'Days', mobileHeader: 'Days' },
    /*  { name: 'leaveReason', align: 'center', headerName: 'Reason', mobileHeader: 'Reason' }, */
    { name: 'approvedBy', align: 'center', headerName: 'Endorsed', mobileHeader: 'Endorsed ' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ]
};

export default leaveListData;
