import React from 'react';
import { Grid } from '@mui/material';
import SideDrawer from 'Elements/SideDrawer';
import Button from 'Elements/Button';
import Box from 'Elements/Box';
import DefaultDoughnutChart from 'Elements/Charts/DoughnutCharts/DefaultDoughnutChart';
import { defaultDoughnutChartData } from 'StaticData/defaultDoughnutChartData';

const ViewDetailedReport = ({ isDialogOpen, handleDialog, dataReport }) => (
  <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="Detailed Reports">
    <Grid container justifyContent="space-between" columnSpacing={2}>
      <Grid item xs={12}>
        <DefaultDoughnutChart title="Referrals" chart={defaultDoughnutChartData} />
      </Grid>
      {dataReport && dataReport.screenShotUrl !== '' && (
        <Grid item xs={12} md={5} textAlign="center">
          <Box
            component="img"
            src={dataReport.screenShotUrl}
            alt="profile-image"
            height="150px"
            width="150px"
            sx={{ display: 'block', ml: 'auto', borderRadius: 2, paddingTop: '15px' }}
          />
        </Grid>
      )}
      <Grid item sm={12} md={4} lg={6} pt={14}>
        <Button
          type="submit"
          color="info"
          variant="contained"
          size="medium"
          onClick={handleDialog}
          sx={{ display: 'block', ml: 'auto' }}
        >
          OK
        </Button>
      </Grid>
    </Grid>
  </SideDrawer>
);

export default ViewDetailedReport;
