export const roleData = {
  columns: [
    { Header: 'name', id: 'name', accessor: 'name', align: 'center' },
    {
      Header: 'module',
      id: 'module',
      accessor: (data) => {
        const output = [];
        data.modules.map((item) => output.push(item.toUpperCase()));
        return output.join(', ').length > 80
          ? `${output.join(', ').slice(0, 80)}...`
          : output.join(', ');
      },
      align: 'center'
    }
  ]
};
