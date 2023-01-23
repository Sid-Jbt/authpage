import Icon from '@mui/material/Icon';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const action = (
  <Icon sx={{ cursor: 'pointer', fontWeight: 'bold' }} fontSize="small">
    <MoreVertIcon />
  </Icon>
);

const holidayListData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id' },
    { name: 'title', align: 'left', headerName: 'Title' },
    { name: 'holidayDate', align: 'left', headerName: 'Holiday Date' },
    { name: 'day', align: 'left', headerName: 'Day' },
    { name: 'action', align: 'center', headerName: 'Action' }
  ],

  rows: [
    {
      id: '101',
      title: 'New Year',
      holidayDate: '1 Jan 2021',
      day: 'Sunday',
      action
    },
    {
      id: '102',
      title: 'New Year',
      holidayDate: '1 Jan 2021',
      day: 'Sunday',
      action
    },
    {
      id: '103',
      title: 'New Year',
      holidayDate: '1 Jan 2021',
      day: 'Sunday',
      action
    },
    {
      id: '104',
      title: 'New Year',
      holidayDate: '1 Jan 2021',
      day: 'Sunday',
      action
    },
    {
      id: '105',
      title: 'New Year',
      holidayDate: '1 Jan 2021',
      day: 'Sunday',
      action
    },
    {
      id: '106',
      title: 'New Year',
      holidayDate: '1 Jan 2021',
      day: 'Sunday',
      action
    }
  ]
};

export default holidayListData;
