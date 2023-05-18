import React, { useEffect, useState } from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import {
  Add,
  DirectionsRun,
  Vaccines,
  CalendarMonth,
  Celebration,
  TimeToLeaveRounded
} from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/StaticCard';
import FilterLayout from 'Components/FilterLayout';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import { useOutletContext } from 'react-router';
import { leaveListData } from 'StaticData/leaveListData';
import Select from 'Elements/Select';
import {
  actionStatus,
  Months,
  userArray,
  Years,
  userPermission,
  CheckPermission,
  userIsViewIconPermissions
} from 'Helpers/Global';
import AddLeaveForm from './AddLeaveForm';
import LeaveDetails from './LeaveDetails';

const LeaveList = () => {
  const { columns: prCols, adminColumns: adminPrCol } = leaveListData;
  const {
    Loading,
    GetLeaveAddUpdate,
    GetLeaveList,
    GetLeaveDelete,
    GetLeaveReason,
    GetLeaveById,
    GetEmployeeList,
    permission
  } = useOutletContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isViewLeaveDialogOpen, setIsViewLeaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({ key: 'fromDate', order: 'asc' });
  const [filter, setFilter] = useState(false);
  const [allLeave, setAllLeave] = useState([]);
  const [leaveCount, setLeaveCount] = useState({});
  const [approveRejectReason, setApproveRejectReason] = useState('');
  const [userList, setUserList] = useState([]);

  const isAdmin = CheckPermission(
    permission && permission.organisation,
    '&&',
    permission.leave && permission.leave.w === 0
  );

  const isAuthorised = !!(permission && permission.leave && permission.leave.a === 1);

  const uiPermission = !!(permission && permission.leave && permission.leave.w === 1);

  const [filterData, setFilterData] = useState({
    search: '',
    status: '',
    month: '',
    year: '',
    user: ''
  });

  const userPermissions = userPermission(permission.hasOwnProperty('leave') && permission.leave);

  const isViewIconPermissions = userIsViewIconPermissions(
    permission.hasOwnProperty('leave') && permission.leave,
    [3]
  );

  const isValues = !(
    filterData.search === '' &&
    filterData.status === '' &&
    filterData.month === '' &&
    filterData.year === '' &&
    filterData.user.value === ''
  );

  useEffect(() => {
    if (isAdmin) {
      GetEmployeeList({ limit: 0 }, (res) => {
        if (res && res.data && res.data.data) {
          setUserList(userArray(res.data.data.rows));
          setFilterData({ ...filterData, user: userArray(res.data.data.rows)[0] });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen || isViewLeaveDialogOpen) {
      GetLeaveList(
        {
          limit: isNaN(limit) ? 0 : limit,
          user: filterData.user.value,
          month: filterData.month.value,
          year: filterData.year.value,
          status: filterData.status.value,
          search: filterData.search,
          page,
          sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
          sortOrder: sort.order
        },
        (res) => {
          if (res && res.data && res.data.data) {
            const { rows, count } = res.data.data;
            setAllLeave(rows);
            setLeaveCount(count);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, page, sort, filter, isDeleteDialogOpen, isViewLeaveDialogOpen, limit]);

  const handleClear = () => {
    setFilterData({
      search: '',
      status: '',
      month: '',
      year: '',
      user: userList.length > 0 ? userList[0] : ''
    });
    setFilter(!filter);
  };

  return (
    <>
      <Grid container spacing={2} mb={3}>
        {isAdmin ? (
          <>
            <Grid item xs={6} md={6} lg={4}>
              <LeaveCard
                title="Total Request"
                percentage={{
                  color: 'primary',
                  count: leaveCount && leaveCount.TotalLeaveRequest,
                  text: ' '
                }}
                icon={{ color: 'primary', component: <CalendarMonth /> }}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={4}>
              <LeaveCard
                title="Total Approved"
                percentage={{
                  color: 'success',
                  count: leaveCount && leaveCount.TotalLeaveApproved,
                  text: ' '
                }}
                icon={{ color: 'success', component: <TimeToLeaveRounded /> }}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={4}>
              <LeaveCard
                title="Total Declined"
                percentage={{
                  color: 'error',
                  count: leaveCount && leaveCount.TotalLeaveDeclined,
                  text: ' '
                }}
                icon={{ color: 'error', component: <Celebration /> }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6} md={6} lg={3}>
              <LeaveCard
                title="Total"
                percentage={{
                  color: 'primary',
                  count: leaveCount && leaveCount.totalLeave,
                  text: ' '
                }}
                icon={{ color: 'primary', component: <CalendarMonth /> }}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={3}>
              <LeaveCard
                title="Medical"
                percentage={{
                  color: 'success',
                  count: leaveCount && leaveCount.medicalLeave,
                  text: ' '
                }}
                icon={{ color: 'success', component: <Vaccines /> }}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={3}>
              <LeaveCard
                title="Other Leave"
                percentage={{
                  color: 'success',
                  count: leaveCount && leaveCount.otherLeave,
                  text: ' '
                }}
                icon={{ color: 'success', component: <Celebration /> }}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={3}>
              <LeaveCard
                title="Remaining"
                percentage={{
                  color: `${leaveCount && leaveCount.remainingLeave <= 0 ? 'warning' : 'success'}`,
                  count:
                    leaveCount && leaveCount.remainingLeave <= 0 ? 0 : leaveCount.remainingLeave,
                  text: ' '
                }}
                icon={{
                  color: `${leaveCount && leaveCount.remainingLeave <= 0 ? 'warning' : 'success'}`,
                  component: <DirectionsRun />
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
      {uiPermission.w && (
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
              APPLY
            </Button>
          </Grid>
        </Grid>
      )}

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
          handleClear={() => isValues && handleClear()}
          isDisable={leaveCount && leaveCount.TotalLeaveRequest <= 0}
          onClickSearch={() => isValues && setFilter(!filter)}
        >
          {isAdmin && (
            <Grid item sm={12} md={4} lg={3}>
              <Select
                label="Select User"
                size="small"
                options={userList}
                value={filterData.user}
                onChange={(value) => setFilterData({ ...filterData, user: value })}
                renderValue={filterData.user !== '' ? undefined : () => 'Select...'}
              />
            </Grid>
          )}

          <Grid item xs={12} md={4} lg={3}>
            <Select
              label="Select Month"
              size="small"
              options={Months}
              value={filterData.month}
              onChange={(value) => setFilterData({ ...filterData, month: value })}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Select
              label="Select Year"
              size="small"
              options={Years}
              value={filterData.year}
              onChange={(value) => setFilterData({ ...filterData, year: value })}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Select
              label="Select Status"
              size="small"
              value={filterData.status}
              options={actionStatus}
              onChange={(value) => setFilterData({ ...filterData, status: value })}
            />
          </Grid>
        </FilterLayout>

        <Table
          columns={isAdmin ? adminPrCol : prCols}
          rows={allLeave}
          badge={['status']}
          onClickAction={(value, { id }) => {
            GetLeaveById(id, (res) => {
              if (res && res.data && res.data.data) {
                const { data } = res.data;
                const setViewData = {
                  id: data.id,
                  leaveType: data.leaveType,
                  selectType: data.selectType,
                  fromDate: data.fromDate,
                  toDate: data.toDate,
                  noOfDays: data.noOfDays,
                  approvedBy: data.approvedBy,
                  reason: data.reason.replace(/(<([^>]+)>)/gi, ''),
                  ...(value === 'view' && { status: data.status }),
                  comment: data.comment
                };
                setSelectedData(setViewData);
                if (value === 'delete') {
                  setIsDeleteDialogOpen(true);
                } else if (value === 'edit') {
                  setIsEdit(true);
                  setIsDialogOpen(true);
                } else if (value === 'view') {
                  setIsViewLeaveDialogOpen(true);
                }
              }
            });
          }}
          isAction={!isAdmin}
          options={userPermissions}
          isView={isAdmin && isViewIconPermissions}
          rowsCount={leaveCount && leaveCount.total}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={isNaN(limit) ? leaveCount.total : limit}
          onRowsPerPageChange={(rowsPerPage) => setLimit(rowsPerPage)}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
        />
        {isDialogOpen && (
          <AddLeaveForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => {
              setIsDialogOpen(!isDialogOpen);
              setIsEdit(false);
              setSelectedData(null);
            }}
            title={isEdit ? 'UPDATE LEAVE' : 'NEW LEAVE'}
            selectedData={selectedData}
            isEdit={isEdit}
            GetLeaveAddUpdate={GetLeaveAddUpdate}
            Loading={Loading}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setSelectedData(null);
              setIsDeleteDialogOpen(false);
            }}
            dialogTitle={`Delete ${(
              selectedData && selectedData.leaveType.replace(/([A-Z])/g, ' $1').trim()
            ).slice(0, 35)}...`}
            dialogContent={<DialogContent content="Are you sure you want to delete this?" />}
            dialogAction={
              <DialogAction
                approveColor="error"
                rejectColor="info"
                approveTitle="Delete"
                rejectTitle="Cancel"
                handleApprove={() =>
                  GetLeaveDelete(selectedData.id, () => {
                    setIsDeleteDialogOpen(false);
                    setIsEdit(false);
                  })
                }
                handleReject={() => setIsDeleteDialogOpen(false)}
              />
            }
          />
        )}
      </Card>

      {isViewLeaveDialogOpen && selectedData && (
        <DialogMenu
          isOpen={isViewLeaveDialogOpen}
          onClose={() => {
            setIsViewLeaveDialogOpen(false);
            setSelectedData(null);
          }}
          dialogTitle={selectedData.leaveType}
          dialogContent={
            <DialogContent
              customContent={
                <LeaveDetails
                  data={selectedData}
                  isAdmin={isAdmin}
                  isAuthorised={isAuthorised}
                  approveRejectReason={(value) => setApproveRejectReason(value)}
                />
              }
            />
          }
          dialogAction={
            (isAdmin || isAuthorised) &&
            selectedData.status === 'pending' && (
              <DialogAction
                approveColor="success"
                rejectColor="error"
                approveTitle="Approve"
                rejectTitle="Reject"
                approveDisable={!approveRejectReason}
                rejectDisable={!approveRejectReason}
                handleApprove={() =>
                  GetLeaveReason(
                    {
                      data: {
                        status: 'approved',
                        comment: approveRejectReason
                      },
                      id: selectedData.id
                    },
                    () => setIsViewLeaveDialogOpen(false)
                  )
                }
                handleReject={() =>
                  GetLeaveReason(
                    {
                      data: {
                        status: 'reject',
                        comment: approveRejectReason
                      },
                      id: selectedData.id
                    },
                    () => setIsViewLeaveDialogOpen(false)
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

export default LeaveList;
