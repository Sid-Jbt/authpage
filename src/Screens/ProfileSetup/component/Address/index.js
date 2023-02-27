import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import { Grid } from '@mui/material';

const Address = ({ props }) => {
  const { values, touched, errors, handleChange, handleBlur } = props;

  return (
    <Box>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            Let&apos;s start with the contact information
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Let us know your address in details.
        </Typography>
      </Box>
      <Box mt={2} display="flex">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box>
              <Input
                type="text"
                placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                size="medium"
                fullWidth
                id="permanentAddress"
                name="permanentAddress"
                label="Permanent Address"
                value={values.permanentAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={
                  errors.permanentAddress && touched.permanentAddress && errors.permanentAddress
                }
                error={errors.permanentAddress && touched.permanentAddress}
                success={errors.permanentAddress && touched.permanentAddress}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Input
                type="text"
                placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                size="medium"
                fullWidth
                id="presentAddress"
                name="presentAddress"
                label="Current Address"
                value={values.presentAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.presentAddress && touched.presentAddress && errors.presentAddress}
                error={errors.presentAddress && touched.presentAddress}
                success={errors.presentAddress && touched.presentAddress}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Address;
