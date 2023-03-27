import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import { Add, Pending, SummarizeRounded, ThumbDown, ThumbUp } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Priority, SupportTicketStatus } from 'Helpers/Global';
import { DialogAction, DialogContent } from 'Components/Dialog';
import DialogMenu from 'Elements/Dialog';
import TicketCard from 'Components/CardLayouts/StaticCard';
import { useOutletContext } from 'react-router';
import supportTicketData from './data/SupportTicketData';
import AddSupportTicketForm from './AddSupportTicketForm';
import ViewSupportTicketDetails from './ViewSupportTicketDetails';

const adminSupportOptions = [{ title: 'View', value: 'view' }];

const empSupportOptions = [
  { title: 'Edit', value: 'edit' },
  { title: 'Delete', value: 'delete' }
];

const supportTicket = () => {
  const { columns: prCols, adminColumns: adminPrCol } = supportTicketData;
  const {
    role,
    GetSupportAdd,
    GetSupportList,
    GetSupportUpdate,
    GetSupportById,
    GetSupportDelete,
    GetSupportReason,
    Loading
  } = useOutletContext();
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
  const [approveRejectReason, setApproveRejectReason] = useState('');

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen || !isViewSupportTicketDialogOpen) {
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
  }, [isDialogOpen, filter, page, sort, isDeleteDialogOpen, isViewSupportTicketDialogOpen]);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
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

  const handleSupportStatus = (reasonData) => {
    GetSupportReason({ data: reasonData, id: selectedData.id }, () =>
      setIsViewSupportTicketDialogOpen(false)
    );
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
          onClickAction={(value, { id }) => {
            if (value === 'delete') {
              setSelectedData(id);
              setIsDeleteDialogOpen(true);
            } else {
              GetSupportById({ id }, (res) => {
                if (res && res.data && res.data.data) {
                  const { data } = res.data;
                  const setViewData = {
                    id: data.id,
                    subject: data.subject,
                    date: data.ticketDate,
                    department: data.department,
                    priority: data.priority,
                    status: data.status,
                    message: data.message.replace(/(<([^>]+)>)/gi, ''),
                    reason: data.reason
                  };
                  setSelectedData(setViewData);
                  if (value === 'edit') {
                    setIsEdit(true);
                    setIsDialogOpen(!isDialogOpen);
                  } else if (value === 'view') {
                    setIsViewSupportTicketDialogOpen(true);
                  }
                }
              });
            }
          }}
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
            title={isEdit ? 'EDIT YOUR SUPPORT TICKET' : 'ADD NEW SUPPORT TICKET'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedData={selectedData}
            isEdit={isEdit}
            GetSupportAdd={GetSupportAdd}
            GetSupportUpdate={GetSupportUpdate}
            Loading={Loading}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            dialogTitle="Delete"
            dialogContent={<DialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DialogAction
                rejectTitle="Cancel"
                approveTitle="Delete"
                handleReject={() => setIsDeleteDialogOpen(false)}
                handleApprove={() => onDelete()}
              />
            }
          />
        )}
      </Card>
      {isViewSupportTicketDialogOpen && selectedData && (
        <DialogMenu
          isOpen={isViewSupportTicketDialogOpen}
          onClose={() => setIsViewSupportTicketDialogOpen(false)}
          dialogTitle={`Ticket Details: ${selectedData.subject}`}
          dialogContent={
            <DialogContent
              customContent={
                <ViewSupportTicketDetails
                  data={selectedData}
                  role={role}
                  approveRejectReason={(value) => setApproveRejectReason(value)}
                />
              }
            />
          }
          dialogAction={
            role === 'admin' && (
              <DialogAction
                approveColor="success"
                rejectColor="error"
                approveTitle="Approve"
                rejectTitle="Reject"
                handleApprove={() =>
                  handleSupportStatus({
                    status: 'approved',
                    reason: approveRejectReason
                  })
                }
                handleReject={() =>
                  handleSupportStatus({
                    status: 'reject',
                    reason: approveRejectReason
                  })
                }
              />
            )
          }
        />
      )}
    </>
  );
};
export default supportTicket;
