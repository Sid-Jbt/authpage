import React, { useContext, useState } from 'react';
import { Card, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import {
  Add,
  Check,
  ImportExportRounded,
  Pending,
  SummarizeRounded,
  ThumbDown,
  ThumbUp
} from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Priority, SupportTicketStatus } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import supportTicketData from './data/SupportTicketData';
import AddSupportTicketForm from './AddSupportTicketForm';
import TicketCard from '../../Components/CardLayouts/StaticCard';
import DeleteDialog from '../../Components/DeleteDialog';
import DialogMenu from '../../Elements/Dialog';
import ViewSupportTicketDetails from './ViewSupportTicketDetails';
import { SnackbarContext } from '../../Context/SnackbarProvider';

const supportTicket = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = supportTicketData;
  const { setSnack } = useContext(SnackbarContext);
  const { role } = useSelector((state) => state.route);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectDate, setSelectDate] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSupportTicketDialogOpen, setIsSupportTicketDialogOpen] = useState(false);
  const [isViewSupportTicketDialogOpen, setIsViewSupportTicketDialogOpen] = useState(false);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleOpenDialog = () => {
    setIsSupportTicketDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsSupportTicketDialogOpen(false);
  };

  const handleCloseViewDialog = () => {
    setIsViewSupportTicketDialogOpen(false);
  };

  const onClickView = (row) => {
    setSelectedData(row);
    handleOpenDialog();
  };

  const onClickAction = (key, index) => {
    if (key === 'edit') {
      setIsEdit(true);
      setSelectedData(prRows.find((o) => o.id === index));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      setSelectedData(prRows.find((o) => o.id === index));
      setIsViewSupportTicketDialogOpen(true);
    } else {
      setSelectedId(index);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = () => {
    handleDialogClose();
  };

  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  const handleChangePriority = (value) => {
    setPriority(value);
  };

  const onClickExport = () => {
    setSnack({
      title: 'Warning',
      message: 'Export coming soon...',
      time: false,
      icon: <Check color="white" />,
      color: 'warning',
      open: true
    });
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

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Total Tickets"
            count="9"
            icon={{ color: 'success', component: <SummarizeRounded /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Approved"
            count="5"
            icon={{ color: 'success', component: <ThumbUp /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Declined"
            count="1"
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TicketCard
            title="Pending"
            count="3"
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
                options={SupportTicketStatus}
                onChange={(value) => handleChangeStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={prRows}
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction={role !== 'admin'}
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'View', value: 'view' },
            { title: 'Delete', value: 'delete' }
          ]}
          isView={role === 'admin'}
          isDialogAction={(row) => onClickView(row)}
        />
        {isDialogOpen && (
          <AddSupportTicketForm
            isDialogOpen={isDialogOpen}
            handleDialog={handleDialog}
            title={isEdit ? 'EDIT YOUR SUPPORT TICKET' : 'ADD NEW SUPPORT TICKET'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedData={selectedData}
            setSelectedData={(value) => setSelectedData(value)}
          />
        )}
        {isDeleteDialogOpen && (
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
        )}
      </Card>
      {(isSupportTicketDialogOpen || isViewSupportTicketDialogOpen) && selectedData && (
        <DialogMenu
          isOpen={isSupportTicketDialogOpen || isViewSupportTicketDialogOpen}
          onClose={isSupportTicketDialogOpen ? handleCloseDialog : handleCloseViewDialog}
          dialogTitle={`Expense Details: ${selectedData.subject}`}
          dialogContent={<ViewSupportTicketDetails info={selectedData} />}
          dialogAction={
            role === 'admin' && (
              <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <Button
                    type="submit"
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={handleCloseDialog}
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={handleCloseDialog}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            )
          }
        />
      )}
    </>
  );
};
export default supportTicket;
