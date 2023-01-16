import React from 'react';
import { Card, Icon } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import Button from 'Elements/Button';
import { Add, ImportExportRounded } from '@mui/icons-material';
import employeeListData from './data/employeeListData';

const EmployeeList = () => {
  const { columns: prCols, rows: prRows } = employeeListData;

  return (
    <Card
      mb={3}
      sx={{
        background: ({ palette: { grey } }) => grey[100],
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
        boxShadow: ({ boxShadows: { md } }) => md
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} p={2} pb={0}>
        <Typography variant="h6">Employee</Typography>
        <Button color="info" variant="contained" size="small">
          <Icon sx={{ fontWeight: 'bold', paddingRight: '20px' }}>
            <Add />{' '}
          </Icon>
          Add
        </Button>
        <Button color="info" variant="contained" size="small">
          <Icon sx={{ fontWeight: 'bold', paddingRight: '20px' }}>
            <ImportExportRounded />{' '}
          </Icon>
          Export
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        p={2}
        pb={0}
        pt={0}
      >
        Filter
      </Box>
      <Card
        sx={{
          background: ({ palette: { white } }) => white.main,
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { xl } }) => xl
        }}
      >
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
    </Card>
  );
};

export default EmployeeList;
