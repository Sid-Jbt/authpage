import React, { useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import FilterLayout from 'Components/FilterLayout';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import { useOutletContext } from 'react-router';
import { holidayListData } from 'StaticData/holidayListData';
import HolidayForm from './HolidayForm';
import { userIsViewIconPermissions } from '../../Helpers/Global';

const Holiday = () => {
  const { columns: prCols } = holidayListData;
  const {
    GetHolidayList,
    GetHolidayAddUpdate,
    GetHolidayById,
    GetHolidayDelete,
    Loading,
    permission
  } = useOutletContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [allHolidayList, setAllHolidayList] = useState([]);
  const [holidayListCount, setHolidayListCount] = useState(0);
  const [sort, setSort] = useState({ key: 'holidayDate', order: 'asc' });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState(false);
  const [filterData, setFilterData] = useState({
    search: ''
  });

  const writePermission = permission && permission.holiday.w === 1 ? 1 : 0;

  const isViewIconPermissions = userIsViewIconPermissions(
    permission !== null && permission.hasOwnProperty('holiday') && permission.holiday,
    [2, 4]
  );

  useEffect(() => {
    if (!isDialogOpen || !isDrawerOpen) {
      GetHolidayList(
        {
          limit: isNaN(limit) ? 0 : limit,
          search: filterData.search,
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
  }, [isDialogOpen, isDrawerOpen, filter, page, sort, limit]);

  const handleDrawer = () => {
    setSelectedData(null);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setIsEdit(false);
  };

  const handleClear = () => {
    setFilterData({
      search: ''
    });
    setFilter(!filter);
  };

  return (
    <>
      {writePermission && (
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
          <Grid item xs={12} md="auto">
            <Button color="white" variant="outlined" size="small" onClick={handleDrawer}>
              <Icon sx={{ mr: 1 }}>
                <Add />
              </Icon>
              Add
            </Button>
          </Grid>
          {/*  <Grid item xs={12} md="auto">
            <Button color="white" variant="outlined" size="small" disabled>
              <Icon sx={{ mr: 1 }}>
                <ImportExportRounded />
              </Icon>
              Import
            </Button>
          </Grid> */}
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
          search={filterData.search}
          handleSearch={(e) => setFilterData({ ...filterData, search: e.target.value })}
          handleClear={handleClear}
          isDisable={!Object.values(filterData).some((x) => x !== '') && allHolidayList.length <= 0}
          onClickSearch={() => {
            const isValues = !Object.values(filterData).some((x) => x !== '');
            if (!isValues) {
              setFilter(!filter);
            }
          }}
        />

        <Table
          columns={prCols}
          rows={allHolidayList}
          onClickAction={(value, { id }) => {
            GetHolidayById(id, (res) => {
              if (res && res.data && res.data.data) {
                const { data } = res.data;
                const setViewData = {
                  title: data.title,
                  holidayDate: data.holidayDate,
                  id: data.id
                };
                setSelectedData(setViewData);
                if (value === 'delete') {
                  setIsEdit(true);
                  setIsDialogOpen(true);
                } else if (value === 'edit') {
                  setIsEdit(true);
                  setIsDrawerOpen(true);
                }
              }
            });
          }}
          isView={isViewIconPermissions.length > 0 && isViewIconPermissions}
          rowsCount={holidayListCount}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
        />
        <DialogMenu
          isOpen={isDialogOpen}
          onClose={() => {
            setSelectedData(null);
            setIsDialogOpen(false);
          }}
          dialogTitle={isEdit ? `Delete ${selectedData && selectedData.title}` : 'Import Files'}
          dialogContent={<DialogContent content="Are you sure you want to delete this?" />}
          dialogAction={
            isEdit && (
              <DialogAction
                rejectTitle="Cancel"
                approveTitle="Delete"
                handleReject={() => setIsDialogOpen(false)}
                handleApprove={() =>
                  GetHolidayDelete(selectedData.id, () => {
                    setIsDialogOpen(false);
                    setIsEdit(false);
                  })
                }
              />
            )
          }
        />
        <HolidayForm
          isDrawerOpen={Boolean(isDrawerOpen)}
          handleDrawerClose={() => handleDrawerClose()}
          title={isEdit ? 'UPDATE HOLIDAY' : 'NEW HOLIDAY'}
          selectedData={selectedData}
          GetHolidayAddUpdate={GetHolidayAddUpdate}
          isEdit={isEdit}
          Loading={Loading}
        />
      </Card>
    </>
  );
};
export default Holiday;
