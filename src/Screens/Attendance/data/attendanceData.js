import Badge from 'Elements/Badge';

const attendanceData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id', mobileHeader: 'Id' },
    { name: 'date', align: 'center', headerName: 'Date', mobileHeader: 'Date' },
    { name: 'username', align: 'center', headerName: 'Username', mobileHeader: 'Username' },
    { name: 'punch In', align: 'center', headerName: 'Punch In', mobileHeader: 'In' },
    { name: 'punch Out', align: 'center', headerName: 'Punch Out', mobileHeader: 'Out' },
    // { name: 'late', align: 'center', headerName: 'Late', mobileHeader: 'Late' },
    // {
    //   name: 'early Leaving',
    //   align: 'center',
    //   headerName: 'Early Leaving',
    //   mobileHeader: 'Ear.Lea'
    // },
    { name: 'overtime', align: 'center', headerName: 'Overtime', mobileHeader: 'Overtime' },
    { name: 'production', align: 'center', headerName: 'Production', mobileHeader: 'Production' },
    { name: 'status', align: 'center', headerName: 'Status', mobileHeader: 'Status' }
  ],

  rows: [
    {
      id: 1,
      date: '01 Jan 2023',
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
      date: '02 Jan 2023',
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
      date: '03 Jan 2023',
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
      date: '04 Jan 2023',
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
      date: '05 Jan 2023',
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
      date: '06 Jan 2023',
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
      date: '07 Jan 2023',
      username: 'Jarvisbitz',
      'punch In': '09:30',
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
      date: '08 Jan 2023',
      username: 'Jarvisbitz',
      'punch In': '11:00',
      'punch Out': '8:00',
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
      'punch In': '10:30',
      'punch Out': '7:30',
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
      username: 'Jarvisbitz',
      'punch In': '11:00',
      'punch Out': '5:00',
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
