import React, { useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add, ImportExportRounded } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import FilterLayout from 'Components/FilterLayout';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import { useOutletContext } from 'react-router';
import holidayListData from './data/holidayListData';
import ManageHolidayForm from './ManageHolidayForm';

const Holiday = () => {
  const { columns: prCols } = holidayListData;
  const {
    role,
    GetHolidayList,
    GetHolidayAdd,
    GetHolidayUpdate,
    GetHolidayById,
    GetHolidayDelete
  } = useOutletContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [search, setSearch] = useState('');
  const [allHolidayList, setAllHolidayList] = useState([]);
  const [holidayListCount, setHolidayListCount] = useState(0);
  const [sort, setSort] = useState({ key: 'title', order: 'asc' });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (!isDialogOpen || !isDrawerOpen) {
      GetHolidayList(
        {
          limit,
          search,
          page,
          sortKey: sort.key,
          sortOrder: sort.order
        },
        (res) => {
          if (res && res.data && res.data.data) {
            const { rows, count } = res.data.data;
            setAllHolidayList(rows);
            setHolidayListCount(count);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, isDrawerOpen, filter, page, sort]);

  const handleDrawer = () => {
    setSelectedData(null);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setIsEdit(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsEdit(false);
  };

  const onClickAction = (value, data) => {
    setSelectedData(data.id);
    if (value === 'edit') {
      setIsEdit(true);
      setIsDrawerOpen(true);
    } else if (value === 'delete') {
      setIsEdit(value === 'delete');
      setIsDialogOpen(true);
    } else {
      setIsEdit(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      {role === 'admin' && (
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
          <Grid item xs={12} md="auto">
            <Button color="white" variant="outlined" size="small" onClick={handleDrawer}>
              <Icon sx={{ mr: 1 }}>
                <Add />
              </Icon>
              Add
            </Button>
          </Grid>
          <Grid item xs={12} md="auto">
            <Button
              color="white"
              variant="outlined"
              size="small"
              onClick={() => setIsDialogOpen(true)}
            >
              <Icon sx={{ mr: 1 }}>
                <ImportExportRounded />
              </Icon>
              Import
            </Button>
          </Grid>
        </Grid>
      )}

      <Card
        mb={3}
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={(e) => setSearch(e.target.value.trim())}
          handleClear={() => setSearch('')}
          onClickSearch={() => {
            setFilter(!filter);
          }}
        />

        <Table
          columns={prCols}
          rows={allHolidayList}
          onClickAction={(value, data) => onClickAction(value, data)}
          isAction={role === 'admin'}
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'Delete', value: 'delete' }
          ]}
          rowsCount={holidayListCount}
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
        <DialogMenu
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          dialogTitle={isEdit ? 'Delete' : 'Import Files'}
          dialogContent={<DialogContent content="Are you sure you want to delete this ?" />}
          dialogAction={
            isEdit && (
              <DialogAction
                rejectTitle="Cancel"
                approveTitle="Delete"
                handleReject={handleDialogClose}
                handleApprove={() => GetHolidayDelete(selectedData, () => handleDialogClose())}
              />
            )
          }
        />
        <ManageHolidayForm
          isDrawerOpen={Boolean(isDrawerOpen)}
          handleDrawerClose={() => handleDrawerClose()}
          title={isEdit ? 'UPDATE HOLIDAY' : 'ADD HOLIDAY'}
          setIsEdit={(value) => setIsEdit(value)}
          selectedData={selectedData}
          setSelectedData={(value) => setSelectedData(value)}
          isEdit={isEdit}
          GetHolidayAdd={GetHolidayAdd}
          GetHolidayUpdate={GetHolidayUpdate}
          GetHolidayById={GetHolidayById}
        />
      </Card>
    </>
  );
};
export default Holiday;
