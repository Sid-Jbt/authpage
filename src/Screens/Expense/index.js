/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add, PendingTwoTone, SummarizeRounded, ThumbDown, ThumbUpAlt } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import DialogMenu from 'Elements/Dialog';
import {
  DeleteDialogAction,
  DeleteDialogContent,
  DialogAction,
  DialogContent
} from 'Components/Dialog';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ExpenseCard from '../../Components/CardLayouts/StaticCard';
import ViewExpenseDetails from './ViewExpenseDetails';
import AddExpenseForm from './AddExpenseForm';

const adminExpenseOptions = [{ title: 'View', value: 'view' }];
const empExpenseOptions = [
  { title: 'Edit', value: 'edit' },
  { title: 'View', value: 'view' },
  { title: 'Delete', value: 'delete' }
];

const Expense = () => {
  const { columns: prCols, adminColumns: adminPrCol } = expenseListData;
  const { role } = useSelector((state) => state.login);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isViewExpenseDialogOpen, setIsViewExpenseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [counts, setCounts] = useState(null);
  const [loader, setLoader] = useState(false);

  const [allExpenseList, setAllExpenseList] = useState([]);
  const [expenseListCount, setExpenseListCount] = useState(0);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  // const [isExport, setIsExport] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleOpenDialog = () => {
    setIsExpenseDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsExpenseDialogOpen(false);
  };

  const handleCloseViewDialog = () => {
    setIsViewExpenseDialogOpen(false);
  };

  const onClickView = (row) => {
    setSelectedData(row);
    handleOpenDialog();
  };

  const onClickAction = (key, data) => {
    if (key === 'edit') {
      setIsEdit(true);
      setSelectedData(allExpenseList.find((o) => o.id === data.id));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      if (role === 'admin') {
        onClickView(data);
      } else {
        const viewData = allExpenseList.find((o) => o.id === data.id);
        const setViewData = {
          itemName: viewData.itemName,
          purchaseFrom: viewData.purchaseFrom,
          purchaseDate: viewData.purchaseDate,
          amount: viewData.amount,
          status: viewData.status,
          document: viewData.document,
          comment: viewData.comment
        };
        setSelectedData(setViewData);
        setIsViewExpenseDialogOpen(true);
      }
    } else {
      setSelectedId(data.id);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleClear = () => {
    setSearch('');
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = async () => {
    handleDialogClose();
  };

  const onClickSearch = () => {
    // getAllExpenseList(sortKey, sortOrder, page, search, 0);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
    // await getAllExpenseList(sortKey, sortOrder, selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
    // await getAllExpenseList(sortKey, sortOrder, selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
    // await getAllExpenseList(selectedSortKey, selectedSortOrder, page);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Total Expense"
            count={counts && counts.totalExpense}
            icon={{ color: 'success', component: <SummarizeRounded /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Approved"
            count={counts && counts.approved}
            icon={{ color: 'success', component: <ThumbUpAlt /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Declined"
            count={counts && counts.rejected}
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Pending"
            count={counts && counts.pending}
            icon={{ color: 'info', component: <PendingTwoTone /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {role !== 'admin' && (
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
              onClick={() => handleDialog()}
            >
              <Icon sx={{ mr: 1 }}>
                <Add />
              </Icon>
              Add
            </Button>
          </Grid>
        )}
        {/* <Grid item xs="auto">
          <Button
            sx={({ breakpoints, palette: { dark } }) =>
              ({
                [breakpoints.down('xl' && 'lg')]: {
                  color: dark.main,
                  borderColor: dark.main
                }
              } &&
              loader &&
              isExport && { height: '40px !important' })
            }
            variant="outlined"
            size="small"
            disabled={loader}
            onClick={onClickExport}
          >
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            {loader && isExport ? <CircularProgress color="inherit" /> : 'Export'}
          </Button>
        </Grid> */}
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
          handleSearch={handleChangeSearch}
          handleClear={() => handleClear()}
          onClickSearch={() => onClickSearch()}
          loader={loader}
          isSearch={isSearch}
        />

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allExpenseList}
          onClickAction={(value, row) => onClickAction(value, row)}
          isAction
          options={role === 'admin' ? adminExpenseOptions : empExpenseOptions}
          rowsCount={expenseListCount}
          initialPage={page}
          onChangePage={(value) => onPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => onRowsPerPageChange(rowsPerPage)}
          sortKey={sortKey}
          sortOrder={sortOrder}
          handleRequestSort={(event, orderName, orderKey) => onSort(event, orderName, orderKey)}
        />
        {isDialogOpen && (
          <AddExpenseForm
            isDialogOpen={isDialogOpen}
            handleDialog={handleDialog}
            title={isEdit ? 'EDIT YOUR EXPENSE' : 'ADD NEW EXPENSE'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedData={selectedData}
            setSelectedData={(value) => setSelectedData(value)}
            isEdit={isEdit}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={handleDialogClose}
            dialogTitle="Delete"
            dialogContent={<DialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DialogAction
                handleReject={handleDialogClose}
                handleApprove={() => onDelete(selectedId)}
                approveTitle="Delete"
                rejectTitle="Cancel"
              />
            }
          />
        )}
      </Card>
      {(isExpenseDialogOpen || isViewExpenseDialogOpen) && selectedData && (
        <DialogMenu
          isOpen={isExpenseDialogOpen || isViewExpenseDialogOpen}
          onClose={isExpenseDialogOpen ? handleCloseDialog : handleCloseViewDialog}
          dialogTitle={`Expense Details: ${selectedData.itemName}`}
          dialogContent={
            <DialogContent customContent={<ViewExpenseDetails info={selectedData} />} />
          }
          dialogAction={
            role === 'admin' && (
              <DialogAction
                handleReject={handleCloseDialog}
                handleApprove={handleCloseDialog}
                approveTitle="Approve"
                rejectTitle="Reject"
              />
            )
          }
        />
      )}
    </>
  );
};

export default Expense;
