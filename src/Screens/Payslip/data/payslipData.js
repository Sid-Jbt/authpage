import Icon from '@mui/material/Icon';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const onClickAction = () => {};

const action = (
  <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
    <FileDownloadIcon onClick={onClickAction} />
  </Icon>
);

const empListData = {
  columns: [
    { id: 'sl', name: 'sl', align: 'center', headerName: 'Sl', mobileHeader: 'Sl' },
    {
      id: 'paymentMonth',
      name: 'paymentMonth',
      align: 'center',
      headerName: 'Payment Month',
      mobileHeader: 'Month'
    },
    {
      id: 'paymentDate',
      name: 'paymentDate',
      align: 'center',
      headerName: 'Payment Date',
      mobileHeader: 'Date'
    },
    {
      id: 'paidAmount',
      name: 'paidAmount',
      align: 'center',
      headerName: 'Paid Amount',
      mobileHeader: 'Amount'
    },
    {
      id: 'paymentType',
      name: 'paymentType',
      align: 'center',
      headerName: 'Payment Type',
      mobileHeader: 'Type'
    },
    { id: 'action', name: 'action', align: 'center', headerName: 'Action', mobileHeader: 'Action' }
  ],

  adminColumns: [
    { id: 'sl', name: 'sl', align: 'center', headerName: 'Sl', mobileHeader: 'Sl' },
    {
      id: 'email',
      name: 'email',
      align: 'center',
      headerName: 'Email',
      mobileHeader: 'Email'
    },
    {
      id: 'paymentMonth',
      name: 'paymentMonth',
      align: 'center',
      headerName: 'Payment Month',
      mobileHeader: 'Month'
    },
    {
      id: 'paymentDate',
      name: 'paymentDate',
      align: 'center',
      headerName: 'Payment Date',
      mobileHeader: 'Date'
    },
    {
      id: 'paidAmount',
      name: 'paidAmount',
      align: 'center',
      headerName: 'Paid Amount',
      mobileHeader: 'Amount'
    },
    {
      id: 'paymentType',
      name: 'paymentType',
      align: 'center',
      headerName: 'Payment Type',
      mobileHeader: 'Type'
    },
    { id: 'action', name: 'action', align: 'center', headerName: 'Action', mobileHeader: 'Action' }
  ],

  rows: [
    {
      id: '1',
      sl: '1',
      email: 'hr@testmail.com',
      paymentMonth: 'October, 2020',
      paymentDate: '10 Oct 2020',
      paidAmount: 25000,
      paymentType: 'Cheque',
      action
    },
    {
      id: '2',
      sl: '2',
      email: 'rose@testmail.com',
      paymentMonth: 'November, 2020',
      paymentDate: '10 Nov 2020',
      paidAmount: 30000,
      paymentType: 'Bank Transfer',
      action
    },
    {
      id: '3',
      sl: '3',
      email: 'marry@testmail.com',
      paymentMonth: 'December, 2020',
      paymentDate: '10 Dec 2020',
      paidAmount: 25000,
      paymentType: 'Bank Transfer',
      action
    },
    {
      id: '4',
      sl: '4',
      email: 'john@testmail.com',
      paymentMonth: 'January, 2021',
      paymentDate: '10 Jan 2020',
      paidAmount: 15000,
      paymentType: 'Bank Transfer',
      action
    },
    {
      id: '5',
      sl: '5',
      email: 'abu@testmail.com',
      paymentMonth: 'February, 2021',
      paymentDate: '10 Feb 2020',
      paidAmount: 25000,
      paymentType: 'Bank Transfer',
      action
    },
    {
      id: '6',
      sl: '6',
      email: 'ravi@testmail.com',
      paymentMonth: 'March, 2021',
      paymentDate: '10 Mar 2020',
      paidAmount: 35000,
      paymentType: 'Cash',
      action
    },
    {
      id: '7',
      sl: '7',
      email: 'admin@testmail.com',
      paymentMonth: 'April, 2021',
      paymentDate: '10 Apr 2020',
      paidAmount: 37500,
      paymentType: 'Cheque',
      action
    },
    {
      id: '8',
      sl: '8',
      email: 'rahul@testmail.com',
      paymentMonth: 'May, 2021',
      paymentDate: '10 May 2020',
      paidAmount: 25500,
      paymentType: 'Cash',
      action
    },
    {
      id: '9',
      sl: '9',
      email: 'jenny@testmail.com',
      paymentMonth: 'May, 2021',
      paymentDate: '10 May 2020',
      paidAmount: 25500,
      paymentType: 'Cash',
      action
    },
    {
      id: '10',
      sl: '10',
      email: 'mayur@testmail.com',
      paymentMonth: 'May, 2021',
      paymentDate: '10 May 2020',
      paidAmount: 25500,
      paymentType: 'Cash',
      action
    },
    {
      id: '11',
      sl: '11',
      email: 'Cavin@testmail.com',
      paymentMonth: 'May, 2021',
      paymentDate: '10 May 2020',
      paidAmount: 25500,
      paymentType: 'Cash',
      action
    }
  ]
};

export default empListData;
