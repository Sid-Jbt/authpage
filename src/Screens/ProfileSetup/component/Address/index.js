import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Formik } from 'formik';
import Input from 'Elements/Input';
import { validationSchema } from 'Helpers/ValidationSchema';
import { Grid } from '@mui/material';

const initialValues = {
  pAdd: ''
};

const Address = () => (
  <Box>
    <Box width="80%" textAlign="center" mx="auto" mb={4}>
      <Box mb={1}>
        <Typography variant="h5" fontWeight="regular">
          Let&apos;s start with the basic information
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight="regular" color="text">
        Let us know your name and father name.
      </Typography>
    </Box>
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log('values', values);
      }}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={1} rowSpacing={0}>
                    <Grid item xs={12} md={12}>
                      <Box>
                        <Input
                          type="text"
                          placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                          size="medium"
                          fullWidth
                          id="pAdd"
                          name="pAdd"
                          label="Permanent Address"
                          value={values.pAdd}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorText={errors.pAdd && touched.pAdd && errors.pAdd}
                          error={errors.pAdd && touched.pAdd}
                          success={!errors.pAdd && touched.pAdd}
                        />
                      </Box>
                    </Grid>
                  </Grid>
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
