import Badge from 'Elements/Badge';
import colors from 'Theme/base/colors';

const attendanceData = {
  columns: [
    { name: 'id', align: 'center' },
    { name: 'date', align: 'center' },
    { name: 'username', align: 'center' },
    { name: 'punch In', align: 'center' },
    { name: 'punch Out', align: 'center' },
    { name: 'late', align: 'center' },
    { name: 'early Leaving', align: 'center' },
    { name: 'overtime', align: 'center' },
    { name: 'production', align: 'center' },
    { name: 'status', align: 'center' }
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
        <Badge variant="gradient" badgeContent="Present" color="success" size="xs" container />
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
      status: <Badge variant="gradient" badgeContent="Absent" color="error" size="xs" container />
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
      status: <Badge variant="gradient" badgeContent="Late" color="warning" size="xs" container />
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
      status: <Badge variant="gradient" badgeContent="Overtime" color="info" size="xs" container />
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
        <Badge variant="gradient" badgeContent="Present" color="success" size="xs" container />
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
      status: <Badge variant="gradient" badgeContent="Absent" color="error" size="xs" container />
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
      status: <Badge variant="gradient" badgeContent="late" color="warning" size="xs" container />
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
      status: <Badge variant="gradient" badgeContent="Overtime" color="info" size="xs" container />
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
        <Badge variant="gradient" badgeContent="Present" color="success" size="xs" container />
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
      status: <Badge variant="gradient" badgeContent="Absent" color="error" size="xs" container />
    }
  ]
};

export default attendanceData;
