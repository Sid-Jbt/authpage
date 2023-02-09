import React, { useState } from 'react';
import { Card, FormControl, FormLabel, Grid, Icon } from '@mui/material';
import { Add, ImportExportRounded } from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Priority, Status } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import supportTicketData from './data/SupportTicketData';
import AddSupportTicketForm from './AddSupportTicketForm';

const supportTicket = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = supportTicketData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const { role } = useSelector((state) => state.route);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleChangeStatus = (value) => {
    setStatus(value.value);
  };

  const handleChangePriority = (value) => {
    setPriority(value.value);
  };
  console.log('Status, Priority --> ', status, priority);

  const onClickExport = () => {
    alert('Export coming soon...');
  };

  const onClickAction = (key) => {
    if (key === 'edit') {
      setIsEdit(true);
      handleDialog();
    }
  };

  return (
    <>
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
        <FilterLayout>
          <Grid item xs={12} md={4} lg={3}>
            <Input
              type="date"
              label="Select Date"
              size="small"
              fullWidth
              id="date"
              name="Date"
              errorFalse
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Priority</FormLabel>
              <Select options={Priority} onChange={(value) => handleChangePriority(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select options={Status} onChange={(value) => handleChangeStatus(value)} />
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
    </>
  );
};
export default supportTicket;
