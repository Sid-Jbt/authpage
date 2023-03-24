import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import { Add, Pending, SummarizeRounded, ThumbDown, ThumbUp } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Priority, SupportTicketStatus } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import { DeleteDialogAction, DeleteDialogContent } from 'Components/DeleteDialog';
import withStateDispatch from 'Helpers/withStateDispatch';
import DialogMenu from 'Elements/Dialog';
import TicketCard from 'Components/CardLayouts/StaticCard';
import supportTicketData from './data/SupportTicketData';
import AddSupportTicketForm from './AddSupportTicketForm';
import ViewSupportTicketDetails from './ViewSupportTicketDetails';

const adminSupportOptions = [{ title: 'View', value: 'view' }];

const empSupportOptions = [
  { title: 'Edit', value: 'edit' },
  { title: 'View', value: 'view' },
  { title: 'Delete', value: 'delete' }
];

const supportTicket = ({
  GetSupportAdd,
  GetSupportList,
  GetSupportUpdate,
  GetSupportById,
  GetSupportDelete
}) => {
  const { columns: prCols, adminColumns: adminPrCol } = supportTicketData;
  const { role } = useSelector((state) => state.login);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewSupportTicketDialogOpen, setIsViewSupportTicketDialogOpen] = useState(false);

  const [allSpTicketList, setAllSpTicketList] = useState([]);
  const [spTicketListCount, setSpTicketListCount] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ key: 'priority', order: 'asc' });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [filter, setFilter] = useState(false);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen) {
      GetSupportList(
        {
          limit,
          search,
          page,
          sortKey: sort.key,
          sortOrder: sort.order,
          priority: priority.value,
          status: status.value,
          startDate
        },
        (res) => {
          if (res && res.data && res.data.data) {
            const { data } = res.data;
            setAllSpTicketList(data.rows);
            setSpTicketListCount(data.count);
            setFilter(false);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, filter, page, sort, isDeleteDialogOpen]);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleCloseViewDialog = () => {
    setIsViewSupportTicketDialogOpen(false);
  };

  const onClickAction = (key, selectedSupportData) => {
    if (key === 'edit') {
      setSelectedData(selectedSupportData);
      setIsEdit(true);
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      GetSupportById({ id: selectedSupportData.id }, (res) => {
        if (res && res.data && res.data.data) {
          const { data } = res.data;
          setSelectedData({
            subject: data.subject,
            date: data.ticketDate,
            department: data.department,
            priority: data.priority,
            status: data.status,
            message: data.message.replace(/(<([^>]+)>)/gi, '')
          });
        }
      });
      setIsViewSupportTicketDialogOpen(true);
    } else if (key === 'delete') {
      setSelectedData(selectedSupportData);
      setIsDeleteDialogOpen(true);
    }
  };

  const onDelete = () => {
    GetSupportDelete(selectedData, () => setIsDeleteDialogOpen(false));
  };

  const handleClear = () => {
    setStartDate('');
    setPriority('');
    setStatus('');
    setSearch('');
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Total Tickets"
            count={spTicketListCount && spTicketListCount.totalSupportTicket}
            icon={{ color: 'success', component: <SummarizeRounded /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Approved"
            count={spTicketListCount && spTicketListCount.approved}
            icon={{ color: 'success', component: <ThumbUp /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Declined"
            count={spTicketListCount && spTicketListCount.rejected}
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Pending"
            count={spTicketListCount && spTicketListCount.pending}
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
          handleSearch={(e) => setSearch(e.target.value.trim())}
          handleClear={handleClear}
          onClickSearch={() => {
            setFilter(!filter);
          }}
        >
          <Grid item xs={12} md={4} lg={3}>
            <Input
              type="date"
              label="Select Date"
              size="small"
              fullWidth
              id="date"
              name="startDate"
              value={startDate !== '' ? startDate : ''}
              onChange={(event) => setStartDate(event.target.value)}
              errorFalse
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Priority</FormLabel>
              <Select
                value={priority}
                options={Priority}
                onChange={(value) => setPriority(value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                value={status}
                options={SupportTicketStatus}
                onChange={(value) => setStatus(value)}
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
          rowsCount={spTicketListCount.total}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, orderKey, orderName) =>
            setSort({ order: orderName, key: orderKey })
          }
        />
        {isDialogOpen && (
          <AddSupportTicketForm
            isDialogOpen={isDialogOpen}
            handleDialog={handleDialog}
            title={isEdit ? 'UPDATE SUPPORT TICKET' : 'NEW SUPPORT TICKET'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedSupportId={selectedData && selectedData.id}
            isEdit={isEdit}
            GetSupportAdd={GetSupportAdd}
            GetSupportUpdate={GetSupportUpdate}
            GetSupportById={GetSupportById}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            dialogTitle="Delete"
            dialogContent={<DeleteDialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DeleteDialogAction
                handleDialogClose={() => setIsDeleteDialogOpen(false)}
                selectedId={selectedData.id}
                deleteItem={() => onDelete()}
              />
            }
          />
        )}
      </Card>
      {isViewSupportTicketDialogOpen && selectedData && (
        <DialogMenu
          isOpen={isViewSupportTicketDialogOpen}
          onClose={handleCloseViewDialog}
          dialogTitle={`Ticket Details: ${selectedData.subject}`}
          dialogContent={<ViewSupportTicketDetails info={selectedData} role={role} />}
          dialogAction={
            role === 'admin' && (
              <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <Button
                    type="submit"
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={() => setIsViewSupportTicketDialogOpen(false)}
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => setIsViewSupportTicketDialogOpen(false)}
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
export default withStateDispatch(supportTicket);
