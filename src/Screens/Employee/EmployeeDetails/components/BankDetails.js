import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Card, Grid } from '@mui/material';
import { Formik } from 'formik';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { useOutletContext } from 'react-router';
import { keyDownValidation } from 'Helpers/Global';

const BankDetails = ({ data }) => {
  const { GetEmployeeUpdate } = useOutletContext();

  const onSubmit = (values, actions) => {
    GetEmployeeUpdate(values, () => {});
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <Card id="account-info">
      <Box p={3}>
        <Typography variant="h5">Bank Details</Typography>
      </Box>
      <Formik
        initialValues={
          data || {
            bankName: '',
            branchName: '',
            accountName: '',
            accountNumber: '',
            ifscCode: '',
            panNumber: ''
          }
        }
        onSubmit={onSubmit}
        // validationSchema={bankAccountSchema}
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
                      success={!errors.bankName && touched.bankName}
                      onKeyDown={(evt) =>
                        keyDownValidation.includes(evt.key) && evt.preventDefault()
                      }
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
                      label="Account Holder Name"
                      value={values.accountName}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      success={!errors.accountNumber && touched.accountNumber}
                      onKeyDown={(evt) =>
                        keyDownValidation.includes(evt.key) && evt.preventDefault()
                      }
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
                      success={!errors.ifscCode && touched.ifscCode}
                      onKeyDown={(evt) =>
                        keyDownValidation.includes(evt.key) && evt.preventDefault()
                      }
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
                      success={!errors.panNumber && touched.panNumber}
                      onKeyDown={(evt) =>
                        keyDownValidation.includes(evt.key) && evt.preventDefault()
                      }
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
