import React from 'react';
import { Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';

const Account = ({ props }) => {
  const { values, touched, errors, handleChange, handleBlur } = props;

  return (
    <Box>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            Let&apos;s start with the bank information
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Let us know your bank account details.
        </Typography>
      </Box>
      <Box mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Grid container spacing={1} rowSpacing={0}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Input
                    type="text"
                    placeholder="eg. State Bank Of India"
                    size="medium"
                    fullWidth
                    id="bankName"
                    name="bankName"
                    label="Bank Name"
                    value={values.bankName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.bankName && touched.bankName && errors.bankName}
                    error={errors.bankName && touched.bankName}
                    success={errors.bankName && touched.bankName}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Input
                    type="text"
                    placeholder="eg. Iscon Cross"
                    size="medium"
                    fullWidth
                    id="branchName"
                    name="branchName"
                    label="Branch Name"
                    value={values.branchName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.branchName && touched.branchName && errors.branchName}
                    error={errors.branchName && touched.branchName}
                    success={errors.branchName && touched.branchName}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Input
                    type="text"
                    placeholder="eg. Alen Prior"
                    size="medium"
                    fullWidth
                    id="accountName"
                    name="accountName"
                    label="Account Name"
                    value={values.accountName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.accountName && touched.accountName && errors.accountName}
                    error={errors.accountName && touched.accountName}
                    success={errors.accountName && touched.accountName}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Input
                    type="number"
                    placeholder="eg. 0123456789012345"
                    size="medium"
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
                    success={errors.accountNumber && touched.accountNumber}
                    onKeyDown={(evt) =>
                      ['e', 'E', '-', '.'].includes(evt.key) && evt.preventDefault()
                    }
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <Input
                    type="text"
                    placeholder="eg. SBIN0005943"
                    size="medium"
                    fullWidth
                    id="ifscCode"
                    name="ifscCode"
                    label="IFSC Code"
                    value={values.ifscCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.ifscCode && touched.ifscCode && errors.ifscCode}
                    error={errors.ifscCode && touched.ifscCode}
                    success={errors.ifscCode && touched.ifscCode}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <Input
                    type="text"
                    placeholder="eg. ABCTY1234D"
                    size="medium"
                    fullWidth
                    id="panNumber"
                    name="panNumber"
                    label="PAN Number"
                    value={values.panNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.panNumber && touched.panNumber && errors.panNumber}
                    error={errors.panNumber && touched.panNumber}
                    success={errors.panNumber && touched.panNumber}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Account;
