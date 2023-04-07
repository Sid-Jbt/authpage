import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import {
  Add,
  DeleteForeverRounded,
  EditOutlined,
  Pending,
  RemoveRedEye,
  SummarizeRounded,
  ThumbDown,
  ThumbUp
} from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Priority, actionStatus } from 'Helpers/Global';
import { DialogAction, DialogContent } from 'Components/Dialog';
import DialogMenu from 'Elements/Dialog';
import TicketCard from 'Components/CardLayouts/StaticCard';
import { useOutletContext } from 'react-router';
import supportTicketData from './data/SupportTicketData';
import AddSupportTicketForm from './AddSupportTicketForm';
import ViewSupportTicketDetails from './ViewSupportTicketDetails';

const supportTicket = () => {
  const { columns: prCols, adminColumns: adminPrCol } = supportTicketData;
  const {
    role,
    GetSupportAddUpdate,
    GetSupportList,
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
          sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
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
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, filter, page, sort, isDeleteDialogOpen, isViewSupportTicketDialogOpen]);

  const handleClear = () => {
    setStartDate('');
    setPriority('');
    setStatus('');
    setSearch('');
    setFilter(false);
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
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          >
            <Icon sx={{ mr: 1 }}>
              <Add />
            </Icon>
            Add
          </Button>
        </Grid>
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
          handleSearch={(e) => setSearch(e.target.value)}
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
                options={actionStatus}
                onChange={(value) => setStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allSpTicketList}
          badge={['status', 'priority']}
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
                    message: data.message.replace(/(<([^>]+)>)/gi, ''),
                    ...(value === 'view' && { status: data.status }),
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
          isAction={role !== 'admin'}
          options={[
            { name: 'edit', title: 'Edit', value: 'edit' },
            { name: 'delete', title: 'Delete', value: 'delete' },
            { name: 'view', title: 'View', value: 'view' }
          ]}
          isView={
            role === 'admin' && [
              {
                name: 3,
                tooltip: 'Click to view',
                color: 'info',
                icon: <RemoveRedEye />,
                value: 'view'
              },
              {
                name: 2,
                tooltip: 'Edit',
                color: 'info',
                icon: <EditOutlined />,
                value: 'edit'
              },
              {
                name: 4,
                tooltip: 'delete',
                color: 'error',
                icon: <DeleteForeverRounded />,
                value: 'delete'
              }
            ]
          }
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
            handleDialog={() => {
              setIsDialogOpen(!isDialogOpen);
              setIsEdit(false);
              setSelectedData(null);
            }}
            title={isEdit ? 'UPDATE SUPPORT TICKET' : 'NEW SUPPORT TICKET'}
            selectedData={selectedData}
            isEdit={isEdit}
            GetSupportAddUpdate={GetSupportAddUpdate}
            Loading={Loading}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            dialogTitle="Delete Support Ticket"
            dialogContent={<DialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DialogAction
                rejectTitle="Cancel"
                approveTitle="Delete"
                handleReject={() => setIsDeleteDialogOpen(false)}
                handleApprove={() =>
                  GetSupportDelete(selectedData, () => {
                    setIsDeleteDialogOpen(false);
                    setIsEdit(false);
                  })
                }
              />
            }
          />
        )}
      </Card>
      {isViewSupportTicketDialogOpen && selectedData && (
        <DialogMenu
          isOpen={isViewSupportTicketDialogOpen}
          onClose={() => setIsViewSupportTicketDialogOpen(false)}
          dialogTitle={selectedData.subject}
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
            role === 'admin' &&
            selectedData.status === 'pending' && (
              <DialogAction
                approveColor="success"
                rejectColor="error"
                approveTitle="Approve"
                rejectTitle="Reject"
                approveDisable={!approveRejectReason}
                rejectDisable={!approveRejectReason}
                handleApprove={() =>
                  GetSupportReason(
                    {
                      data: {
                        status: 'approved',
                        reason: approveRejectReason
                      },
                      id: selectedData.id
                    },
                    () => setIsViewSupportTicketDialogOpen(false)
                  )
                }
                handleReject={() =>
                  GetSupportReason(
                    {
                      data: {
                        status: 'reject',
                        reason: approveRejectReason
                      },
                      id: selectedData.id
                    },
                    () => setIsViewSupportTicketDialogOpen(false)
                  )
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
