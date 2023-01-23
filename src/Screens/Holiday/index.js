import { Card, Grid, Icon } from '@mui/material';
import { Add, ImportExportRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import { Formik } from 'formik';
import moment from 'moment';
import validationSchema from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import holidayListData from './data/holidayListData';
import FilterLayout from '../../Components/FilterLayout';

const Holiday = () => {
  const { columns: prCols, rows: prRows } = holidayListData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const renderDialogContent = () => (
    <>
      <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD HOLIDAY">
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
                    value={values.itemName}
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
                    value={values.itemTitle}
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
                    onClick={handleDialog}
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
          <Button color="white" variant="outlined" size="small" onClick={handleDialog}>
            <Icon sx={{ mr: 1 }}>
              <Add />
            </Icon>
            Add
          </Button>
        </Grid>
        <Grid item xs={12} md="auto">
          <Button color="white" variant="outlined" size="small">
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
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
        {renderDialogContent()}
      </Card>
    </>
  );
};
export default Holiday;
