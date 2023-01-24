import { Grid } from '@mui/material';
import Icon from '@mui/material/Icon';

import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import Button from 'Elements/Button';

import team2 from 'Assets/Images/team-4-800x800.jpg';
import { Edit } from '@mui/icons-material';
import { Formik } from 'formik';
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

const Basic = () => (
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
      validationSchema={bankFormSchema}
    >
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3} container justifyContent="center">
                  <Box position="relative" height="max-content" mx="auto">
                    <Avatar src={team2} alt="profile picture" size="xxl" variant="rounded" />
                    <Box
                      alt="spotify logo"
                      position="absolute"
                      right={0}
                      bottom={0}
                      mr={-1}
                      mb={-1}
                    >
                      <Button variant="gradient" color="light" size="small" iconOnly>
                        <Icon>
                          <Edit />
                        </Icon>
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={1} rowSpacing={0}>
                    <Grid item xs={12} md={5}>
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
                          success={!errors.bankName && touched.bankName}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
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
                          success={!errors.branchName && touched.branchName}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
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
                          errorText={
                            errors.accountName && touched.accountName && errors.accountName
                          }
                          error={errors.accountName && touched.accountName}
                          success={!errors.accountName && touched.accountName}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Box>
                        <Input
                          type="text"
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
                          success={!errors.accountNumber && touched.accountNumber}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={5}>
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
                          success={!errors.ifscCode && touched.ifscCode}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={5}>
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
                          success={!errors.panNumber && touched.panNumber}
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

export default Basic;
