import React, { useState } from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Typography from 'Elements/Typography';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, Vaccines, CalendarMonth, Celebration } from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/LeaveCard';
import {
  Add,
  DirectionsRun,
  Vaccines,
  CalendarMonth,
  Celebration,
  Save
} from '@mui/icons-material';
import DetailedStatisticsCard from 'Components/CardLayout';
import leaveListData from './data/leaveListData';
import SideDrawer from '../../Elements/SideDrawer';
import { Formik } from 'formik';
import moment from 'moment';
import validationSchema from '../../Helpers/ValidationSchema';
import Box from '../../Elements/Box';
import Input from '../../Elements/Input';

const LeaveList = () => {
  const { columns: prCols, rows: prRows } = leaveListData;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const renderDialogContent = () => (
    <>
      <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD NEW LEAVE">
        <Formik
          enableReinitialize
          initialValues={{
            itemName: '',
            itemTitle: '',
            purchaseFrom: moment().format('DD/MM/YYYY'),
            purchaseDate: moment().format('DD/MM/YYYY'),
            amount: '',
            selectDoc: ''
          }}
          onSubmit={(values) => {
            console.log('ON SUBMIT');
            console.log('values===========', values);
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="eg. JBT0001"
                        size="large"
                        fullWidth
                        id="empCode"
                        name="empCode"
                        label="Employee Code"
                        value={values.empCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.empCode && touched.empCode && errors.empCode}
                        error={errors.empCode && touched.empCode}
                        success={!errors.empCode && touched.empCode}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="Alen"
                        size="large"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.firstName && touched.firstName && errors.firstName}
                        error={errors.firstName && touched.firstName}
                        success={!errors.firstName && touched.firstName}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="Prior"
                        size="large"
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.lastName && touched.lastName && errors.lastName}
                        error={errors.lastName && touched.lastName}
                        success={!errors.lastName && touched.lastName}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        type="email"
                        placeholder="eg. alen@abc.com"
                        size="large"
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.email && touched.email && errors.email}
                        error={errors.email && touched.email}
                        success={!errors.email && touched.email}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="date"
                        placeholder="Date Of Join"
                        size="large"
                        fullWidth
                        id="dateOfJoin"
                        name="dateOfJoin"
                        label="Date Of Join"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.dateOfJoin && touched.dateOfJoin && errors.dateOfJoin}
                        error={errors.dateOfJoin && touched.dateOfJoin}
                        success={!errors.dateOfJoin && touched.dateOfJoin}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="date"
                        placeholder="Date Of Leave"
                        size="large"
                        fullWidth
                        id="dateOfLeave"
                        name="dateOfLeave"
                        label="Date Of Leave"
                        success={!errors.dateOfLeave && touched.dateOfLeave}
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={4} lg={6}>
                    <Button
                      type="submit"
                      color="info"
                      variant="contained"
                      size="small"
                      sx={{ marginRight: '10px' }}
                    >
                      <Icon sx={{ mr: '2px' }}>
                        <Save />
                      </Icon>
                      Save
                    </Button>
                    <Button
                      type="submit"
                      color="info"
                      variant="contained"
                      size="small"
                      sx={{ marginRight: '10px' }}
                    >
                      <Icon sx={{ mr: '2px' }}>
                        <Save />
                      </Icon>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </SideDrawer>
    </>
  );

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Total Leave"
            count="12"
            icon={{ color: 'info', component: <CalendarMonth /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Medical Leave"
            count="3"
            icon={{ color: 'warning', component: <Vaccines /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Other Leave"
            count="4"
            icon={{ color: 'primary', component: <Celebration /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Remaining Leave"
            count="5"
            icon={{ color: 'success', component: <DirectionsRun /> }}
            isPercentage={false}
          />
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
        <Grid container alignItems="center" spacing={2} p={2} pb={2}>
          <Grid container item sm={12} alignItems="center" justifyContent="space-between">
            <Grid item xs={6}>
              <Typography variant="h3">Leaves</Typography>
            </Grid>
            <Grid container item xs={6} justifyContent="end" sx={{ gap: 2 }}>
              <Button color="info" variant="contained" size="small">
                <Icon sx={{ mr: 1 }}>
                  <Add />
                </Icon>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Table columns={prCols} rows={prRows} />
        {renderDialogContent()}
      </Card>
    </>
  );
};

export default LeaveList;
