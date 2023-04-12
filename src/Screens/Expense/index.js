import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import {
  Add,
  PendingTwoTone,
  RemoveRedEye,
  SummarizeRounded,
  ThumbDown,
  ThumbUpAlt
} from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import { useOutletContext } from 'react-router';
import { actionStatus } from 'Helpers/Global';
import Select from 'Elements/Select';
import { expenseListData } from 'StaticData/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ExpenseCard from '../../Components/CardLayouts/StaticCard';
import ExpenseDetails from './ExpenseDetails';
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
  const [status, setStatus] = useState('');
  const [approveRejectReason, setApproveRejectReason] = useState('');

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen || isViewExpenseDialogOpen) {
      GetExpenseList(
        {
          limit: isNaN(limit) ? 0 : limit,
          status: status.value,
          search,
          page,
          sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
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
  }, [isDialogOpen, filter, page, sort, isDeleteDialogOpen, isViewExpenseDialogOpen, limit]);

  const handleClear = () => {
    setStatus('');
    setSearch('');
    setStatus('');
    setFilter(!filter);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Total Expense"
            count={expenseCount && expenseCount.totalExpense}
            icon={{ color: 'success', component: <SummarizeRounded /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Approved"
            count={expenseCount && expenseCount.approved}
            icon={{ color: 'success', component: <ThumbUpAlt /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Declined"
            count={expenseCount && expenseCount.rejected}
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Pending"
            count={expenseCount && expenseCount.pending}
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
          handleSearch={(e) => setSearch(e.target.value)}
          handleClear={handleClear}
          onClickSearch={() => {
            setFilter(!filter);
          }}
        >
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                size="small"
                value={status}
                options={actionStatus}
                onChange={(value) => setStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allExpense}
          badge={['status']}
          onClickAction={(value, { id }) => {
            if (value === 'delete') {
              setSelectedData(id);
              setIsDeleteDialogOpen(true);
            } else {
              GetExpenseById(id, (res) => {
                if (res && res.data && res.data.data) {
                  const { data } = res.data;
                  const setViewData = {
                    id: data.id,
                    itemName: data.itemName,
                    purchaseFrom: data.purchaseFrom,
                    purchaseDate: data.purchaseDate,
                    amount: data.amount,
                    ...(value === 'view' && { status: data.status }),
                    document: data.document,
                    comment: data.comment
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
          isAction={role !== 'admin'}
          options={[
            { name: 'edit', title: 'Edit', value: 'edit' },
            { name: 'delete', title: 'Delete', value: 'delete' },
            { name: 'view', title: 'View', value: 'view' }
          ]}
          isView={
            role === 'admin' && [
              {
                name: 2,
                tooltip: 'Click to view',
                color: 'info',
                icon: <RemoveRedEye />,
                value: 'view'
              }
            ]
          }
          rowsCount={expenseCount && expenseCount.total}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={isNaN(limit) ? expenseCount.total : limit}
          onRowsPerPageChange={(rowsPerPage) => setLimit(rowsPerPage)}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
        />

        {isDialogOpen && (
          <AddExpenseForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => {
              setIsDialogOpen(!isDialogOpen);
              setIsEdit(false);
              setSelectedData(null);
            }}
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
            dialogTitle="Delete Expense"
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
          dialogTitle={selectedData.itemName}
          dialogContent={
            <DialogContent
              customContent={
                <ExpenseDetails
                  data={selectedData}
                  role={role}
                  approveRejectReason={(value) => setApproveRejectReason(value)}
                />
              }
            />
          }
          dialogAction={
            role === 'admin' &&
            selectedData.status === 'pending' && (
              <DialogAction
                approveColor="success"
                rejectColor="error"
                approveTitle="Approve"
                rejectTitle="Reject"
                approveDisable={!approveRejectReason}
                rejectDisable={!approveRejectReason}
                handleApprove={() =>
                  GetExpenseReason(
                    {
                      data: {
                        status: 'approved',
                        comment: approveRejectReason
                      },
                      id: selectedData.id
                    },
                    () => setIsViewExpenseDialogOpen(false)
                  )
                }
                handleReject={() =>
                  GetExpenseReason(
                    {
                      data: {
                        status: 'reject',
                        comment: approveRejectReason
                      },
                      id: selectedData.id
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
