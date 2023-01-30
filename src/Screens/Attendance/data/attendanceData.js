import Badge from 'Elements/Badge';

const attendanceData = {
  columns: [
    { accessor: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { accessor: 'date', align: 'center', headerName: 'Date', mobileHeader: 'Date' },
    { accessor: 'username', align: 'center', headerName: 'Username', mobileHeader: 'Username' },
    { accessor: ' In', align: 'center', headerName: 'In', mobileHeader: 'In' },
    { accessor: ' Out', align: 'center', headerName: 'Out', mobileHeader: 'Out' },
    { accessor: 'overtime', align: 'center', headerName: 'Overtime', mobileHeader: 'Overtime' },
    {
      accessor: 'production',
      align: 'center',
      headerName: 'Production',
      mobileHeader: 'Production'
    },
    { accessor: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  rows: [
    {
      id: 1,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Present"
          color="success"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 2,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Absent"
          color="error"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 3,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Late"
          color="warning"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 4,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Overtime"
          color="info"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 5,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Present"
          color="success"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 6,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Absent"
          color="error"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 7,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="late"
          color="warning"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 8,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Overtime"
          color="info"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 9,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Present"
          color="success"
          size="xs"
          container
          customWidth={100}
        />
      )
    },
    {
      id: 10,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      ' In': '10:00',
      ' Out': '7:00',
      late: '0H',
      'early Leaving': '0.5H',
      overtime: '0H',
      production: '8H',
      status: (
        <Badge
          variant="gradient"
          badgeContent="Absent"
          color="error"
          size="xs"
          container
          customWidth={100}
        />
      )
    }
  ]
};

export default attendanceData;
