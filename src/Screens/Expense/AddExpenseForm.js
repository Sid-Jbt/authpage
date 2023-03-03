import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { expenseFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormLabel, Grid, CircularProgress } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { Check, Error } from '@mui/icons-material';
import Dropzone from '../../Elements/Dropzone';
import { addNewExpense, updateExpense } from '../../APIs/Expense';
import { SnackbarContext } from '../../Context/SnackbarProvider';

const initialValues = {
  itemName: '',
  purchaseFrom: '',
  purchaseDate: moment().format('YYYY-MM-DD'),
  amount: '',
  document: ''
};
const AddExpenseForm = ({ isDialogOpen, handleDialog, setIsEdit, selectedData, title, isEdit }) => {
  const [data, setData] = useState(initialValues);
  const { setSnack } = useContext(SnackbarContext);
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedData !== null) {
      Object.keys(data).map((key) => {
        data[key] = selectedData[key];
        if (key === document) {
          data[key] = selectedData.document;
        }
      });
      setData(data);
    } else {
      initialValues.purchaseDate = moment().format('YYYY-MM-DD');
      initialValues.itemName = '';
      initialValues.purchaseFrom = '';
      initialValues.amount = '';
      initialValues.document = '';
      setData(initialValues);
    }
  }, [selectedData]);

  const onSubmitNewExpense = async (formData) => {
    let updatedFormData = {};
    let expenseRes;

    if (updatedFormData.document === undefined || updatedFormData.document === '') {
      if (image !== null && image !== undefined) {
        updatedFormData = {
          itemName: formData.itemName,
          purchaseFrom: formData.purchaseFrom,
          purchaseDate: formData.purchaseDate,
          amount: formData.amount,
          document: image
        };
      } else {
        updatedFormData = {
          itemName: formData.itemName,
          purchaseFrom: formData.purchaseFrom,
          purchaseDate: formData.purchaseDate,
          amount: formData.amount
        };
      }
    }

    setLoader(true);
    if (isEdit) {
      expenseRes = await updateExpense(updatedFormData, selectedData.id);
    } else {
      expenseRes = await addNewExpense(updatedFormData);
    }

    const { status, message } = expenseRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      setLoader(false);
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
      setLoader(false);
    }
    handleDialog();
    setIsEdit(false);
  };

  const uploadFile = (file) => {
    setImage(file[0]);
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
                      selectedFile={(files) => uploadFile(files)}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // errorText={errors.document && touched.document && errors.document}
                      // error={errors.document && touched.document}
                      // success={!errors.document && touched.document}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={6}>
                    <Button
                      type="submit"
                      color="info"
                      variant="contained"
                      size="medium"
                      disabled={loader}
                      sx={loader && { height: '40px !important', width: '80% !important' }}
                    >
                      {loader ? (
                        <CircularProgress color="inherit" />
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
    </>
  );
};

export default AddExpenseForm;
