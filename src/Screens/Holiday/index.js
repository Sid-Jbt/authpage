import React, { useContext, useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add, ImportExportRounded } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import FilterLayout from 'Components/FilterLayout';
import DeleteDialog from 'Components/DeleteDialog';
import { getHolidayList, deleteHoliday } from 'APIs/Holiday';
import { SnackbarContext } from 'Context/SnackbarProvider';
import DialogMenu from 'Elements/Dialog';
import holidayListData from './data/holidayListData';
import ManageHolidayForm from './ManageHolidayForm';
import ImportDialog from './ImportDialog';

const Holiday = () => {
  const { columns: prCols } = holidayListData;
  const { role } = useSelector((state) => state.route);
  const { setSnack } = useContext(SnackbarContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState('');

  const [allHolidayList, setAllHolidayList] = useState([]);
  const [holidayListCount, setHolidayListCount] = useState(0);
  const [sortKey, setSortKey] = useState('holidayDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loader, setLoader] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const getAllHolidayList = async (
    selectedSortKey = 'holidayDate',
    selectedSortOrder = 'asc',
    selectedPage = 0,
    text = '',
    count = 0,
    dataLimit = limit
  ) => {
    const holidayData = {
      limit: dataLimit,
      page: selectedPage,
      sortKey: selectedSortKey.toLowerCase(),
      sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      count
    };
    const holidayListRes = await getHolidayList(holidayData);
    const {
      status,
      data: { rows },
      message
    } = holidayListRes;
    if (status) {
      setAllHolidayList(rows);
      setHolidayListCount(holidayListRes.data.count);
      setLoader(false);
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
    getAllHolidayList();
  }, [isDrawerOpen, isDialogOpen]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleDrawer = () => {
    setSelectedData(null);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setIsEdit(false);
  };

  const handleDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsEdit(false);
  };

  const onClickAction = (value, index) => {
    if (value === 'edit') {
      setIsEdit(true);
      setSelectedData(allHolidayList.find((o) => o.id === index.id));
      setIsDrawerOpen(true);
    } else if (value === 'delete') {
      setSelectedId(index);
      setIsEdit(value === 'delete');
      handleDialog();
    } else {
      setIsEdit(false);
      handleDialog();
    }
    setSelectedId(index);
  };

  const onDelete = async () => {
    await deleteHoliday(selectedId);
    handleDialogClose();
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleClear = () => {
    setSearch('');
    getAllHolidayList(sortKey, sortOrder, page, '');
  };

  const onClickSearch = () => {
    setLoader(true);
    setIsSearch(true);
    getAllHolidayList(sortKey, sortOrder, page, search, 0);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
    await getAllHolidayList(sortKey, sortOrder, selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setPage(0);
    setLimit(selectedLimit);
    await getAllHolidayList(sortKey, sortOrder, '', '', '', selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
    await getAllHolidayList(selectedSortKey, selectedSortOrder, page);
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
            <Button color="white" variant="outlined" size="small" onClick={handleDialog}>
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
          handleSearch={handleChangeSearch}
          handleClear={() => handleClear()}
          onClickSearch={() => onClickSearch()}
          loader={loader}
          isSearch={isSearch}
        />

        <Table
          columns={prCols}
          rows={allHolidayList}
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction={role === 'admin'}
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'Delete', value: 'delete' }
          ]}
          rowsCount={holidayListCount}
          initialPage={page}
          onChangePage={(value) => onPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => onRowsPerPageChange(rowsPerPage)}
          sortKey={sortKey}
          sortOrder={sortOrder}
          handleRequestSort={(event, orderName, orderKey) => onSort(event, orderName, orderKey)}
        />

        <DialogMenu
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          dialogTitle={isEdit ? 'Delete' : 'Import Files'}
          dialogContent={
            isEdit ? (
              <DeleteDialog
                handleDialogClose={handleDialogClose}
                selectedId={selectedId}
                deleteItem={onDelete}
                message="Are you sure want to delete this?"
                buttonTitle="Delete"
              />
            ) : (
              <ImportDialog
                isHover={isHover}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleDialogClose={handleDialogClose}
              />
            )
          }
        />
        <ManageHolidayForm
          isDrawerOpen={Boolean(isDrawerOpen)}
          handleDrawerClose={handleDrawerClose}
          title={isEdit ? 'EDIT HOLIDAY' : 'ADD HOLIDAY'}
          setIsEdit={(value) => setIsEdit(value)}
          selectedData={selectedData}
          setSelectedData={(value) => setSelectedData(value)}
          isEdit={isEdit}
        />
      </Card>
    </>
  );
};
export default Holiday;
