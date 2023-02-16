import React, { useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { expenseFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormLabel, Grid } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import Dropzone from '../../Elements/Dropzone';

const initialValues = {
  itemName: '',
  itemTitle: '',
  purchaseFrom: '',
  purchaseDate: moment().format('DD/MM/YYYY'),
  amount: '',
  selectDoc: ''
};

const AddExpenseForm = ({ isDialogOpen, handleDialog, setSelectedData }) => {
  const [title, setTitle] = useState('');
  const [data, setData] = useState(initialValues);

  const onSubmit = (formData) => {
    console.log('formData', formData);
  };

  console.log('set data..', setData());
  return (
    <>
      <SideDrawer
        open={Boolean(isDialogOpen)}
        onClose={() => {
          setTitle('');
          setSelectedData(null);
          handleDialog();
        }}
        title={title}
      >
        <Formik
          enableReinitialize
          initialValues={data}
          onSubmit={(formData) => {
            onSubmit(formData);
          }}
          validationSchema={expenseFormSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12}>
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
                      errorText={errors.purchaseFrom && touched.purchaseFrom && errors.purchaseFrom}
                      error={errors.purchaseFrom && touched.purchaseFrom}
                      success={!errors.purchaseFrom && touched.purchaseFrom}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
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
                      errorText={errors.purchaseDate && touched.purchaseDate && errors.purchaseDate}
                      error={errors.purchaseDate && touched.purchaseDate}
                      success={!errors.purchaseDate && touched.purchaseDate}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
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
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel>SELECT DOCUMENT</FormLabel>
                    <Dropzone />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={6} xl={12}>
                    <Button type="submit" color="info" variant="contained" size="medium">
                      Add Expense
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
};

export default AddExpenseForm;
