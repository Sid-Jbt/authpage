import React, { useContext, useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import {
  Add,
  Check,
  ImportExportRounded,
  PendingTwoTone,
  SummarizeRounded,
  ThumbDown,
  ThumbUpAlt
} from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import DialogMenu from 'Elements/Dialog';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ExpenseCard from '../../Components/CardLayouts/StaticCard';
import ViewExpenseDetails from './ViewExpenseDetails';
import AddExpenseForm from './AddExpenseForm';
import DeleteDialog from '../../Components/DeleteDialog';
import { SnackbarContext } from '../../Context/SnackbarProvider';
import { getEmployeeExpenseCount, getEmployeeExpList } from '../../APIs/Expense';

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

  const [allEmployeeExpList, setAllEmployeeExpList] = useState([]);
  const [employeeExpListCount, setEmployeeExpListCount] = useState(0);
  const [sortKey, setSortKey] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isClear, setIsClear] = useState(false);

  const getEmployeeExpenseCounts = async () => {
    const empExpenseCountData = await getEmployeeExpenseCount();
    setCounts(empExpenseCountData.data);
  };

  const getEmployeeExpenseList = async (
    selectedSortKey = 'title',
    selectedSortOrder = 'asc',
    selectedPage = 0,
    text = '',
    count = 0,
    dataLimit = limit
  ) => {
    const employeeExpData = {
      limit: dataLimit,
      page: selectedPage,
      sortKey: selectedSortKey.toLowerCase(),
      sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      count
    };
    const employeeExpRes = await getEmployeeExpList(employeeExpData);
    const {
      status,
      data: { rows },
      message
    } = employeeExpRes;
    if (status) {
      setAllEmployeeExpList(rows);
      setEmployeeExpListCount(employeeExpRes.data.count);
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        color: 'success',
        open: true
      });
    }
  };

  useEffect(() => {
    getEmployeeExpenseCounts();
    getEmployeeExpenseList();
  }, []);

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
      // setSelectedData(prRows.find((o) => o.id === index));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      // setSelectedData(prRows.find((o) => o.id === index));
      setIsViewExpenseDialogOpen(true);
    } else {
      setSelectedId(index);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleChangeSearch = (event) => {
    setSearch(event);
  };

  const handleClear = () => {
    setSearch('');
    setIsClear(!isClear);
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = () => {
    handleDialogClose();
  };

  const onClickExport = () => {
    setSnack({
      title: 'Warning',
      message: 'Export coming soon...',
      time: false,
      icon: <Check color="white" />,
      color: 'warning',
      open: true
    });
  };

  const onClickSearch = () => {
    getEmployeeExpenseList(sortKey, sortOrder, page, search, 0);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
    await getEmployeeExpenseList(sortKey, sortOrder, selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
    await getEmployeeExpenseList(sortKey, sortOrder, selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
    await getEmployeeExpenseList(selectedSortKey, selectedSortOrder, page);
  };

  useEffect(() => {
    if (isClear) {
      getEmployeeExpenseCounts();
      getEmployeeExpenseList(sortKey, sortOrder, page, '');
    }
  }, [isClear]);

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Total Expense"
            count={counts && counts.Total}
            icon={{ color: 'success', component: <SummarizeRounded /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Approved"
            count={counts && counts.Approved}
            icon={{ color: 'success', component: <ThumbUpAlt /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Declined"
            count={counts && counts.Reject}
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Pending"
            count={counts && counts.Pending}
            icon={{ color: 'warning', component: <PendingTwoTone /> }}
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
            onClick={onClickExport}
          >
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
          handleSearch={handleChangeSearch}
          handleClear={() => handleClear()}
          onClickSearch={() => onClickSearch()}
        />

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allEmployeeExpList}
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction={role !== 'admin'}
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'View', value: 'view' },
            { title: 'Delete', value: 'delete' }
          ]}
          isView={role === 'admin'}
          isDialogAction={(row) => onClickView(row)}
          rowsCount={employeeExpListCount}
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
          dialogTitle={`Expense Details: ${selectedData.title}`}
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
