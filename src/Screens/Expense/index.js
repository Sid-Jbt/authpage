/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add, PendingTwoTone, SummarizeRounded, ThumbDown, ThumbUpAlt } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import DialogMenu from 'Elements/Dialog';
import { DeleteDialogAction, DeleteDialogContent } from 'Components/DeleteDialog';
import { getExpensePattern } from 'Routes/routeConfig';
import { useNavigate } from 'react-router';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ExpenseCard from '../../Components/CardLayouts/StaticCard';
import ViewExpenseDetails from './ViewExpenseDetails';
import AddExpenseDialog from './AddExpenseForm';
import withStateDispatch from '../../Helpers/withStateDispatch';

const adminExpenseOptions = [{ title: 'View', value: 'view' }];
const empExpenseOptions = [
  { title: 'Edit', value: 'edit' },
  { title: 'View', value: 'view' },
  { title: 'Delete', value: 'delete' }
];

const Expense = ({ GetExpenseAdd, Loading }) => {
  const { columns: prCols, adminColumns: adminPrCol } = expenseListData;
  const { role } = useSelector((state) => state.login);
  const navigate = useNavigate();
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
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isSearch, setIsSearch] = useState(false);
  const [sort, setSort] = useState({ key: 'createdAt', order: 'desc' });
  // const [sortKey, setSortKey] = useState('createdAt');
  // const [sortOrder, setSortOrder] = useState('desc');
  // const [isExport, setIsExport] = useState(false);

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

  const onClickAction = (key, value) => {
    if (key === 'edit' && navigate(getExpensePattern(value.id))) {
      setIsEdit(true);
      setSelectedData(allExpenseList.find((o) => o.id === value.id));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      if (role === 'admin') {
        onClickView(value);
      } else {
        const viewData = allExpenseList.find((o) => o.id === value.id);
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
      setSelectedId(value.id);
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

  // const onPage = async (selectedPage) => {
  //   setPage(selectedPage);
  //   // await getAllExpenseList(sortKey, sortOrder, selectedPage);
  // };
  //
  // const onRowsPerPageChange = async (selectedLimit) => {
  //   setLimit(selectedLimit);
  //   // await getAllExpenseList(sortKey, sortOrder, selectedLimit);
  // };
  //
  // const onSort = async (e, selectedSortKey, selectedSortOrder) => {
  //   setSortKey(selectedSortKey);
  //   setSortOrder(selectedSortOrder);
  //   // await getAllExpenseList(selectedSortKey, selectedSortOrder, page);
  // };

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
          onClickAction={(value, key) => onClickAction(value, key)}
          isAction
          options={role === 'admin' ? adminExpenseOptions : empExpenseOptions}
          rowsCount={expenseListCount}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => setLimit(rowsPerPage)}
          sortKey={sort.Key}
          sortOrder={sort.Order}
          handleRequestSort={(event, orderName, orderKey) =>
            setSort({ order: orderName, key: orderKey })
          }
        />

        {isDialogOpen && (
          <AddExpenseDialog
            GetExpenseAdd={GetExpenseAdd}
            isDialogOpen={isDialogOpen}
            handleDialog={handleDialog}
            title={isEdit ? 'UPDATE EXPENSE' : 'NEW EXPENSE'}
            button={isEdit ? 'UPDATE YOUR EXPENSE' : 'ADD YOUR EXPENSE'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedData={selectedData}
            setSelectedData={(value) => setSelectedData(value)}
            isEdit={isEdit}
            Loading={Loading}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={handleDialogClose}
            dialogTitle="Delete"
            dialogContent={<DeleteDialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DeleteDialogAction
                handleDialogClose={handleDialogClose}
                selectedId={selectedId}
                deleteItem={onDelete}
                message="Are you sure want to delete this?"
                buttonTitle="Delete"
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
          dialogContent={<ViewExpenseDetails info={selectedData} />}
          dialogAction={
            role === 'admin' && (
              <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                {/* <Card sx={{ background: 'transparent', boxShadow: 'none', p: 1 }}> */}
                {/*  <Typography textAlign="center" fontSize="medium"> */}
                {/*    If you have any query then raise your {' '} */}
                {/*    <Link href="http://localhost:3001/supportTicket" target="_blank" color="info" underline="hover"> */}
                {/*      Support Ticket */}
                {/*    </Link> */}
                {/*  </Typography> */}
                {/* </Card> */}

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
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={handleCloseDialog}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            )
          }
        />
      )}
    </>
  );
};

export default withStateDispatch(Expense);
