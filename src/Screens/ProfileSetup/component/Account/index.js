import React from 'react';
import { Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import { keyDownTypeNumber, keyDownValidation } from 'Helpers/Global';

const Account = ({ props }) => {
  const { values, handleChange, handleBlur } = props;

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
                    errorFalse
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
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
                    errorFalse
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
                    label="Account Holder Name"
                    value={values.accountName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorFalse
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
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
                    errorFalse
                    onKeyDown={(evt) => keyDownTypeNumber.includes(evt.key) && evt.preventDefault()}
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
                    errorFalse
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
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
                    errorFalse
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
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
