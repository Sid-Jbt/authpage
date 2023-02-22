import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { expenseFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormLabel, Grid } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { Check, Error } from '@mui/icons-material';
import Dropzone from '../../Elements/Dropzone';
import { addNewExpense } from '../../APIs/Expense';
import { SnackbarContext } from '../../Context/SnackbarProvider';

const initialValues = {
  itemName: '',
  purchaseFrom: '',
  purchaseDate: moment().format('YYYY-MM-DD'),
  amount: '',
  selectDoc: ''
};
const AddExpenseForm = ({ isDialogOpen, handleDialog, setIsEdit, selectedData, title }) => {
  const [data, setData] = useState(initialValues);
  const { setSnack } = useContext(SnackbarContext);

  useEffect(() => {
    if (selectedData !== null) {
      Object.keys(data).map((key) => {
        data[key] = selectedData[key];
        if (key === 'itemName') {
          data[key] = selectedData.title;
        }
        if (key === 'purchaseDate') {
          data[key] = moment(selectedData.purchaseDate).format('YYYY-MM-DD');
        }
      });
      setData(data);
    } else {
      initialValues.purchaseDate = moment().format('YYYY-MM-DD');
      initialValues.itemName = '';
      initialValues.purchaseFrom = '';
      initialValues.amount = '';
      setData(initialValues);
    }
  }, [selectedData]);

  const onSubmitNewExpense = async (formData) => {
    console.log('addNewExpRes', formData);
    const addNewExpRes = await addNewExpense(formData);
    const { status, message } = addNewExpRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
    }
    handleDialog();
  };

  return (
    <>
      <SideDrawer
        open={Boolean(isDialogOpen)}
        onClose={() => {
          handleDialog();
          setIsEdit(false);
        }}
        title={title}
      >
        <Formik
          enableReinitialize
          initialValues={data}
          onSubmit={(values) => {
            console.log('Return block --> ', values);
            onSubmitNewExpense(values);
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
                  <Grid item xs={12} md={4} lg={6}>
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
