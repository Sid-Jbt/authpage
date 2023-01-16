import { Card, Icon } from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Table from '../../Elements/Table';
import expenseListData from './data/expenseListData';

const Expense = () => {
  const { columns: prCols, rows: prRows } = expenseListData;

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
        <Typography variant="h6">Expense List</Typography>
        <Box>
          <Button color="info" variant="contained" size="small" sx={{ marginRight: '10px' }}>
            <Icon sx={{ fontWeight: 'bold', paddingRight: '20px' }}>
              <Add />{' '}
            </Icon>
            Add
          </Button>
        </Box>
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
export default Expense;
