import React from 'react';
import { Grid } from '@mui/material';
import SideDrawer from 'Elements/SideDrawer';
import Box from 'Elements/Box';
import DefaultDoughnutChart from 'Elements/Charts/DoughnutCharts/DefaultDoughnutChart';
import { defaultDoughnutChartData } from 'StaticData/defaultDoughnutChartData';
import Typography from 'Elements/Typography';

const ViewDetailedReport = ({ isDialogOpen, handleDialog, dataReport }) => (
  <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="Detailed Reports">
    <Grid container justifyContent="space-between" columnSpacing={2}>
      <Grid item xs={12}>
        <DefaultDoughnutChart title="Referrals" chart={defaultDoughnutChartData} />
      </Grid>
      {dataReport && dataReport.screenShotUrl !== '' && (
        <Grid item xs={12} md={4}>
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
      <Grid item sm={12} md={5} lg={6} pt={2} pl={0}>
        <Typography variant="body2" textAlign="left" fontWeight="regular" color="dark">
          Date: {dataReport.date}
        </Typography>
        <Typography variant="body2" textAlign="left" fontWeight="regular" color="dark">
          Time: {dataReport.time}
        </Typography>
        <Typography variant="body2" textAlign="left" fontWeight="regular" color="dark">
          Score: {dataReport.score}
        </Typography>
        <Typography variant="body2" textAlign="left" fontWeight="regular" color="dark">
          Avg. Activity: {!dataReport.avgActivity ? 0 : dataReport.avgActivity}
        </Typography>
      </Grid>
    </Grid>
  </SideDrawer>
);

export default ViewDetailedReport;
