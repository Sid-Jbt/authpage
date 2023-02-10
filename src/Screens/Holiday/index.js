import { Card, Grid, Icon } from '@mui/material';
import { Add, ImportExportRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import holidayListData from './data/holidayListData';
import FilterLayout from '../../Components/FilterLayout';
import DialogMenu from '../../Elements/Dialog';
import ManageHolidayForm from './ManageHolidayForm';
import DeleteDialog from '../../Components/DeleteDialog';
import ImportDialog from './ImportDialog';

const Holiday = () => {
  const { columns: prCols, rows: prRows } = holidayListData;
  const { role } = useSelector((state) => state.route);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleDrawer = () => {
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

  const onOpenEdit = (value, id) => {
    if (value === 'edit') {
      setIsEdit(value === 'edit');
      handleDrawer();
    } else if (value === 'delete') {
      setIsEdit(value === 'delete');
      handleDialog();
    } else {
      setIsEdit(false);
      handleDialog();
    }
    setSelectedId(id);
  };

  const onDelete = () => {
    handleDialogClose();
  };

  const handleChangeSearch = (event) => {
    setSearch(event);
  };

  const handleClear = () => {
    setSearch('');
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
          handleSearch={() => handleChangeSearch()}
          handleClear={() => handleClear()}
        />

        <Table
          columns={prCols}
          rows={prRows}
          onClickAction={(value, id) => onOpenEdit(value, id)}
          isAction={role === 'admin'}
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'Delete', value: 'delete' }
          ]}
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
              />
            ) : (
              <ImportDialog
                isHover={isHover}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            )
          }
        />
        <ManageHolidayForm
          isDrawerOpen={Boolean(isDrawerOpen)}
          handleDrawerClose={handleDrawerClose}
          title={isEdit ? 'EDIT HOLIDAY' : 'ADD HOLIDAY'}
        />
      </Card>
    </>
  );
};
export default Holiday;
