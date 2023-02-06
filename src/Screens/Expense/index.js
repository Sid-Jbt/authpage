import { Card, Grid, Icon } from '@mui/material';
import { Add, ImportExportRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ManageExpenseForm from './ManageExpenseForm';

const Expense = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = expenseListData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { role } = useSelector((state) => state.route);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        <Grid item xs="auto">
          <Button color="white" variant="outlined" size="small" onClick={handleDialog}>
            <Icon sx={{ mr: 1 }}>
              <Add />
            </Icon>
            Add
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button color="white" variant="outlined" size="small">
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid>
      </Grid>
      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout />
        <Table columns={role === 'admin' ? adminPrCol : prCols} rows={prRows} isChecked isView />
        <ManageExpenseForm
          isDrawerOpen={Boolean(isDialogOpen)}
          handleDrawerClose={handleDialog}
          title="ADD NEW EXPENSE"
        />
      </Card>
    </>
  );
};
export default Expense;
