const expenseListData = {
  columns: [
    /* { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' }, */
    { name: 'itemName', align: 'center', headerName: 'Item Name', mobileHeader: 'Item' },
    { name: 'purchaseFrom', align: 'center', headerName: 'Purchase From', mobileHeader: 'From' },
    { name: 'purchaseDate', align: 'center', headerName: 'Purchase Date', mobileHeader: 'Date' },
    { name: 'amount', align: 'center', headerName: 'Amount', mobileHeader: 'Amount' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  adminColumns: [
    /* { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' }, */
    { name: 'itemName', align: 'center', headerName: 'Item Name', mobileHeader: 'Item' },
    { name: 'name', align: 'left', headerName: 'Name', mobileHeader: 'Name' },
    { name: 'purchaseFrom', align: 'center', headerName: 'Purchase From', mobileHeader: 'From' },
    { name: 'purchaseDate', align: 'center', headerName: 'Purchase Date', mobileHeader: 'Date' },
    { name: 'amount', align: 'center', headerName: 'Amount', mobileHeader: 'Amount' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ]
};

export default expenseListData;
