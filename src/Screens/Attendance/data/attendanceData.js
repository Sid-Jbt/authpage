import Badge from 'Elements/Badge';

const attendanceData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'date', align: 'center', headerName: 'Date', mobileHeader: 'Date' },
    // { name: 'username', align: 'center', headerName: 'User name', mobileHeader: 'User name' },
    { name: 'in', align: 'center', headerName: 'Punch In', mobileHeader: 'In' },
    { name: 'out', align: 'center', headerName: 'Punch Out', mobileHeader: 'Out' },
    { name: 'overtime', align: 'center', headerName: 'Overtime', mobileHeader: 'Overtime' },
    {
      name: 'production',
      align: 'center',
      headerName: 'Production',
      mobileHeader: 'Production'
    },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  adminColumns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'date', align: 'center', headerName: 'Date', mobileHeader: 'Date' },
    { name: 'username', align: 'center', headerName: 'User name', mobileHeader: 'User' },
    { name: 'in', align: 'center', headerName: 'Punch In', mobileHeader: 'In' },
    { name: 'out', align: 'center', headerName: 'Punch Out', mobileHeader: 'Out' },
    { name: 'overtime', align: 'center', headerName: 'Overtime', mobileHeader: 'Overtime' },
    {
      name: 'production',
      align: 'center',
      headerName: 'Production',
      mobileHeader: 'Production'
    },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  rows: [
    {
      id: 1,
      date: '01 Jan 2023',
      username: 'Jarvisbitz',
      in: '10:00',
      out: '7:00',
      late: '0.5H',
      'early Leaving': '0.5H',
      overtime: '1H',
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
      date: '02 Jan 2023',
      username: 'CognitionTeam',
      in: '10:00',
      out: '7:00',
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
      date: '03 Jan 2023',
      username: 'Jarvisbitz',
      in: '10:00',
      out: '7:00',
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
      date: '04 Jan 2023',
      username: 'CognitionTeam',
      in: '10:00',
      out: '7:00',
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
      date: '05 Jan 2023',
      username: 'Jarvisbitz',
      in: '10:00',
      out: '7:00',
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
      date: '06 Jan 2023',
      username: 'CognitionTeam',
      in: '10:00',
      out: '7:00',
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
      date: '07 Jan 2023',
      username: 'Jarvisbitz',
      in: '10:00',
      out: '7:00',
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
      date: '08 Jan 2023',
      username: 'CognitionTeam',
      in: '10:00',
      out: '7:00',
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
      date: '09 Jan 2023',
      username: 'Jarvisbitz',
      in: '10:00',
      out: '7:00',
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
      date: '10 Jan 2023',
      username: 'CognitionTeam',
      in: '10:00',
      out: '7:00',
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
