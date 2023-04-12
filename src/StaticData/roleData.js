import { Edit } from '@mui/icons-material';

export const roleData = {
  columns: [
    { Header: 'role', id: 'role', accessor: 'role', align: 'center' },
    {
      Header: 'permission',
      id: 'permission',
      accessor: (data) => {
        const output = [];
        data.permission.map((item) => output.push(item.toUpperCase()));
        return output.join(', ');
      },
      align: 'center'
    },
    { Header: 'action', accessor: 'action', align: 'center' }
  ],

  rows: [
    {
      role: 'Admin',
      permission: ['dashboard', 'employee'],
      action: <Edit />
    },
    {
      role: 'User',
      permission: ['dashboard', 'leave'],
      action: <Edit />
    }
  ]
};
