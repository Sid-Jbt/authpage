import Badge from 'Elements/Badge';

const expenseListData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'itemName', align: 'center', headerName: 'Item Name', mobileHeader: 'Item' },
    { name: 'purchaseFrom', align: 'center', headerName: 'Purchase From', mobileHeader: 'From' },
    { name: 'purchaseDate', align: 'center', headerName: 'Purchase Date', mobileHeader: 'Date' },
    { name: 'amount', align: 'center', headerName: 'Amount', mobileHeader: 'Amount' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  adminColumns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'itemName', align: 'center', headerName: 'Item Name', mobileHeader: 'Item' },
    { name: 'name', align: 'left', headerName: 'Name', mobileHeader: 'Name' },
    { name: 'purchaseFrom', align: 'center', headerName: 'Purchase From', mobileHeader: 'From' },
    { name: 'purchaseDate', align: 'center', headerName: 'Purchase Date', mobileHeader: 'Date' },
    { name: 'amount', align: 'center', headerName: 'Amount', mobileHeader: 'Amount' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  rows: [
    {
      id: '101',
      title: 'Water bill',
      name: 'Sonika',
      purchaseFrom: 'local',
      purchaseDate: '25/02/2023',
      amount: '350',
      status: (
        <Badge
          variant="gradient"
          badgeContent="approved"
          color="success"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: '102',
      title: 'Birthday decoration',
      name: 'Hinal',
      purchaseFrom: 'local store',
      purchaseDate: '01/02/2023',
      amount: '500',
      status: (
        <Badge
          variant="gradient"
          badgeContent="declined"
          color="error"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: '103',
      title: 'Office cleaning',
      name: 'Hetali',
      purchaseFrom: 'Other',
      purchaseDate: '10/05/2023',
      amount: '1000',
      status: (
        <Badge
          variant="gradient"
          badgeContent="pending"
          color="warning"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: '104',
      title: 'Water bill',
      name: 'Hiren',
      purchaseFrom: 'local',
      purchaseDate: '01/10/2023',
      amount: '350',
      status: (
        <Badge
          variant="gradient"
          badgeContent="approved"
          color="success"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: '105',
      title: 'Birthday decoration',
      name: 'Bhavy',
      purchaseFrom: 'local store',
      purchaseDate: '28/02/2023',
      amount: '500',
      status: (
        <Badge
          variant="gradient"
          badgeContent="declined"
          color="error"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: '106',
      title: 'Office cleaning',
      name: 'Mridul',
      purchaseFrom: 'Other',
      purchaseDate: '10/09/2023',
      amount: '1000',
      status: (
        <Badge
          variant="gradient"
          badgeContent="pending"
          color="warning"
          size="xs"
          container
          customWidth={100}
        />
      )
    }
  ]
};

export default expenseListData;
