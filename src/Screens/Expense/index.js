import React, { useContext, useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import {
  Add,
  // Check,
  // ImportExportRounded,
  PendingTwoTone,
  SummarizeRounded,
  ThumbDown,
  ThumbUpAlt
} from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Badge from 'Elements/Badge';
import { useSelector } from 'react-redux';
import DialogMenu from 'Elements/Dialog';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ExpenseCard from '../../Components/CardLayouts/StaticCard';
import ViewExpenseDetails from './ViewExpenseDetails';
import AddExpenseForm from './AddExpenseForm';
import DeleteDialog from '../../Components/DeleteDialog';
import { SnackbarContext } from '../../Context/SnackbarProvider';
import { getExpenseLists, deleteExpense } from '../../APIs/Expense';

// const EXPORT_URL = process.env.REACT_APP_EXPORT_URL;
const Expense = () => {
  const { columns: prCols, adminColumns: adminPrCol } = expenseListData;
  const { role } = useSelector((state) => state.route);
  const { setSnack } = useContext(SnackbarContext);
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
  const [sortKey, setSortKey] = useState('itemName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isClear, setIsClear] = useState(false);
  // const [isExport, setIsExport] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const getAllExpenseList = async (
    selectedSortKey = 'itemName',
    selectedSortOrder = 'asc',
    selectedPage = 0,
    text = '',
    count = 0,
    dataLimit = limit
  ) => {
    const expenseData = {
      limit: dataLimit,
      page: selectedPage,
      sortKey: selectedSortKey.toLowerCase(),
      sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      count
    };

    const expenseRes = await getExpenseLists(expenseData);
    const {
      status,
      data: { rows },
      message
    } = expenseRes;
    if (status) {
      const expenseStatusData = rows.map((rowId) => ({
        ...rowId,
        status: (
          <Badge
            variant="gradient"
            badgeContent={rowId.status}
            color={
              rowId.status === 'pending'
                ? 'warning'
                : rowId.status === 'approved'
                ? 'success'
                : 'error'
            }
            size="xs"
            container
            customWidth={100}
          />
        )
      }));
      setCounts(expenseRes.data.count);
      setAllExpenseList(expenseStatusData);
      setExpenseListCount(expenseRes.data.count.total);
      setLoader(false);
      setIsSearch(false);
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        color: 'error',
        open: true
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllExpenseList();
  }, [isDialogOpen, isDeleteDialogOpen]);

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

  const onClickAction = (key, index) => {
    if (key === 'edit') {
      setIsEdit(true);
      setSelectedData(allExpenseList.find((o) => o.id === index));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      const viewData = allExpenseList.find((o) => o.id === index);
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
    } else {
      setSelectedId(index);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch('');
    setIsClear(!isClear);
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = async () => {
    await deleteExpense(selectedId);
    handleDialogClose();
  };

  /* // Need to rectify file export
  const onClickExport = async (
    // selectedSortKey = 'itemName',
    // selectedSortOrder = 'asc',
    // selectedPage = 0,
    text = '',
    count = 0,
    dataLimit = limit
  ) => {
    const exportData = {
      limit: dataLimit,
      page: 0,
      // sortKey: selectedSortKey.toLowerCase(),
      // sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      count
    };
    let exportRes;
    setIsExport(true);
    setLoader(true);
    if (role === 'admin') {
      // Replace with getExportExpenseLists
      // exportRes = await getEmployeeExpenseExportList(exportData);
    } else {
      exportRes = await getEmployeeExpenseExportList(exportData);
    }

    const { status, message, data } = exportRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      setLoader(false);
      setIsExport(false);
      window.open(`${EXPORT_URL}/${data}`, '', 'width=900, height=900');
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'error',
        open: true
      });
      setLoader(false);
      setIsExport(false);
    }
    if (role === 'admin') {
      setSnack({
        title: 'Warning',
        message: 'Expense list export coming soon...',
        time: false,
        icon: <Check color="white" />,
        color: 'warning',
        open: true
      });
      setLoader(false);
      setIsExport(false);
    }
  }; */

  const onClickSearch = () => {
    setLoader(true);
    setIsSearch(true);
    getAllExpenseList(sortKey, sortOrder, page, search, 0);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
    await getAllExpenseList(sortKey, sortOrder, selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
    await getAllExpenseList(sortKey, sortOrder, '', '', '', selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
    await getAllExpenseList(selectedSortKey, selectedSortOrder, page);
  };

  useEffect(() => {
    if (isClear) {
      getAllExpenseList(sortKey, sortOrder, page, '');
      onDelete();
    }
  }, [isClear]);

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Total Expense"
            count={counts && counts.total}
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
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction={role !== 'admin'}
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'View', value: 'view' },
            { title: 'Delete', value: 'delete' }
          ]}
          isView={role === 'admin'}
          isDialogAction={(row) => onClickView(row)}
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
            dialogContent={
              <DeleteDialog
                handleDialogClose={handleDialogClose}
                selectedId={selectedId}
                deleteItem={onDelete}
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

export default Expense;
