import React from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import Button from 'Elements/Button';
import { Add, ImportExportRounded } from '@mui/icons-material';
import leaveListData from './data/leaveListData';

const LeaveList = () => {
  const { columns: prCols, rows: prRows } = leaveListData;

  return (
    <Card
      mb={3}
      sx={{
        background: ({ palette: { grey } }) => grey[100],
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
        boxShadow: ({ boxShadows: { md } }) => md
      }}
    >
      <Grid container p={2} pb={2}>
        <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
          <Typography variant="h3">Leaves</Typography>
        </Grid>
        <Grid
          item
          xl={10}
          lg={2}
          md={10}
          sm={12}
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button color="info" variant="contained" size="small">
            <Icon sx={{ mr: '2px' }}>
              <Add />
            </Icon>
            Add
          </Button>
          &nbsp;
          <Button color="info" variant="contained" size="small">
            <Icon sx={{ mr: '2px' }}>
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid>
      </Grid>
      <Table columns={prCols} rows={prRows} />
    </Card>
  );
};

export default LeaveList;
