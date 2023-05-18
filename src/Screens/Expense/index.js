import React, { useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add, CurrencyRupeeRounded, SummarizeRounded, ThumbUpAlt } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import { useOutletContext } from 'react-router';
import { actionStatus, userIsViewIconPermissions, userPermission } from 'Helpers/Global';
import Select from 'Elements/Select';
import { expenseListData } from 'StaticData/expenseListData';
import FilterLayout from 'Components/FilterLayout';
import ExpenseCard from 'Components/CardLayouts/StaticCard';
import ExpenseDetails from './ExpenseDetails';
import AddExpenseForm from './AddExpenseForm';

const ExpenseList = () => {
  const { columns: prCols, adminColumns: adminPrCol } = expenseListData;
  const {
    Loading,
    GetExpenseAddUpdate,
    GetExpenseList,
    GetExpenseDelete,
    GetExpenseById,
    GetExpenseReason,
    permission
  } = useOutletContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isViewExpenseDialogOpen, setIsViewExpenseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({ key: 'createdAt', order: 'asc' });
  const [filter, setFilter] = useState(false);
  const [allExpense, setAllExpense] = useState([]);
  const [expenseCount, setExpenseCount] = useState({});
  const [approveRejectReason, setApproveRejectReason] = useState('');
  const isAdmin =
    permission &&
    permission.organisation &&
    Object.values(permission.organisation).some((x) => x === 1) &&
    permission.expense &&
    permission.expense.w === 0;

  const isAuthorised = !!(permission && permission.expense && permission.expense.a === 1);

  const [filterData, setFilterData] = useState({
    search: '',
    status: ''
  });
  const isValues = !Object.values(filterData).some((x) => x !== '');

  const userPermissions = userPermission(
    permission !== null && permission.hasOwnProperty('expense') && permission.expense
  );

  const isViewIconPermissions = userIsViewIconPermissions(
    permission !== null && permission.hasOwnProperty('expense') && permission.expense,
    [3]
  );

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen || isViewExpenseDialogOpen) {
      GetExpenseList(
        {
          limit: isNaN(limit) ? 0 : limit,
          status: filterData.status.value,
          search: filterData.search,
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
    setFilterData({
      search: '',
      status: ''
    });
    setFilter(!filter);
  };

  return (
    <>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} md={6} lg={3}>
          <ExpenseCard
            title="Total"
            percentage={{
              color: 'primary',
              count: expenseCount && expenseCount.totalExpense,
              text: ' '
            }}
            icon={{ color: 'primary', component: <SummarizeRounded /> }}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <ExpenseCard
            title="Approved"
            percentage={{
              color: 'success',
              count: expenseCount && expenseCount.approved,
              text: ' '
            }}
            icon={{ color: 'success', component: <ThumbUpAlt /> }}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <ExpenseCard
            title="Declined"
            percentage={{
              color: 'error',
              count: expenseCount && expenseCount.rejected,
              text: ' '
            }}
            icon={{ color: 'error', component: <ThumbUpAlt /> }}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <ExpenseCard
            title="Pending"
            percentage={{
              color: 'warning',
              count: expenseCount && expenseCount.pending,
              text: ' '
            }}
            icon={{ color: 'warning', component: <CurrencyRupeeRounded /> }}
          />
        </Grid>
      </Grid>

      {!isAdmin && (
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
          search={filterData.search}
          handleSearch={(e) => setFilterData({ ...filterData, search: e.target.value })}
          handleClear={() => !isValues && handleClear()}
          isDisable={expenseCount && expenseCount.totalExpense <= 0}
          onClickSearch={() => !isValues && setFilter(!filter)}
        >
          <Grid item xs={12} md={4} lg={3}>
            <Select
              label="Select Status"
              size="small"
              options={actionStatus}
              value={filterData.status}
              onChange={(value) => setFilterData({ ...filterData, status: value })}
            />
          </Grid>
        </FilterLayout>

        <Table
          columns={isAdmin ? adminPrCol : prCols}
          rows={allExpense}
          badge={['status']}
          onClickAction={(value, { id }) => {
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
                if (value === 'delete') {
                  setIsDeleteDialogOpen(true);
                } else if (value === 'edit') {
                  setIsEdit(true);
                  setIsDialogOpen(true);
                } else if (value === 'view') {
                  setIsViewExpenseDialogOpen(true);
                }
              }
            });
          }}
          isAction={!isAdmin}
          options={userPermissions}
          isView={isAdmin && isViewIconPermissions}
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
            Loading={Loading}
          />
        )}

        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setSelectedData(null);
              setIsDeleteDialogOpen(false);
            }}
            dialogTitle={`Delete ${(selectedData && selectedData.itemName).slice(0, 35)}...`}
            dialogContent={<DialogContent content="Are you sure you want to delete this?" />}
            dialogAction={
              <DialogAction
                approveTitle="Delete"
                rejectTitle="Cancel"
                approveColor="error"
                rejectColor="info"
                handleReject={() => setIsDeleteDialogOpen(false)}
                handleApprove={() =>
                  GetExpenseDelete(selectedData.id, () => {
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
          onClose={() => {
            setIsViewExpenseDialogOpen(false);
            setSelectedData(null);
          }}
          dialogTitle={selectedData.itemName}
          dialogContent={
            <DialogContent
              customContent={
                <ExpenseDetails
                  data={selectedData}
                  isAdmin={isAdmin}
                  isAuthorised={isAuthorised}
                  approveRejectReason={(value) => setApproveRejectReason(value)}
                />
              }
            />
          }
          dialogAction={
            (isAdmin || isAuthorised) &&
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
