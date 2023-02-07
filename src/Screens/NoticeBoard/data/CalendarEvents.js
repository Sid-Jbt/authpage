const CalendarEventsData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'title', align: 'center', headerName: 'Event Title', mobileHeader: 'Title' },
    { name: 'start', align: 'center', headerName: 'Start', mobileHeader: 'Start' },
    { name: 'end', align: 'center', headerName: 'End', mobileHeader: 'End' },
    { name: 'className', align: 'center', headerName: 'Event Type', mobileHeader: 'Type' }
  ],
  rows: [
    {
      id: '101',
      title: 'All day conference',
      start: '2023-02-01',
      end: '2023-02-01',
      className: 'success'
    },
    {
      id: '102',
      title: 'Meeting with Mary',
      start: '2023-02-05',
      end: '2023-02-05',
      className: 'info'
    },
    {
      id: '103',
      title: 'Cyber Day',
      start: '2023-02-10',
      end: '2023-02-10',
      className: 'warning'
    },
    {
      id: '104',
      title: 'Winter Hackaton',
      start: '2023-02-15',
      end: '2023-02-15',
      className: 'error'
    },
    {
      id: '105',
      title: 'Digital event',
      start: '2023-02-18',
      end: '2023-02-18',
      className: 'warning'
    },
    {
      id: '106',
      title: 'Marketing event',
      start: '2023-02-21',
      end: '2023-02-21',
      className: 'primary'
    },
    {
      id: '107',
      title: 'Dinner with Family',
      start: '2023-02-28',
      end: '2023-02-28',
      className: 'error'
    }
  ]
};

export default CalendarEventsData;
