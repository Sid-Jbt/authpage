import { Card, Grid, Icon } from '@mui/material';
import { Add, ImportContacts } from '@mui/icons-material';
import React, { useState } from 'react';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import { Formik } from 'formik';
import moment from 'moment';
import validationSchema from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import Typography from 'Elements/Typography';
import holidayListData from './data/holidayListData';
import FilterLayout from '../../Components/FilterLayout';
import DialogMenu from '../../Elements/Dialog';
import Dropzone from '../../Elements/Dropzone';

const Holiday = () => {
  const { columns: prCols, rows: prRows } = holidayListData;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

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
  };

  const handleDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const renderDialogContent = () => (
    <>
      <Box sx={{ height: '100%', p: 1 }}>
        <Grid container direction="row" alignItems="center">
          {/* <Typography variant="button" fontWeight="bold" textTransform="capitalize" mr={30}>
            Download CVS file from <a href="/">here</a>
          </Typography> */}
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

  const renderDrawerContent = () => (
    <>
      <SideDrawer open={Boolean(isDrawerOpen)} onClose={handleDrawerClose} title="ADD HOLIDAY">
        <Formik
          enableReinitialize
          initialValues={{
            holidayName: '',
            holidayDate: moment().format('DD/MM/YYYY')
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
                <Box mb={0.5}>
                  <Input
                    placeholder="Holiday name"
                    label="HOLIDAY NAME"
                    size="large"
                    fullWidth
                    id="holidayName"
                    name="holidayName"
                    value={values.holidayName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.holidayName && touched.holidayName && errors.holidayName}
                    error={errors.holidayName && touched.holidayName}
                    success={!errors.holidayName && touched.holidayName}
                  />
                </Box>
                <Box mb={0.5}>
                  <Input
                    type="date"
                    placeholder="Holiday Date"
                    label="HOLIDAY DATE"
                    size="large"
                    fullWidth
                    id="holidayDate"
                    name="holidayDate"
                    value={values.holidayDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.holidayDate && touched.holidayDate && errors.holidayDate}
                    error={errors.holidayDate && touched.holidayDate}
                    success={!errors.holidayDate && touched.holidayDate}
                  />
                </Box>
                <Grid
                  item
                  sm={12}
                  md={4}
                  lg={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Button
                    type="submit"
                    color="info"
                    variant="contained"
                    size="small"
                    sx={{ marginRight: '10px' }}
                  >
                    Submit
                  </Button>
                  <Button
                    color="error"
                    sx={{ marginRight: '10px' }}
                    variant="contained"
                    size="small"
                    onClick={handleDrawerClose}
                  >
                    Clear
                  </Button>
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
        <Table columns={prCols} rows={prRows} />
        {renderDrawerContent()}
        <DialogMenu
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          dialogTitle="Import Files"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          dialogContent={renderDialogContent()}
        />
      </Card>
    </>
  );
};
export default Holiday;
