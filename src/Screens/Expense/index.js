/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add, PendingTwoTone, SummarizeRounded, ThumbDown, ThumbUpAlt } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import DialogMenu from 'Elements/Dialog';
import { DeleteDialogAction, DeleteDialogContent } from 'Components/DeleteDialog';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ExpenseCard from '../../Components/CardLayouts/StaticCard';
import ViewExpenseDetails from './ViewExpenseDetails';
import AddExpenseForm from './AddExpenseForm';
import withStateDispatch from '../../Helpers/withStateDispatch';

const adminExpenseOptions = [{ title: 'View', value: 'view' }];
const empExpenseOptions = [
  { title: 'Edit', value: 'edit' },
  { title: 'View', value: 'view' },
  { title: 'Delete', value: 'delete' }
];

const ExpenseList = ({
  GetExpenseAdd,
  GetExpenseUpdate,
  GetExpenseList,
  GetExpenseDelete,
  GetExpenseById
}) => {
  const { columns: prCols, adminColumns: adminPrCol } = expenseListData;
  const { role } = useSelector((state) => state.login);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');
  const [isViewExpenseDialogOpen, setIsViewExpenseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({ key: 'createdAt', order: 'asc' });
  const [filter, setFilter] = useState(false);
  const [allExpense, setAllExpense] = useState([]);
  const [expenseCount, setExpenseCount] = useState(0);
  // const [isSearch, setIsSearch] = useState(false);
  // const [sortKey, setSortKey] = useState('createdAt');
  // const [sortOrder, setSortOrder] = useState('desc');
  // const [isExport, setIsExport] = useState(false);

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen || isViewExpenseDialogOpen) {
      GetExpenseList(
        {
          limit,
          search,
          page,
          sortKey: sort.key,
          sortOrder: sort.order
        },
        (res) => {
          // console.log("data===" , res)
          if (res && res.data && res.data.data) {
            // console.log("data===" , res)
            const { rows, count } = res.data.data;
            setAllExpense(rows);
            setExpenseCount(count);
            setFilter(false);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, filter, page, sort, isDeleteDialogOpen, isViewExpenseDialogOpen]);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  // const handleOpenDialog = () => {
  //   setIsExpenseDialogOpen(true);
  // };

  const handleCloseDialog = () => {
    setIsExpenseDialogOpen(false);
  };

  const handleCloseViewDialog = () => {
    setIsViewExpenseDialogOpen(false);
  };

  // const onClickView = (row) => {
  //   setSelectedData(row);
  //   handleOpenDialog();
  // };

  const onClickAction = (key, selectedExpenseData) => {
    if (key === 'edit') {
      setIsEdit(true);
      setSelectedData(selectedExpenseData.id);
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      GetExpenseById({ id: selectedExpenseData.id }, (res) => {
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
          if (role === 'admin') {
            setIsViewExpenseDialogOpen(true);
          } else {
            setIsViewExpenseDialogOpen(true);
          }
        }
      });
    } else {
      setSelectedId(selectedExpenseData.id);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = async () => {
    GetExpenseDelete({ selectedId }, () => handleDialogClose());
  };

  const handleClear = () => {
    setSearch('');
    setFilter(false);
  };

  // const onClickSearch = () => {
  //   // getAllExpenseList(sortKey, sortOrder, page, search, 0);
  // };

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
                onClick={() => handleDialog()}
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
          // loader={loader}
          // isSearch={isSearch}
        />

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allExpense}
          onClickAction={(data, value) => onClickAction(data, value)}
          isAction
          options={role === 'admin' ? adminExpenseOptions : empExpenseOptions}
          rowsCount={expenseCount.total}
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
          <AddExpenseForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => handleDialog()}
            title={isEdit ? 'UPDATE EXPENSE' : 'NEW EXPENSE'}
            button={isEdit ? 'UPDATE YOUR EXPENSE' : 'ADD YOUR EXPENSE'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedData={selectedData}
            // setSelectedData={(value) => setSelectedData(value)}
            isEdit={isEdit}
            // Loading={Loading}
            GetExpenseAdd={GetExpenseAdd}
            GetExpenseUpdate={GetExpenseUpdate}
            GetExpenseById={GetExpenseById}
          />
        )}

        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => handleDialogClose()}
            dialogTitle="Delete"
            dialogContent={<DeleteDialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DeleteDialogAction
                handleDialogClose={handleDialogClose}
                selectedId={selectedId}
                deleteItem={() => onDelete()}
                message="Are you sure want to delete this?"
                buttonTitle="Delete"
              />
            }
          />
        )}
      </Card>

      {isViewExpenseDialogOpen && selectedData && (
        <DialogMenu
          isOpen={isViewExpenseDialogOpen}
          onClose={handleCloseViewDialog}
          dialogTitle={`Expense Details: ${selectedData.itemName}`}
          dialogContent={<ViewExpenseDetails data={selectedData} role={role} />}
          dialogAction={
            role === 'admin' && (
              <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <Button
                    type="submit"
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={() => handleCloseDialog()}
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleCloseDialog()}
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

export default withStateDispatch(ExpenseList);
