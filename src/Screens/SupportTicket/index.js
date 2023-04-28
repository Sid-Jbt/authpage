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
import { Priority, actionStatus, userPermission } from 'Helpers/Global';
import { DialogAction, DialogContent } from 'Components/Dialog';
import DialogMenu from 'Elements/Dialog';
import TicketCard from 'Components/CardLayouts/StaticCard';
import { useOutletContext } from 'react-router';
import { supportTicketData } from 'StaticData/supportTicketData';
import moment from 'moment';
import AddSupportTicketForm from './AddSupportTicketForm';
import SupportTicketDetails from './SupportTicketDetails';

const SupportTicket = () => {
  const { columns: prCols, adminColumns: adminPrCol } = supportTicketData;
  const {
    GetSupportAddUpdate,
    GetSupportList,
    GetSupportById,
    GetSupportDelete,
    GetSupportReason,
    Loading,
    permission
  } = useOutletContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewSupportTicketDialogOpen, setIsViewSupportTicketDialogOpen] = useState(false);

  const [allSpTicketList, setAllSpTicketList] = useState([]);
  const [spTicketListCount, setSpTicketListCount] = useState(0);
  const [sort, setSort] = useState({ key: 'priority', order: 'asc' });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState(false);
  const [approveRejectReason, setApproveRejectReason] = useState('');

  const isAdmin =
    permission &&
    permission.organisation &&
    Object.values(permission.organisation).some((x) => x === 1) &&
    Object.values(permission.supportTicket).some((x) => x === 1);

  const userPermissions = userPermission(
    permission !== null && permission.hasOwnProperty('supportTicket') && permission.supportTicket
  );

  const [filterData, setFilterData] = useState({
    startDate: '',
    priority: '',
    search: '',
    status: ''
  });

  const isValues = !Object.values(filterData).some((x) => x !== '');

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen || !isViewSupportTicketDialogOpen) {
      GetSupportList(
        {
          limit: isNaN(limit) ? 0 : limit,
          page,
          sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
          sortOrder: sort.order,
          startDate: filterData.startDate,
          status: filterData.status.value,
          priority: filterData.priority.value,
          search: filterData.search
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
  }, [isDialogOpen, filter, page, sort, isDeleteDialogOpen, isViewSupportTicketDialogOpen, limit]);

  const handleClear = () => {
    setFilterData({
      startDate: '',
      priority: '',
      search: '',
      status: ''
    });
    setFilter(!filter);
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
      </Grid>
      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={filterData.search}
          handleSearch={(e) => setFilterData({ ...filterData, search: e.target.value })}
          handleClear={() => !isValues && handleClear()}
          isDisable={spTicketListCount && spTicketListCount.totalSupportTicket <= 0}
          onClickSearch={() => !isValues && setFilter(!filter)}
        >
          <Grid item xs={12} md={4} lg={3}>
            <Input
              type="date"
              label="Select Date"
              size="small"
              fullWidth
              id="date"
              name="startDate"
              errorFalse
              inputProps={{
                min: moment().subtract(50, 'Y').format('YYYY-MM-DD')
              }}
              value={filterData.startDate}
              onChange={(e) => setFilterData({ ...filterData, startDate: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Priority</FormLabel>
              <Select
                size="small"
                value={filterData.priority}
                options={Priority}
                onChange={(value) => setFilterData({ ...filterData, priority: value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                size="small"
                value={filterData.status}
                options={actionStatus}
                onChange={(value) => setFilterData({ ...filterData, status: value })}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={isAdmin ? adminPrCol : prCols}
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
          isAction={!isAdmin}
          options={userPermissions}
          isView={
            isAdmin && [
              {
                name: 2,
                tooltip: 'Click to view',
                color: 'info',
                icon: <RemoveRedEye />,
                value: 'view'
              },
              {
                name: 3,
                tooltip: 'Edit',
                color: 'info',
                icon: <EditOutlined />,
                value: 'edit'
              },
              {
                name: 4,
                tooltip: 'Delete',
                color: 'error',
                icon: <DeleteForeverRounded />,
                value: 'delete'
              }
            ]
          }
          rowsCount={spTicketListCount.total}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={isNaN(limit) ? spTicketListCount.total : limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
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
          onClose={() => {
            setIsViewSupportTicketDialogOpen(false);
            setSelectedData(null);
          }}
          dialogTitle={selectedData.subject}
          dialogContent={
            <DialogContent
              customContent={
                <SupportTicketDetails
                  data={selectedData}
                  isAdmin={isAdmin}
                  approveRejectReason={(value) => setApproveRejectReason(value)}
                />
              }
            />
          }
          dialogAction={
            isAdmin &&
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
export default SupportTicket;
