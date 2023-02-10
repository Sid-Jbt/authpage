import React, { useState } from 'react';
import { Card, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import { Add, ImportExportRounded, Pending, ThumbDown, ThumbUpAlt } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Priority, Status } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import supportTicketData from './data/SupportTicketData';
import AddSupportTicketForm from './AddSupportTicketForm';
import DeleteDialog from '../../Components/DeleteDialog';
import DialogMenu from '../../Elements/Dialog';
import SupportCard from '../../Components/CardLayouts/StaticCard';

const supportTicket = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = supportTicketData;
  const { role } = useSelector((state) => state.route);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  const handleChangePriority = (value) => {
    setPriority(value);
  };

  const onClickExport = () => {
    alert('Export coming soon...');
  };

  const onClickAction = (key, id) => {
    if (key === 'edit') {
      setIsEdit(true);
      handleDialog();
    } else {
      setSelectedId(id);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleChangeStartDate = (event) => {
    setSelectDate(event.target.value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event);
  };

  const handleClear = () => {
    setSelectDate('');
    setPriority('');
    setStatus('');
    setSearch('');
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = () => {
    handleDialogClose();
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <SupportCard
            title="Approved"
            count="5"
            icon={{ color: 'success', component: <ThumbUpAlt /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <SupportCard
            title="Declined"
            count="1"
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <SupportCard
            title="Pending"
            count="3"
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
            onClick={handleDialog}
          >
            <Icon sx={{ mr: 1 }}>
              <Add />
            </Icon>
            Add
          </Button>
        </Grid>
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
            onClick={onClickExport}
          >
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
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
          search={search}
          handleSearch={() => handleChangeSearch()}
          handleClear={() => handleClear()}
        >
          <Grid item xs={12} md={4} lg={3}>
            <Input
              type="date"
              label="Select Date"
              size="small"
              fullWidth
              id="date"
              name="Date"
              value={selectDate !== '' ? selectDate : ''}
              onChange={(value) => handleChangeStartDate(value)}
              errorFalse
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Priority</FormLabel>
              <Select
                value={priority}
                options={Priority}
                onChange={(value) => handleChangePriority(value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                value={status}
                options={Status}
                onChange={(value) => handleChangeStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={prRows}
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'Delete', value: 'delete' }
          ]}
        />

        <AddSupportTicketForm
          isDialogOpen={isDialogOpen}
          handleDialog={handleDialog}
          title={isEdit ? 'EDIT YOUR SUPPORT TICKET' : 'ADD NEW SUPPORT TICKET'}
          setIsEdit={(value) => setIsEdit(value)}
        />
      </Card>
      <DialogMenu
        isOpen={isDeleteDialogOpen}
        onClose={handleDialogClose}
        dialogTitle="Delete"
        dialogContent={
          <DeleteDialog
            handleDialogClose={handleDialogClose}
            selectedId={selectedId}
            deleteItem={onDelete}
          />
        }
      />
    </>
  );
};
export default supportTicket;
