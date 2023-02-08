import React, { useContext, useEffect, useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import { Add, Check, ImportExportRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Button from 'Elements/Button';
import FilterLayout from 'Components/FilterLayout';
import Input from 'Elements/Input';
import Table from 'Elements/Tables/Table';
import { SnackbarContext } from 'Context/SnackbarProvider';
import AddCalendarEventDialog from './AddCalendarEvent';
import CalendarEventsData from './data/CalendarEvents';

export const NoticeBoard = () => {
  const { role } = useSelector((state) => state.route);
  const { columns: prCols, rows: prRows } = CalendarEventsData;
  const [rows, setRows] = useState(prRows);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { setSnack } = useContext(SnackbarContext);

  useEffect(() => {
    console.log('rows', rows);
  }, [rows]);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const onClickExport = () => {
    alert('Export coming soon...');
  };

  const onClickAction = (key, id) => {
    if (key === 'edit') {
      setSelectedData(prRows.find((o) => o.id === id));
      handleDialog();
    }
    if (key === 'delete') {
      rows.splice(
        rows.findIndex((a) => a.id === id),
        1
      );
      console.log('rows', rows);
      setRows(rows);
      setSnack({
        title: 'Success',
        message: `Selected event data deleted successfully.`,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
    }
  };

  const onSubmitEvent = (event) => {
    setRows([...rows, event]);
    setSnack({
      title: 'Success',
      message: `Event added successfully.`,
      time: false,
      icon: <Check color="white" />,
      color: 'success',
      open: true
    });
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {role === 'admin' ? (
          <>
            <Grid item xs="auto">
              <Button color="white" variant="outlined" size="small" onClick={handleDialog}>
                <Icon sx={{ mr: 1 }}>
                  <Add />
                </Icon>
                Add
              </Button>
            </Grid>
            <Grid item xs="auto">
              <Button color="white" variant="outlined" size="small" onClick={onClickExport}>
                <Icon sx={{ mr: 1 }}>
                  <ImportExportRounded />
                </Icon>
                Export
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout>
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
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
              errorFalse
            />
          </Grid>
        </FilterLayout>
        {rows !== null && (
          <Table
            isChecked
            columns={prCols}
            rows={rows}
            onClickAction={(value, id) => onClickAction(value, id)}
            isAction
            options={[
              { title: 'Edit', value: 'edit' },
              { title: 'Delete', value: 'delete' }
            ]}
          />
        )}

        <AddCalendarEventDialog
          isDialogOpen={isDialogOpen}
          handleDialog={() => handleDialog()}
          selectedData={selectedData}
          onSubmitEvent={(event) => onSubmitEvent(event)}
        />
      </Card>
    </>
  );
};

export default NoticeBoard;
