import React, { useContext } from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Card, Grid } from '@mui/material';
import { Formik } from 'formik';
import { bankAccountSchema } from 'Helpers/ValidationSchema';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { Check } from '@mui/icons-material';

const BankDetails = () => {
  const { setSnack } = useContext(SnackbarContext);

  return (
    <Card id="account-info">
      <Box p={3}>
        <Typography variant="h5">Bank Details</Typography>
      </Box>
      <Formik
        initialValues={{
          bankName: '',
          branchName: '',
          accountName: '',
          accountNumber: '',
          ifscCode: '',
          panNumber: ''
        }}
        onSubmit={(values, actions) => {
          setSnack({
            title: 'Success',
            message: 'Bank details updated successfully',
            time: false,
            icon: <Check color="white" />,
            color: 'success',
            open: true
          });
          actions.setSubmitting(false);
        }}
        validationSchema={bankAccountSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} p={2} pt={0} justifyContent="flex-end">
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. State Bank Of India"
                      id="bankName"
                      name="bankName"
                      label="Bank Name"
                      value={values.bankName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.bankName && touched.bankName && errors.bankName}
                      error={errors.bankName && touched.bankName}
                      success={!errors.bankName && touched.bankName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. Iscon Cross"
                      id="branchName"
                      name="branchName"
                      label="Branch Name"
                      value={values.branchName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.branchName && touched.branchName && errors.branchName}
                      error={errors.branchName && touched.branchName}
                      success={!errors.branchName && touched.branchName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. Alen Prior"
                      id="accountName"
                      name="accountName"
                      label="Account Name"
                      value={values.accountName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.accountName && touched.accountName && errors.accountName}
                      error={errors.accountName && touched.accountName}
                      success={!errors.accountName && touched.accountName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. 0123456789012345"
                      id="accountNumber"
                      name="accountNumber"
                      label="Account Number"
                      value={values.accountNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={
                        errors.accountNumber && touched.accountNumber && errors.accountNumber
                      }
                      error={errors.accountNumber && touched.accountNumber}
                      success={!errors.accountNumber && touched.accountNumber}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. SBIN0005943"
                      id="ifscCode"
                      name="ifscCode"
                      label="IFSC Code"
                      value={values.ifscCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.ifscCode && touched.ifscCode && errors.ifscCode}
                      error={errors.ifscCode && touched.ifscCode}
                      success={!errors.ifscCode && touched.ifscCode}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. ABCTY1234D"
                      id="panNumber"
                      name="panNumber"
                      label="PAN Number"
                      value={values.panNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.panNumber && touched.panNumber && errors.panNumber}
                      error={errors.panNumber && touched.panNumber}
                      success={!errors.panNumber && touched.panNumber}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4} textAlign="end">
                  <Button
                    variant="gradient"
                    color="dark"
                    size="small"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Update Bank Details
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default BankDetails;
