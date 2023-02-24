import React, { useEffect, useRef, useState } from 'react';
import { Card, Grid } from '@mui/material';
import Typography from 'Elements/Typography';
import { Formik } from 'formik';
import Button from 'Elements/Button';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import { bankFormSchema } from 'Helpers/ValidationSchema';

const initialValues = {
  bankName: '',
  branchName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  panNumber: ''
};

const BankInfo = ({ onFormSubmit, employeeBankDetails }) => {
  const [isEdit, setIsEdit] = useState(false);
  const formikRef = useRef();

  useEffect(() => {
    if (employeeBankDetails !== null && formikRef && formikRef.current !== undefined) {
      const { setFieldValue } = formikRef.current;
      const { bankName, branchName, accountName, accountNumber, ifscCode, panNumber } =
        employeeBankDetails.bankInfo;
      setFieldValue('bankName', bankName);
      setFieldValue('branchName', branchName);
      setFieldValue('accountName', accountName);
      setFieldValue('accountNumber', accountNumber);
      setFieldValue('ifscCode', ifscCode);
      setFieldValue('panNumber', panNumber);
    }
  }, [employeeBankDetails]);

  const handleIsEdit = () => setIsEdit(!isEdit);

  const onSubmit = (formData) => {
    onFormSubmit(formData);
  };

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        validationSchema={bankFormSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container p={2} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Bank Account
                  </Typography>
                </Grid>
                <Grid item>
                  {!isEdit ? (
                    <Button color="info" variant="contained" onClick={() => handleIsEdit()}>
                      Edit
                    </Button>
                  ) : (
                    <Button type="submit" color="info" variant="contained">
                      Save
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={1} p={2}>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. State Bank Of India"
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
                      success={!errors.bankName && touched.bankName}
                      disabled={!isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. Iscon Cross"
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
                      success={!errors.branchName && touched.branchName}
                      disabled={!isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. Alen Prior"
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
                      success={!errors.accountName && touched.accountName}
                      disabled={!isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. 0123456789012345"
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
                      success={!errors.accountNumber && touched.accountNumber}
                      disabled={!isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. SBIN0005943"
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
                      success={!errors.ifscCode && touched.ifscCode}
                      disabled={!isEdit}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. ABCTY1234D"
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
                      success={!errors.panNumber && touched.panNumber}
                      disabled={!isEdit}
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
