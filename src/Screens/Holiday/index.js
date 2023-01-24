import { Card, Grid, Icon } from '@mui/material';
import { Add, ImportContacts } from '@mui/icons-material';
import React, { useState } from 'react';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';
import Table from 'Elements/Tables/Table';
import holidayListData from './data/holidayListData';
import FilterLayout from '../../Components/FilterLayout';
import DialogMenu from '../../Elements/Dialog';
import Dropzone from '../../Elements/Dropzone';
import ManageHolidayForm from './ManageHolidayForm';

const Holiday = () => {
  const { columns: prCols, rows: prRows } = holidayListData;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
  };

  const onOpenEdit = (value, id) => {
    handleDrawer();
    console.log('id', id);
    setIsEdit(value === 'edit');
  };

  const renderDialogContent = () => (
    <>
      <Box sx={{ height: '100%', p: 1 }}>
        <Grid container direction="row" alignItems="center">
          <Typography variant="h5" noWrap to="/" color="textPrimary" mr={30}>
            Download CVS file from{' '}
            <a
              href="/files/CV.csv"
              target="_blank"
              style={{ color: isHover ? 'red' : 'skyblue' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              download
            >
              here
            </a>
          </Typography>
        </Grid>
        <Grid mt={2}>
          <Typography variant="button" fontWeight="bold" textTransform="capitalize">
            Upload Updated CSV:
          </Typography>
          <Dropzone />
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            mt: 3
          }}
        >
          <Button type="submit" color="info" variant="contained" size="large">
            Upload
          </Button>
        </Box>
      </Box>
    </>
  );

  return (
    <>
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
              <ImportContacts />
            </Icon>
            Import
          </Button>
        </Grid>
      </Grid>
      <Card
        mb={3}
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout />
        <Table
          columns={prCols}
          rows={prRows}
          onClickAction={(value, id) => onOpenEdit(value, id)}
          isAction
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'Delete', value: 'delete' }
          ]}
        />
        <DialogMenu
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          dialogTitle="Import Files"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          dialogContent={renderDialogContent()}
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
