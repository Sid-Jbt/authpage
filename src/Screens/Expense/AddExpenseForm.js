import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { expenseFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormLabel, Grid, CircularProgress } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import Dropzone from '../../Elements/Dropzone';

const initialValues = {
  itemName: '',
  purchaseFrom: '',
  purchaseDate: moment().format('YYYY-MM-DD'),
  amount: '',
  document: ''
};

const AddExpenseForm = ({
  isDialogOpen,
  handleDialog,
  selectedData,
  setIsEdit,
  isEdit,
  title,
  Loading,
  button,
  GetExpenseAddUpdate,
  GetExpenseById
}) => {
  const [expenseData, setExpenseData] = useState(initialValues);

  useEffect(() => {
    if (selectedData !== null) {
      GetExpenseById({ id: selectedData }, (res) => {
        if (res && res.data && res.data.data) {
          const { data } = res.data;
          Object.keys(expenseData).map((key) => {
            expenseData[key] = data[key];
          });
          setExpenseData(expenseData);
        }
      });
    } else {
      initialValues.itemName = '';
      initialValues.purchaseFrom = '';
      initialValues.purchaseDate = moment().format('YYYY-MM-DD');
      initialValues.amount = '';
      initialValues.document = '';
      setExpenseData(initialValues);
    }
  }, [selectedData]);

  return (
    <SideDrawer
      open={Boolean(isDialogOpen)}
      onClose={() => {
        handleDialog();
        setIsEdit(false);
      }}
      title={title}
      button={button}
    >
      <Formik
        enableReinitialize
        initialValues={expenseData}
        onSubmit={(values, action) => {
          const data = isEdit ? { values, selectedData } : { values };
          GetExpenseAddUpdate(data, (res) => {
            const { status } = res.data;
            if (status) {
              handleDialog();
              setIsEdit(false);
            }
          });
          action.setSubmitting(false);
        }}
        validationSchema={expenseFormSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container columnSpacing={2} justifyContent="space-between">
                <Grid item xs={12}>
                  <Input
                    type="text"
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
                    type="text"
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
                    defaultValue={values.purchaseDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.purchaseDate && touched.purchaseDate && errors.purchaseDate}
                    error={errors.purchaseDate && touched.purchaseDate}
                    success={!errors.purchaseDate && touched.purchaseDate}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    type="number"
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
                    onKeyDown={(evt) =>
                      ['e', 'E', '-', '+'].includes(evt.key) && evt.preventDefault()
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel>SELECT DOCUMENT</FormLabel>
                  <Dropzone
                    setExistingFile={values.document}
                    // eslint-disable-next-line no-console
                    selectedFile={(files) => console.log('files', files)}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // errorText={errors.document && touched.document && errors.document}
                    // error={errors.document && touched.document}
                    // success={!errors.document && touched.document}
                  />
                </Grid>
                <Grid item sm={12} md={4} lg={6} xl={12} pt={2}>
                  <Button
                    type="submit"
                    color="info"
                    variant="contained"
                    size="medium"
                    disabled={isSubmitting || Loading}
                  >
                    {Loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : isEdit ? (
                      'Update Expense'
                    ) : (
                      'Add Expense'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </SideDrawer>
  );
};

export default AddExpenseForm;
