import logoSpotify from 'Assets/logo/jbt-logo.svg';

const empListData = {
  columns: [
    { id: 'name', name: 'name', align: 'center', headerName: 'Name', mobileHeader: 'Name' },
    {
      id: 'empcode',
      name: 'empcode',
      align: 'center',
      headerName: 'Emp Code',
      mobileHeader: 'ECode'
    },
    { id: 'role', name: 'role', align: 'center', headerName: 'Role', mobileHeader: 'Role' },
    { id: 'dob', name: 'dob', align: 'center', headerName: 'Date Of Birth', mobileHeader: 'Dob' },
    { id: 'doj', name: 'doj', align: 'center', headerName: 'Date Of Join', mobileHeader: 'Doj' },
    { id: 'dol', name: 'dol', align: 'center', headerName: 'Date Of Leave', mobileHeader: 'Dol' }
    // { id: 'action', name: 'action', align: 'center', headerName: 'Action', mobileHeader: 'Action' }
  ],

  rows: [
    {
      id: '1',
      empcode: 'empcode-1',
      name: [logoSpotify, 'Spotift'],
      role: 'Developer',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023'
      // action: <Action id={1} />
    },
    {
      id: '2',
      empcode: 'empcode-2',
      name: [logoSpotify, 'Spotift'],
      role: 'HR',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023'
      // action: <Action id={2} />
    },
    {
      id: '3',
      empcode: 'empcode-3',
      name: [logoSpotify, 'Spotift'],
      role: 'CEO',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023'
      // action: <Action id={3} />
    },
    {
      id: '4',
      empcode: 'empcode-4',
      name: [logoSpotify, 'Spotift'],
      role: 'Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023'
      // action: <Action id={4} />
    },
    {
      id: '5',
      empcode: 'empcode-5',
      name: [logoSpotify, 'Spotift'],
      role: 'Super Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023'
      // action: <Action id={5} />
    }
  ]
};

export default empListData;
