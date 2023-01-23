import { Card, Grid, Icon } from '@mui/material';
import { Add, ClearRounded, ImportExportRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import Input from 'Elements/Input';
import { Formik } from 'formik';
import moment from 'moment';
import validationSchema from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import Dropzone from '../../Elements/Dropzone';

const Expense = () => {
  const { columns: prCols, rows: prRows } = expenseListData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const renderDialogContent = () => (
    <>
      <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD NEW EXPENSE">
        <Formik
          enableReinitialize
          initialValues={{
            itemName: '',
            itemTitle: '',
            purchaseFrom: '',
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
                <Grid container justifyContent="space-between">
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        placeholder="Item name"
                        label="ITEM NAME"
                        size="large"
                        fullWidth
                        id="itemName"
                        name="itemName"
                        value={values.itemName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.itemName && touched.itemName && errors.itemName}
                        error={errors.itemName && touched.itemName}
                        success={!errors.itemName && touched.itemName}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        placeholder="Item title"
                        label="ITEM TITLE"
                        size="large"
                        fullWidth
                        id="itemTitle"
                        name="itemTitle"
                        value={values.itemTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.itemTitle && touched.itemTitle && errors.itemTitle}
                        error={errors.itemTitle && touched.itemTitle}
                        success={!errors.itemTitle && touched.itemTitle}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        placeholder="Purchase from"
                        label="PURCHASE FROM"
                        size="large"
                        fullWidth
                        id="purchaseFrom"
                        name="purchaseFrom"
                        value={values.purchaseFrom}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={
                          errors.purchaseFrom && touched.purchaseFrom && errors.purchaseFrom
                        }
                        error={errors.purchaseFrom && touched.purchaseFrom}
                        success={!errors.purchaseFrom && touched.purchaseFrom}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        type="date"
                        placeholder="Purchase date"
                        label="PURCHASE DATE"
                        size="large"
                        fullWidth
                        id="purchaseDate"
                        name="purchaseDate"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={
                          errors.purchaseDate && touched.purchaseDate && errors.purchaseDate
                        }
                        error={errors.purchaseDate && touched.purchaseDate}
                        success={!errors.purchaseDate && touched.purchaseDate}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        placeholder="Amount"
                        label="AMOUNT"
                        size="large"
                        fullWidth
                        id="amount"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.amount && touched.amount && errors.amount}
                        error={errors.amount && touched.amount}
                        success={!errors.amount && touched.amount}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="MuiFormLabel-root MuiFormLabel-colorPrimary css-1yxgojd-MuiFormLabel-root">
                      SELECT DOCUMENT
                    </Box>
                    <Dropzone />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    mt={2}
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
                      <Icon sx={{ mr: '2px' }}>
                        <Add />
                      </Icon>
                      Add
                    </Button>
                    <Button
                      color="error"
                      sx={{ marginRight: '10px' }}
                      variant="contained"
                      size="small"
                      onClick={handleDialog}
                    >
                      <Icon sx={{ mr: '2px' }}>
                        <ClearRounded />
                      </Icon>
                      Clear
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
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout />
        <Table columns={prCols} rows={prRows} isChecked />
        {renderDialogContent()}
      </Card>
    </>
  );
};
export default Expense;
