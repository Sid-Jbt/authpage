import React, { useContext, useEffect, useState } from 'react';
import { Card, CircularProgress, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import {
  Add,
  Check,
  ImportExportRounded,
  Pending,
  SummarizeRounded,
  ThumbDown,
  ThumbUp
} from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Badge from 'Elements/Badge';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Priority, SupportTicketStatus } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import supportTicketData from './data/SupportTicketData';
import AddSupportTicketForm from './AddSupportTicketForm';
import TicketCard from '../../Components/CardLayouts/StaticCard';
import DeleteDialog from '../../Components/DeleteDialog';
import DialogMenu from '../../Elements/Dialog';
import ViewSupportTicketDetails from './ViewSupportTicketDetails';
import { SnackbarContext } from '../../Context/SnackbarProvider';
import { getEmployeeTicketExportList, getSupportTicketLists } from '../../APIs/SupportTicket';

const EXPORT_URL = process.env.REACT_APP_EXPORT_URL;

const supportTicket = () => {
  const { columns: prCols, adminColumns: adminPrCol } = supportTicketData;
  const { setSnack } = useContext(SnackbarContext);
  const { role } = useSelector((state) => state.route);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectDate, setSelectDate] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [priority, setPriority] = useState('');
  const [isStatus, setIsStatus] = useState('');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSupportTicketDialogOpen, setIsSupportTicketDialogOpen] = useState(false);
  const [isViewSupportTicketDialogOpen, setIsViewSupportTicketDialogOpen] = useState(false);
  const [counts, setCounts] = useState(null);
  const [loader, setLoader] = useState(false);

  const [allSpTicketList, setAllSpTicketList] = useState([]);
  const [spTicketListCount, setSpTicketListCount] = useState(0);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isClear, setIsClear] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const getAllSupportTicketList = async (
    selectedSortKey = 'createdAt',
    selectedSortOrder = 'asc',
    selectedPage = 0,
    text = '',
    date = '',
    selectedPriority = '',
    selectedStatus = '',
    count = 0,
    dataLimit = limit
  ) => {
    const ticketsData = {
      limit: dataLimit,
      page: selectedPage,
      sortKey: selectedSortKey.toLowerCase(),
      sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      selectDate: date,
      priority: selectedPriority,
      isStatus: selectedStatus,
      count
    };
    const ticketsRes = await getSupportTicketLists(ticketsData);
    const {
      status,
      data: { rows },
      message
    } = ticketsRes;
    if (status) {
      const supportTicketStatusData = rows.map((rowId) => ({
        ...rowId,
        priority: (
          <Badge
            variant="gradient"
            badgeContent={rowId.priority}
            color={
              rowId.priority === 'medium' || rowId.priority === 'Medium'
                ? 'warning'
                : rowId.priority === 'low' || rowId.priority === 'Low'
                ? 'info'
                : 'error'
            }
            size="xs"
            container
            customWidth={100}
          />
        ),
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
      setCounts(ticketsRes.data.count);
      setAllSpTicketList(supportTicketStatusData);
      setSpTicketListCount(ticketsRes.data.count.total);
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
    getAllSupportTicketList();
  }, [isDialogOpen, isDeleteDialogOpen]);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleOpenDialog = () => {
    setIsSupportTicketDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsSupportTicketDialogOpen(false);
  };

  const handleCloseViewDialog = () => {
    setIsViewSupportTicketDialogOpen(false);
  };

  const onClickView = (row) => {
    setSelectedData(row);
    handleOpenDialog();
  };

  const onClickAction = (key, index) => {
    if (key === 'edit') {
      setIsEdit(true);
      setSelectedData(allSpTicketList.find((o) => o.id === index));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      const viewData = allSpTicketList.find((o) => o.id === index);
      const setViewData = {
        subject: viewData.subject,
        date: viewData.ticketDate,
        department: viewData.department,
        priority: viewData.priority,
        status: viewData.status,
        message: viewData.message
      };
      setSelectedData(setViewData);
      setIsViewSupportTicketDialogOpen(true);
    } else {
      setSelectedId(index);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = () => {
    handleDialogClose();
  };

  const handleChangeStatus = (value) => {
    setIsStatus(value);
  };

  const handleChangePriority = (value) => {
    setPriority(value);
  };

  const onClickExport = async (
    selectedSortKey = 'createdAt',
    selectedSortOrder = 'asc',
    selectedPage = 0,
    text = '',
    date = '',
    selectedPriority = '',
    selectedStatus = '',
    count = 0,
    dataLimit = limit
  ) => {
    const exportData = {
      limit: dataLimit,
      page: selectedPage,
      sortKey: selectedSortKey.toLowerCase(),
      sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      selectDate: date,
      priority: selectedPriority,
      isStatus: selectedStatus,
      count
    };
    let exportRes;
    setIsExport(true);
    setLoader(true);
    if (role === 'admin') {
      // Replace with getExportExpenseLists
      // exportRes = await getEmployeeExpenseExportList(exportData);
    } else {
      exportRes = await getEmployeeTicketExportList(exportData);
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
  };

  const handleChangeStartDate = (event) => {
    setSelectDate(event.target.value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSelectDate('');
    setPriority('');
    setIsStatus('');
    setSearch('');
    setIsClear(!isClear);
  };
  const onClickSearch = () => {
    setLoader(true);
    setIsSearch(true);
    getAllSupportTicketList(
      sortKey,
      sortOrder,
      page,
      search,
      selectDate,
      priority.value,
      isStatus.value,
      0
    );
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
    await getAllSupportTicketList(sortKey, sortOrder, selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
    await getAllSupportTicketList(sortKey, sortOrder, 0, '', '', '', '', 0, selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
    await getAllSupportTicketList(selectedSortKey, selectedSortOrder, page);
  };

  useEffect(() => {
    if (isClear) {
      getAllSupportTicketList(sortKey, sortOrder, page, '', selectDate);
    }
  }, [isClear]);

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Total Tickets"
            count={counts && counts.total}
            icon={{ color: 'success', component: <SummarizeRounded /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Approved"
            count={counts && counts.approved}
            icon={{ color: 'success', component: <ThumbUp /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Declined"
            count={counts && counts.rejected}
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Pending"
            count={counts && counts.pending}
            icon={{ color: 'info', component: <Pending /> }}
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
              onClick={handleDialog}
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
              } &&
                loader &&
                isExport && { height: '40px !important' }
            })}
            variant="outlined"
            size="small"
            onClick={onClickExport}
          >
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            {loader && isExport ? <CircularProgress color="inherit" /> : 'Export'}
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
          loader={loader}
          isSearch={isSearch}
        >
          <Grid item xs={12} md={4} lg={3}>
            <Input
              type="date"
              label="Select Date"
              size="small"
              fullWidth
              id="date"
              name="Date"
              value={selectDate !== '' ? selectDate : ''}
              onChange={(value) => handleChangeStartDate(value)}
              errorFalse
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Priority</FormLabel>
              <Select
                value={priority}
                options={Priority}
                onChange={(value) => handleChangePriority(value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                value={isStatus}
                options={SupportTicketStatus}
                onChange={(value) => handleChangeStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allSpTicketList}
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction={role !== 'admin'}
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'View', value: 'view' }
            /* { title: 'Delete', value: 'delete' } */
          ]}
          isView={role === 'admin'}
          isDialogAction={(row) => onClickView(row)}
          rowsCount={spTicketListCount}
          initialPage={page}
          onChangePage={(value) => onPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => onRowsPerPageChange(rowsPerPage)}
          sortKey={sortKey}
          sortOrder={sortOrder}
          handleRequestSort={(event, orderName, orderKey) => onSort(event, orderName, orderKey)}
        />
        {isDialogOpen && (
          <AddSupportTicketForm
            isDialogOpen={isDialogOpen}
            handleDialog={handleDialog}
            title={isEdit ? 'EDIT YOUR SUPPORT TICKET' : 'ADD NEW SUPPORT TICKET'}
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
      {(isSupportTicketDialogOpen || isViewSupportTicketDialogOpen) && selectedData && (
        <DialogMenu
          isOpen={isSupportTicketDialogOpen || isViewSupportTicketDialogOpen}
          onClose={isSupportTicketDialogOpen ? handleCloseDialog : handleCloseViewDialog}
          dialogTitle={`Expense Details: ${selectedData.subject}`}
          dialogContent={<ViewSupportTicketDetails info={selectedData} />}
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
export default supportTicket;
