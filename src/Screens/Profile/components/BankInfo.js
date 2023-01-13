import React from 'react';
import { Card, Grid, useTheme } from '@mui/material';
import Typography from 'Elements/Typography';
import { Formik } from 'formik';
import Button from 'Elements/Button';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import validationSchema from '../../../Helpers/ValidationSchema';

const BankInfo = () => {
  const theme = useTheme();
  return (
    <Card>
      <Grid container p={2}>
        <Grid item xs={10} md={11} lg={11}>
          <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
            Bank Info
          </Typography>
        </Grid>
        <Grid item>
          <Button color="info" variant="contained">
            Edit
          </Button>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          bankName: '',
          branchName: '',
          accountName: '',
          accountNumber: '',
          ifscCode: '',
          panNumber: ''
        }}
        onSubmit={(values) => {
          console.log('values', values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit} style={{ background: theme.palette.grey[100] }}>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Bank Name"
                      size="large"
                      fullWidth
                      id="bankName"
                      name="bankName"
                      label="Bank Name"
                      value={values.bankName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.bankName && touched.bankName && errors.bankName}
                      error={errors.bankName && touched.bankName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Branch Name"
                      size="large"
                      fullWidth
                      id="branchName"
                      name="branchName"
                      label="Branch Name"
                      value={values.branchName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.branchName && touched.branchName && errors.branchName}
                      error={errors.branchName && touched.branchName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Account Name"
                      size="large"
                      fullWidth
                      id="accountName"
                      name="accountName"
                      label="Account Name"
                      value={values.accountName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.accountName && touched.accountName && errors.accountName}
                      error={errors.accountName && touched.accountName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Account Number"
                      size="large"
                      fullWidth
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
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="IFSC Code"
                      size="large"
                      fullWidth
                      id="ifscCode"
                      name="ifscCode"
                      label="IFSC Code"
                      value={values.ifscCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.ifscCode && touched.ifscCode && errors.ifscCode}
                      error={errors.ifscCode && touched.ifscCode}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="PAN Number"
                      size="large"
                      fullWidth
                      id="panNumber"
                      name="panNumber"
                      label="PAN Number"
                      value={values.panNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.panNumber && touched.panNumber && errors.panNumber}
                      error={errors.panNumber && touched.panNumber}
                    />
                  </Box>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default BankInfo;
