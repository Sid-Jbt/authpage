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
      dob: '10/10/1990',
      doj: '01/02/2019',
      dol: '31/01/2021'
      // action: <Action id={1} />
    },
    {
      id: '2',
      empcode: 'empcode-2',
      name: [logoSpotify, 'John'],
      role: 'HR',
      dob: '25/02/1988',
      doj: '10/05/2015',
      dol: '01/05/2018'
      // action: <Action id={2} />
    },
    {
      id: '3',
      empcode: 'empcode-3',
      name: [logoSpotify, 'You Tube'],
      role: 'CEO',
      dob: '18/06/1991',
      doj: '15/08/2020',
      dol: ''
      // action: <Action id={3} />
    },
    {
      id: '4',
      empcode: 'empcode-4',
      name: [logoSpotify, 'Admin'],
      role: 'Admin',
      dob: '10/05/1996',
      doj: '20/10/2018',
      dol: '25/01/2023'
      // action: <Action id={4} />
    },
    {
      id: '5',
      empcode: 'empcode-5',
      name: [logoSpotify, 'Pinky'],
      role: 'Super Admin',
      dob: '01/02/2023',
      doj: '01/02/2023',
      dol: '01/02/2023'
      // action: <Action id={5} />
    }
  ]
};

export default empListData;
