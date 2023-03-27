import React, { useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add, PendingTwoTone, SummarizeRounded, ThumbDown, ThumbUpAlt } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import { useOutletContext } from 'react-router';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ExpenseCard from '../../Components/CardLayouts/StaticCard';
import ViewExpenseDetails from './ViewExpenseDetails';
import AddExpenseForm from './AddExpenseForm';

const ExpenseList = () => {
  const { columns: prCols, adminColumns: adminPrCol } = expenseListData;
  const {
    role,
    GetExpenseAddUpdate,
    GetExpenseList,
    GetExpenseDelete,
    GetExpenseById,
    GetExpenseReason
  } = useOutletContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isViewExpenseDialogOpen, setIsViewExpenseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({ key: 'createdAt', order: 'asc' });
  const [filter, setFilter] = useState(false);
  const [allExpense, setAllExpense] = useState([]);
  const [expenseCount, setExpenseCount] = useState({});

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen) {
      GetExpenseList(
        {
          limit,
          search,
          page,
          sortKey: sort.key,
          sortOrder: sort.order
        },
        (res) => {
          if (res && res.data && res.data.data) {
            const { rows, count } = res.data.data;
            setAllExpense(rows);
            setExpenseCount(count);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, filter, page, sort, isDeleteDialogOpen]);

  const handleClear = () => {
    setSearch('');
    setFilter(false);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Total Expense"
            count={expenseCount.totalExpense}
            icon={{ color: 'success', component: <SummarizeRounded /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Approved"
            count={expenseCount.approved}
            icon={{ color: 'success', component: <ThumbUpAlt /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Declined"
            count={expenseCount.rejected}
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Pending"
            count={expenseCount.pending}
            icon={{ color: 'info', component: <PendingTwoTone /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>

      {role !== 'admin' && (
        <>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
            <Grid item xs="auto">
              <Button
                sx={({ breakpoints, palette: { dark } }) => ({
                  [breakpoints.down('xl' && 'lg')]: {
                    color: dark.main,
                    borderColor: dark.main
                  }
                })}
                variant="outlined"
                size="small"
                onClick={() => setIsDialogOpen(!isDialogOpen)}
              >
                <Icon sx={{ mr: 1 }}>
                  <Add />
                </Icon>
                Add
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={(e) => setSearch(e.target.value.trim())}
          handleClear={handleClear}
          onClickSearch={() => {
            setFilter(!filter);
          }}
        />

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allExpense}
          onClickAction={(value, { id }) => {
            if (value === 'delete') {
              setSelectedData(id);
              setIsDeleteDialogOpen(true);
            } else {
              GetExpenseById(id, (res) => {
                if (res && res.data && res.data.data) {
                  const { data } = res.data;
                  const setViewData = {
                    itemName: data.itemName,
                    purchaseFrom: data.purchaseFrom,
                    purchaseDate: data.purchaseDate,
                    amount: data.amount,
                    status: data.status,
                    document: data.document,
                    comment: data.comment,
                    id: data.id
                  };
                  setSelectedData(setViewData);
                  if (value === 'edit') {
                    setIsEdit(true);
                    setIsDialogOpen(true);
                  } else if (value === 'view') {
                    setIsViewExpenseDialogOpen(true);
                  }
                }
              });
            }
          }}
          isAction
          options={
            role === 'admin'
              ? [{ title: 'View', value: 'view' }]
              : [
                  { title: 'Edit', value: 'edit' },
                  { title: 'Delete', value: 'delete' }
                ]
          }
          rowsCount={expenseCount.total}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => setLimit(rowsPerPage)}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, orderName, orderKey) =>
            setSort({ order: orderName, key: orderKey })
          }
        />

        {isDialogOpen && (
          <AddExpenseForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => setIsDialogOpen(!isDialogOpen)}
            title={isEdit ? 'UPDATE EXPENSE' : 'NEW EXPENSE'}
            button={isEdit ? 'UPDATE YOUR EXPENSE' : 'ADD YOUR EXPENSE'}
            selectedData={selectedData}
            isEdit={isEdit}
            GetExpenseAddUpdate={GetExpenseAddUpdate}
          />
        )}

        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            dialogTitle="Delete"
            dialogContent={<DialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DialogAction
                approveTitle="Delete"
                rejectTitle="Cancel"
                approveColor="error"
                rejectColor="info"
                handleReject={() => setIsDeleteDialogOpen(false)}
                handleApprove={() =>
                  GetExpenseDelete(selectedData, () => {
                    setIsDeleteDialogOpen(false);
                    setIsEdit(false);
                  })
                }
              />
            }
          />
        )}
      </Card>

      {isViewExpenseDialogOpen && selectedData && (
        <DialogMenu
          isOpen={isViewExpenseDialogOpen}
          onClose={() => setIsViewExpenseDialogOpen(false)}
          dialogTitle={`Expense Details: ${selectedData.itemName}`}
          dialogContent={
            <DialogContent customContent={<ViewExpenseDetails info={selectedData} role={role} />} />
          }
          dialogAction={
            role === 'admin' && (
              <DialogAction
                approveColor="success"
                rejectColor="error"
                approveTitle="Approve"
                rejectTitle="Reject"
                handleApprove={() =>
                  GetExpenseReason(
                    {
                      data: {
                        status: 'approved',
                        comment: ''
                      },
                      id: selectedData
                    },
                    () => setIsViewExpenseDialogOpen(false)
                  )
                }
                handleReject={() =>
                  GetExpenseReason(
                    {
                      data: {
                        status: 'reject',
                        comment: ''
                      },
                      id: selectedData
                    },
                    () => setIsViewExpenseDialogOpen(false)
                  )
                }
              />
            )
          }
        />
      )}
    </>
  );
};

export default ExpenseList;
