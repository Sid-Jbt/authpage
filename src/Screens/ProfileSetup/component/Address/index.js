import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import { Grid } from '@mui/material';

const Address = (props) => {
  const { values, touched, errors, handleChange, handleBlur } = props.props;
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
                id="address"
                name="address"
                label="Permanent Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.address && touched.address && errors.address}
                error={errors.address && touched.address}
                success={errors.address && touched.address}
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
                id="currentAdd"
                name="currentAdd"
                label="Current Address"
                value={values.currentAdd}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.currentAdd && touched.currentAdd && errors.currentAdd}
                error={errors.currentAdd && touched.currentAdd}
                success={errors.currentAdd && touched.currentAdd}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Address;
