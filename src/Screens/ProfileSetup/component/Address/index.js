import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Formik } from 'formik';
import Input from 'Elements/Input';
import { addressSchema } from 'Helpers/ValidationSchema';
import { Grid } from '@mui/material';

const initialValues = {
  permanentAdd: '',
  currentAdd: ''
};

const Address = () => (
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
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log('values', values);
      }}
      validationSchema={addressSchema}
    >
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Box mt={2} display="flex">
              <Grid container justifyContent="center">
                <Grid item xs={12} md={8}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                      size="medium"
                      fullWidth
                      id="permanentAdd"
                      name="permanentAdd"
                      label="Permanent Address"
                      value={values.pAdd}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.permanentAdd && touched.permanentAdd && errors.permanentAdd}
                      error={errors.permanentAdd && touched.permanentAdd}
                      success={!errors.permanentAdd && touched.permanentAdd}
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
                      success={!errors.currentAdd && touched.currentAdd}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </form>
        );
      }}
    </Formik>
  </Box>
);

export default Address;
