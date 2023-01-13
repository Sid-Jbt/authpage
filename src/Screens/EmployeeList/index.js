import React from 'react';
import { Card } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import employeeListData from './data/employeeListData';

const EmployeeList = () => {
  const { columns: prCols, rows: prRows } = employeeListData;
  console.log('employeeListData --> ', employeeListData);
  return (
    <Box py={3}>
      <Box
        mb={3}
        sx={{
          py: 2,
          px: 2,
          background: ({ palette: { white } }) => white.main,
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <Typography variant="h6">Employee List</Typography>
          </Box>
          <Box
            sx={{
              '& .MuiTableRow-root:not(:last-child)': {
                '& td': {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`
                }
              }
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default EmployeeList;
