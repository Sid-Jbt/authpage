import Badge from 'Elements/Badge';

const expenseListData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'title', align: 'center', headerName: 'Title', mobileHeader: 'Title' },
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
      purchaseDate: '01/02/2023',
      amount: '350',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
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
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
    },
    {
      id: '103',
      title: 'Office cleaning',
      name: 'Hetali',
      purchaseFrom: 'Other',
      purchaseDate: '01/02/2023',
      amount: '1000',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
    },
    {
      id: '104',
      title: 'Water bill',
      name: 'Hiren',
      purchaseFrom: 'local',
      purchaseDate: '01/02/2023',
      amount: '350',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
    },
    {
      id: '105',
      title: 'Birthday decoration',
      name: 'Bhavy',
      purchaseFrom: 'local store',
      purchaseDate: '01/02/2023',
      amount: '500',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
    },
    {
      id: '106',
      title: 'Office cleaning',
      name: 'Mridul',
      purchaseFrom: 'Other',
      purchaseDate: '01/02/2023',
      amount: '1000',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
    }
  ]
};

export default expenseListData;
