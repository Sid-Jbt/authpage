import React, { useContext, useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import { Add, Pending, SummarizeRounded, ThumbDown, ThumbUp } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Priority, SupportTicketStatus } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import TicketCard from 'Components/CardLayouts/StaticCard';
import DeleteDialog from 'Components/DeleteDialog';
import DialogMenu from 'Elements/Dialog';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { getSupportTicketLists } from 'APIs/SupportTicket';
import ViewSupportTicketDetails from './ViewSupportTicketDetails';
import AddSupportTicketForm from './AddSupportTicketForm';
import supportTicketData from './data/SupportTicketData';

// const EXPORT_URL = process.env.REACT_APP_EXPORT_URL;

const adminSupportOptions = [{ title: 'View', value: 'view' }];

const empSupportOptions = [
  { title: 'Edit', value: 'edit' },
  { title: 'View', value: 'view' }
];

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
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  // const [isExport, setIsExport] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const getAllSupportTicketList = async (
    selectedSortKey = 'createdAt',
    selectedSortOrder = 'desc',
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
      sortKey: selectedSortKey,
      sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      startDate: date,
      priority: selectedPriority,
      status: selectedStatus,
      count
    };
    const ticketsRes = await getSupportTicketLists(ticketsData);
    const {
      status,
      data: { rows },
      message
    } = ticketsRes;
    if (status) {
      setCounts(ticketsRes.data.count);
      setAllSpTicketList(rows);
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
    console.log('dsijkfgsufuafu');
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

  const onClickAction = (key, data) => {
    if (key === 'edit') {
      setIsEdit(true);
      setSelectedData(allSpTicketList.find((o) => o.id === data.id));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      if (role === 'admin') {
        onClickView(data);
      } else {
        const viewData = allSpTicketList.find((o) => o.id === data.id);
        const setViewData = {
          subject: viewData.subject,
          date: viewData.ticketDate,
          department: viewData.department,
          priority: viewData.priority,
          status: viewData.status,
          message: viewData.message.replace(/(<([^>]+)>)/gi, '')
        };
        setSelectedData(setViewData);
        setIsViewSupportTicketDialogOpen(true);
      }
    } else {
      setSelectedId(data.id);
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

  /* const onClickExport = async (
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
    setIsExport(true);
    setLoader(true);
    const exportRes = await getEmployeeTicketExportList(exportData);

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

  const handleChangeStartDate = (event) => {
    setSelectDate(event.target.value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleClear = () => {
    setSelectDate('');
    setPriority('');
    setIsStatus('');
    setSearch('');
    getAllSupportTicketList(sortKey, sortOrder, page, '', selectDate);
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
    setPage(0);
    await getAllSupportTicketList(sortKey, sortOrder, 0, '', '', '', '', 0, selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
    await getAllSupportTicketList(selectedSortKey, selectedSortOrder, page);
  };

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
        {/* <Grid item xs="auto">
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
          onClickAction={(value, row) => onClickAction(value, row)}
          isAction
          options={role === 'admin' ? adminSupportOptions : empSupportOptions}
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
          dialogTitle={`Ticket Details: ${selectedData.subject}`}
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
