import Badge from 'Elements/Badge';

const supportTicketData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'email', align: 'center', headerName: 'Email', mobileHeader: 'Email' },
    { name: 'subject', align: 'center', headerName: 'Subject', mobileHeader: 'Subject' },
    { name: 'date', align: 'center', headerName: 'Date', mobileHeader: 'Date' },
    { name: 'priority', align: 'center', headerName: 'Priority', mobileHeader: 'Priority' },
    { name: 'assign', align: 'center', headerName: 'Assign', mobileHeader: 'Assign' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  rows: [
    {
      id: '1',
      email: 'abc@jarvisbitz.com',
      subject: 'System requirement',
      date: '1/1/2023',
      priority: 'High',
      assign: 'John',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
      // action: <Action id={1} />
    },
    {
      id: '2',
      email: 'abc@jarvisbitz.com',
      subject: 'Internet Issue',
      date: '2/1/2023',
      priority: 'medium',
      assign: 'Jackey',
      status: <Badge variant="gradient" badgeContent="approved" color="error" size="xs" container />
    },
    {
      id: '3',
      email: 'abc@jarvisbitz.com',
      subject: 'Cleaning',
      date: '3/1/2023',
      priority: 'low',
      assign: 'Ramesh',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="warning" size="xs" container />
      )
    },
    {
      id: '4',
      email: 'abc@jarvisbitz.com',
      subject: 'Mouse issue',
      date: '4/1/2023',
      priority: 'low',
      assign: 'harish',
      status: <Badge variant="gradient" badgeContent="approved" color="info" size="xs" container />
    },
    {
      id: '5',
      email: 'abc@jarvisbitz.com',
      subject: 'AC Cleaning',
      date: '5/1/2023',
      priority: 'medium',
      assign: 'kanihyaa',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="secondary" size="xs" container />
      )
    },
    {
      id: '6',
      email: 'abc@jarvisbitz.com',
      subject: 'System requirement',
      date: '1/1/2023',
      priority: 'High',
      assign: 'Devam',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      )
    },
    {
      id: '7',
      email: 'abc@jarvisbitz.com',
      subject: 'Internet Issue',
      date: '2/1/2023',
      priority: 'High',
      assign: 'Harsh',
      status: <Badge variant="gradient" badgeContent="approved" color="error" size="xs" container />
    },
    {
      id: '8',
      email: 'abc@jarvisbitz.com',
      subject: 'Cleaning',
      date: '3/1/2023',
      priority: 'medium',
      assign: 'mahesh',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="warning" size="xs" container />
      )
    },
    {
      id: '9',
      email: 'abc@jarvisbitz.com',
      subject: 'Mouse issue',
      date: '4/1/2023',
      priority: 'low',
      assign: 'smit',
      status: <Badge variant="gradient" badgeContent="approved" color="info" size="xs" container />
    }
  ]
};

export default supportTicketData;
