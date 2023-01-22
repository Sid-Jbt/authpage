import Badge from 'Elements/Badge';

const attendanceData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id' },
    { name: 'date', align: 'center', headerName: 'Date' },
    { name: 'username', align: 'center', headerName: 'Username' },
    { name: 'punch In', align: 'center', headerName: 'Punch In' },
    { name: 'punch Out', align: 'center', headerName: 'Punch Out' },
    { name: 'late', align: 'center', headerName: 'Late' },
    { name: 'early Leaving', align: 'center', headerName: 'Early Leaving' },
    { name: 'overtime', align: 'center', headerName: 'Overtime' },
    { name: 'production', align: 'center', headerName: 'Production' },
    { name: 'status', align: 'center', headerName: 'Status' }
  ],

  rows: [
    {
      id: 1,
      date: '1/1/2023',
      username: 'Jarvisbitz',
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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
      'punch In': '10:00',
      'punch Out': '7:00',
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