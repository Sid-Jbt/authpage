import React, { useContext, useEffect, useState } from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import {
  Add,
  DirectionsRun,
  Vaccines,
  CalendarMonth,
  Celebration,
  Check
} from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/StaticCard';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import { useSelector } from 'react-redux';
import DeleteDialog from 'Components/DeleteDialog';
import DialogMenu from 'Elements/Dialog';
import { getLeaveLists, deleteLeave } from 'APIs/Leave';
import { SnackbarContext } from 'Context/SnackbarProvider';
import leaveListData from './data/leaveListData';
import AddLeaveForm from './AddLeaveForm';
import ViewLeaveDetails from './ViewLeaveDetails';

const adminLeaveOptions = [{ title: 'View', value: 'view' }];
const empLeaveOptions = [
  { title: 'Edit', value: 'edit' },
  { title: 'View', value: 'view' },
  { title: 'Delete', value: 'delete' }
];

const Leave = () => {
  const { columns: prCols, adminColumns: adminPrCol } = leaveListData;
  const { role } = useSelector((state) => state.route);
  const { setSnack } = useContext(SnackbarContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search, setSearch] = useState('');
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isViewLeaveDialogOpen, setIsViewLeaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [counts, setCounts] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loader, setLoader] = useState(false);

  const [allLeaveList, setAllLeaveList] = useState([]);
  const [leaveListCount, setLeaveListCount] = useState(0);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  const getAllLeaveList = async (
    selectedSortKey = 'createdAt',
    selectedSortOrder = 'desc',
    selectedPage = 0,
    text = '',
    startDate = '',
    endDate = '',
    count = 0,
    dataLimit = limit
  ) => {
    const leaveData = {
      limit: dataLimit,
      page: selectedPage,
      sortKey: selectedSortKey.toLowerCase(),
      sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      startDate,
      endDate,
      count
    };

    const leaveRes = await getLeaveLists(leaveData);
    const {
      status,
      data: { rows },
      message
    } = leaveRes;
    if (status) {
      setAllLeaveList(rows);
      setCounts(leaveRes.data.count);
      setLeaveListCount(leaveRes.data.count.total);
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
    getAllLeaveList();
  }, [isDialogOpen]);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleOpenDialog = () => {
    setIsLeaveDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsLeaveDialogOpen(false);
  };

  const handleCloseViewDialog = () => {
    setIsViewLeaveDialogOpen(false);
  };

  const onClickView = (row) => {
    setSelectedData(row);
    handleOpenDialog();
  };

  const onClickAction = (key, data) => {
    if (key === 'edit') {
      setIsEdit(true);
      setSelectedData(allLeaveList.find((o) => o.id === data.id));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      if (role === 'admin') {
        onClickView(data);
      } else {
        const viewData = allLeaveList.find((o) => o.id === data.id);
        const setViewData = {
          leaveType: viewData.leaveType,
          selectType: viewData.selectType,
          fromDate: viewData.fromDate,
          toDate: viewData.toDate,
          noOfDays: viewData.noOfDays,
          apporvedBy: viewData.approvedBy,
          status: viewData.status,
          reason: viewData.reason.replace(/(<([^>]+)>)/gi, '')
        };
        setSelectedData(setViewData);
        setIsViewLeaveDialogOpen(true);
      }
    } else {
      setSelectedId(data.id);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleChangeStartDate = (event, string) => {
    if (string === 'fromDate') {
      setFromDate(event.target.value);
    } else {
      setToDate(event.target.value);
    }
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = async () => {
    handleDialogClose();
    const deleteRes = await deleteLeave(selectedId);
    const { status, message } = deleteRes;
    setLoader(false);
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      getAllLeaveList();
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'error',
        open: true
      });
    }
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    setSearch('');
    getAllLeaveList();
  };

  const onClickSearch = () => {
    setLoader(true);
    setIsSearch(true);
    getAllLeaveList(sortKey, sortOrder, page, search, fromDate, toDate, 0);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
    await getAllLeaveList(sortKey, sortOrder, selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
    await getAllLeaveList(sortKey, sortOrder, 0, '', '', '', selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
    await getAllLeaveList(selectedSortKey, selectedSortOrder, page);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Total Leave"
            count={counts && counts.totalLeave}
            icon={{ color: 'info', component: <CalendarMonth /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Medical Leave"
            count={counts && counts.medicalLeave}
            icon={{ color: 'warning', component: <Vaccines /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Other Leave"
            count={counts && counts.otherLeave}
            icon={{ color: 'primary', component: <Celebration /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Remaining Leave"
            count={counts && counts.remainingLeave}
            icon={{ color: 'success', component: <DirectionsRun /> }}
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
                APPLY
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
          handleSearch={handleChangeSearch}
          handleClear={() => handleClear()}
          onClickSearch={() => onClickSearch()}
          loader={loader}
          isSearch={isSearch}
        >
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
              value={fromDate !== '' ? fromDate : ''}
              onChange={(value) => handleChangeStartDate(value, 'fromDate')}
              errorFalse
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="To Date"
              size="small"
              fullWidth
              id="toDate"
              name="toDate"
              value={toDate !== '' ? toDate : ''}
              onChange={(value) => handleChangeStartDate(value, 'toDate')}
              errorFalse
            />
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allLeaveList}
          onClickAction={(value, data) => onClickAction(value, data)}
          isAction
          options={role === 'admin' ? adminLeaveOptions : empLeaveOptions}
          rowsCount={leaveListCount}
          initialPage={page}
          onChangePage={(value) => onPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => onRowsPerPageChange(rowsPerPage)}
          sortKey={sortKey}
          sortOrder={sortOrder}
          handleRequestSort={(event, orderName, orderKey) => onSort(event, orderName, orderKey)}
        />
        {isDialogOpen && (
          <AddLeaveForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => handleDialog()}
            title={isEdit ? 'EDIT YOUR LEAVE' : 'ADD NEW LEAVE'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedData={selectedData}
            setSelectedData={(value) => setSelectedData(value)}
            isEdit={isEdit}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => handleDialogClose()}
            dialogTitle="Delete"
            dialogContent={
              <DeleteDialog
                handleDialogClose={() => handleDialogClose()}
                selectedId={selectedId}
                message="Are you sure want to delete this?"
                deleteItem={() => onDelete()}
                buttonTitle="Delete"
              />
            }
          />
        )}
      </Card>

      {(isLeaveDialogOpen || isViewLeaveDialogOpen) && selectedData && (
        <DialogMenu
          isOpen={isLeaveDialogOpen || isViewLeaveDialogOpen}
          onClose={isLeaveDialogOpen ? handleCloseDialog : handleCloseViewDialog}
          dialogTitle={`Leave Details: ${selectedData.leaveType}`}
          dialogContent={<ViewLeaveDetails info={selectedData} />}
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

export default Leave;
