/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, Vaccines, CalendarMonth, Celebration } from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/StaticCard';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import { useOutletContext } from 'react-router';
import leaveListData from './data/leaveListData';
import AddLeaveForm from './AddLeaveForm';
import ViewLeaveDetails from './ViewLeaveDetails';
import withStateDispatch from '../../Helpers/withStateDispatch';

const LeaveList = ({
  GetLeaveAddUpdate,
  GetLeaveList,
  GetLeaveDelete,
  GetLeaveReason,
  GetLeaveById,
  Loading
}) => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = leaveListData;
  const { role } = useOutletContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState('');
  const [isViewLeaveDialogOpen, setIsViewLeaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState({ key: 'fromDate', order: 'asc' });
  const [filter, setFilter] = useState(false);
  const [allLeave, setAllLeave] = useState([]);
  const [leaveCount, setLeaveCount] = useState({});

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen) {
      GetLeaveList(
        {
          limit,
          startDate,
          endDate,
          search,
          page,
          sortKey: sort.key,
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
  }, [isDialogOpen, page, sort, filter, isDeleteDialogOpen]);

  const handleClear = () => {
    setEndDate('');
    setStartDate('');
    setSearch('');
    setFilter(false);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Total Leave"
            count={leaveCount.totalLeave}
            icon={{ color: 'info', component: <CalendarMonth /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Medical Leave"
            count={leaveCount.medicalLeave}
            icon={{ color: 'warning', component: <Vaccines /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Other Leave"
            count={leaveCount.otherLeave}
            icon={{ color: 'primary', component: <Celebration /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Remaining Leave"
            count={leaveCount.remainingLeave}
            icon={{ color: 'success', component: <DirectionsRun /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>
      {role !== 'admin' && (
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
          search={search}
          handleSearch={(e) => setSearch(e.target.value.trim())}
          handleClear={handleClear}
          onClickSearch={() => {
            setFilter(!filter);
          }}
        >
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
              value={startDate !== '' ? startDate : ''}
              onChange={(e) => setStartDate(e.target.value)}
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
              value={endDate !== '' ? endDate : ''}
              onChange={(e) => setEndDate(e.target.value)}
              errorFalse
            />
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allLeave}
          onClickAction={(value, { id }) => {
            if (value === 'delete') {
              setSelectedData(id);
              setIsDeleteDialogOpen(true);
            } else {
              GetLeaveById({ id }, (res) => {
                if (res && res.data && res.data.data) {
                  const { data } = res.data;
                  const setViewData = {
                    leaveType: data.leaveType,
                    selectType: data.selectType,
                    fromDate: data.fromDate,
                    toDate: data.toDate,
                    noOfDays: data.noOfDays,
                    approvedBy: data.approvedBy,
                    status: data.status,
                    reason: data.reason.replace(/(<([^>]+)>)/gi, ''),
                    id: data.id
                  };
                  if (value === 'edit') {
                    setIsEdit(true);
                    setIsDialogOpen(true);
                  } else if (value === 'view') {
                    setSelectedData(setViewData);
                    setIsViewLeaveDialogOpen(true);
                  }
                }
              });
            }
          }}
          isAction
          options={
            role === 'admin'
              ? [{ title: 'View', value: 'view' }]
              : [
                  { title: 'Edit', value: 'edit' },
                  { title: 'Delete', value: 'delete' }
                ]
          }
          rowsCount={leaveCount.total}
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
          <AddLeaveForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => setIsDialogOpen(!isDialogOpen)}
            title={isEdit ? 'UPDATE LEAVE' : 'ADD LEAVE'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedData={selectedData}
            isEdit={isEdit}
            GetLeaveAddUpdate={GetLeaveAddUpdate}
            GetLeaveById={GetLeaveById}
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
                approveColor="error"
                rejectColor="info"
                approveTitle="Delete"
                rejectTitle="Cancel"
                handleApprove={() =>
                  GetLeaveDelete(selectedData, () => setIsDeleteDialogOpen(false))
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
          onClose={() => setIsViewLeaveDialogOpen(false)}
          dialogTitle={`Leave Details: ${selectedData.leaveType}`}
          dialogContent={
            <DialogContent customContent={<ViewLeaveDetails data={selectedData} role={role} />} />
          }
          dialogAction={
            role === 'admin' && (
              <DialogAction
                approveColor="success"
                rejectColor="error"
                approveTitle="Approve"
                rejectTitle="Reject"
                handleApprove={() =>
                  GetLeaveReason(
                    {
                      data: {
                        status: 'approved',
                        comment: ''
                      },
                      id: selectedData
                    },
                    () => setIsViewLeaveDialogOpen(false)
                  )
                }
                handleReject={() =>
                  GetLeaveReason(
                    {
                      data: {
                        status: 'reject',
                        comment: ''
                      },
                      id: selectedData
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

export default withStateDispatch(LeaveList);
