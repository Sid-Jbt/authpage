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
import Badge from '../../Elements/Badge';

export const NoticeBoard = () => {
  const { role } = useSelector((state) => state.route);
  const { columns: prCols, rows: prRows } = CalendarEventsData;
  const [rows, setRows] = useState(prRows);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { setSnack } = useContext(SnackbarContext);

  useEffect(() => {
    (async () => {
      const items = await JSON.parse(localStorage.getItem('noticeBoardEvent'));
      const newRows = items.map((item) => {
        const o = { ...item };
        o.eventType = (
          <Badge
            variant="gradient"
            badgeContent={item.eventName}
            color={item.eventName}
            size="xs"
            container
            customWidth={100}
          />
        );
        return o;
      });
      setRows(newRows);
    })();
  }, []);

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
    if (selectedData === null) {
      delete event.eventType;
      const data = [...rows, event];
      setRows(data);
      localStorage.setItem('noticeBoardEvent', JSON.stringify(data));
      setSnack({
        title: 'Success',
        message: `Event added successfully.`,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
    } else {
      const newRows = [...rows];
      const selectedID = newRows.findIndex((a) => a.id === selectedData.id);
      newRows[selectedID].eventName = event.eventName;
      newRows[selectedID].title = event.title;
      newRows[selectedID].start = event.start;
      newRows[selectedID].end = event.end;
      newRows[selectedID].eventType = (
        <Badge
          variant="gradient"
          badgeContent={event.eventName}
          color={event.eventName}
          size="xs"
          container
          customWidth={100}
        />
      );
      setRows(newRows);
      setSnack({
        title: 'Success',
        message: `Event updated successfully.`,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
    }
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

        {isDialogOpen && (
          <AddCalendarEventDialog
            isDialogOpen={isDialogOpen}
            handleDialog={() => handleDialog()}
            selectedData={selectedData}
            onSubmitEvent={(event) => onSubmitEvent(event)}
            setSelectedData={(value) => setSelectedData(value)}
          />
        )}
      </Card>
    </>
  );
};

export default NoticeBoard;
