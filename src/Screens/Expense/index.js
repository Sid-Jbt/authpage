import { Card, Grid, Icon } from '@mui/material';
import {
  Add,
  ImportExportRounded,
  PendingTwoTone,
  ThumbDown,
  ThumbUpAlt
} from '@mui/icons-material';
import React, { useState } from 'react';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import DialogMenu from 'Elements/Dialog';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ManageExpenseForm from './ManageExpenseForm';
import LeaveCard from '../../Components/CardLayouts/StaticCard';
import ExpenseInfoDetails from './ExpenseInfoDetails';

const Expense = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = expenseListData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { role } = useSelector((state) => state.route);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState('');

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleChangeSearch = (event) => {
    setSearch(event);
  };
  const handleClear = () => {
    setSearch('');
  };

  const handleOpenDialog = () => {
    setIsExpenseDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsExpenseDialogOpen(false);
  };

  const onClickView = (row) => {
    setSelectedData(row);
    handleOpenDialog();
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Approved"
            count="5"
            icon={{ color: 'success', component: <ThumbUpAlt /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Declined"
            count="1"
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Pending"
            count="3"
            icon={{ color: 'warning', component: <PendingTwoTone /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>
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
        <FilterLayout
          search={search}
          handleSearch={() => handleChangeSearch()}
          handleClear={() => handleClear()}
        />
        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={prRows}
          isView
          isDialogAction={(row) => onClickView(row)}
        />
        <ManageExpenseForm
          isDrawerOpen={Boolean(isDialogOpen)}
          handleDrawerClose={handleDialog}
          title="ADD NEW EXPENSE"
        />
      </Card>
      {isExpenseDialogOpen && (
        <DialogMenu
          isOpen={isExpenseDialogOpen}
          onClose={handleCloseDialog}
          dialogTitle={`Expense Details: ${selectedData.title}`}
          dialogContent={<ExpenseInfoDetails info={selectedData} />}
          dialogAction={
            <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
              <Grid item>
                <Button
                  type="submit"
                  color="info"
                  variant="contained"
                  size="small"
                  onClick={handleCloseDialog}
                >
                  Approve
                </Button>
              </Grid>
              <Grid item>
                <Button color="error" variant="contained" size="small" onClick={handleCloseDialog}>
                  Reject
                </Button>
              </Grid>
            </Grid>
          }
        />
      )}
    </>
  );
};
export default Expense;
