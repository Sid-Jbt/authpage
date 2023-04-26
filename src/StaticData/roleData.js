import { Edit } from '@mui/icons-material';

export const roleData = {
  columns: [
    { Header: 'name', id: 'name', accessor: 'name', align: 'center' },
    {
      Header: 'module',
      id: 'module',
      accessor: (data) => {
        const output = [];
        data.modules.map((item) => output.push(item.toUpperCase()));
        return output.join(', ');
      },
      align: 'center'
    },
    { Header: 'action', accessor: 'action', align: 'center' }
  ],

  rows: [
    {
      name: 'Admin',
      modules: ['dashboard', 'employee'],
      action: <Edit />
    },
    {
      name: 'User',
      modules: ['dashboard', 'leave'],
      action: <Edit />
    }
  ]
};
