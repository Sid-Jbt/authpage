import Badge from 'Elements/Badge';

const supportTicketData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'subject', align: 'center', headerName: 'Subject', mobileHeader: 'Subject' },
    { name: 'date', align: 'center', headerName: 'Date', mobileHeader: 'Date' },
    { name: 'priority', align: 'center', headerName: 'Priority', mobileHeader: 'Priority' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  adminColumns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'username', align: 'center', headerName: 'User Name', mobileHeader: 'Name' },
    { name: 'subject', align: 'center', headerName: 'Subject', mobileHeader: 'Subject' },
    { name: 'date', align: 'center', headerName: 'Date', mobileHeader: 'Date' },
    { name: 'assign', align: 'center', headerName: 'Assign', mobileHeader: 'Assign' },
    { name: 'priority', align: 'center', headerName: 'Priority', mobileHeader: 'Priority' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  rows: [
    {
      id: '1',
      username: 'jarvisbitz',
      subject: 'System requirement',
      date: '1/1/2023',
      priority: 'High',
      assign: 'John',
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
      // action: <Action id={1} />
    },
    {
      id: '2',
      username: 'CognitionTeam',
      subject: 'Internet Issue',
      date: '2/1/2023',
      priority: 'medium',
      assign: 'Jackey',
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
      id: '3',
      username: 'jarvisbitz',
      subject: 'Cleaning',
      date: '3/1/2023',
      priority: 'low',
      assign: 'Ramesh',
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
      id: '4',
      username: 'CognitionTeam',
      subject: 'Mouse issue',
      date: '4/1/2023',
      priority: 'low',
      assign: 'harish',
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
      id: '5',
      username: 'jarvisbitz',
      subject: 'AC Cleaning',
      date: '5/1/2023',
      priority: 'medium',
      assign: 'kanihyaa',
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
      id: '6',
      username: 'CognitionTeam',
      subject: 'System requirement',
      date: '1/1/2023',
      priority: 'High',
      assign: 'Devam',
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
      id: '7',
      username: 'jarvisbitz',
      subject: 'Internet Issue',
      date: '2/1/2023',
      priority: 'High',
      assign: 'Harsh',
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
      id: '8',
      username: 'CognitionTeam',
      subject: 'Cleaning',
      date: '3/1/2023',
      priority: 'medium',
      assign: 'mahesh',
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
      id: '9',
      username: 'jarvisbitz',
      subject: 'Mouse issue',
      date: '4/1/2023',
      priority: 'low',
      assign: 'smit',
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

export default supportTicketData;
