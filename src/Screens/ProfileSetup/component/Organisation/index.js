import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Formik } from 'formik';
import { organisationDetailsSchema } from 'Helpers/ValidationSchema';
import Avatar from 'Elements/Avatar';
import team2 from 'Assets/Images/team-4-800x800.jpg';
import Button from 'Elements/Button';
import Icon from '@mui/material/Icon';
import { Edit } from '@mui/icons-material';
import Input from 'Elements/Input';
import Select from '../../../../Elements/Select';
import { WorkingHours } from '../../../../Helpers/Global';

const initialValues = {
  permanentAdd: '',
  workingHours: ''
};
const Organisation = () => {
  const [workingHours, setWorkingHours] = useState('');

  const handleChangWorkingHours = (event) => {
    setWorkingHours(event.target.value.value);
  };
  console.log('Selected workingHours --> ', workingHours);

  useEffect(() => {
    const openImageSelector = async () => {
      const uploadFile = await document.getElementById('uploadDGREle');
      if (uploadFile !== null && uploadFile !== undefined && uploadFile.value.length) {
        console.log('Selected Image --> ', uploadFile);
      }
    };

    openImageSelector();
  }, []);

  return (
    <Box>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            Let&apos;s start with the organisation information
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Let us know more about your organisation.
        </Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('values', values);
        }}
        validationSchema={organisationDetailsSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Box mt={2}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={6} sm={3} lg={4} container>
                    <Box position="relative" height="max-content" mx="auto">
                      <Typography variant="h6" fontWeight="small" color="label" textAlign="center">
                        Small Logo
                      </Typography>
                      <Avatar src={team2} alt="profile picture" size="xxl" variant="rounded" />
                      <Box
                        alt="spotify logo"
                        position="absolute"
                        right={0}
                        bottom={0}
                        mr={-1}
                        mb={-1}
                      >
                        <Button
                          id="smallLogo"
                          variant="gradient"
                          color="light"
                          component="label"
                          iconOnly
                        >
                          <Icon>
                            <Edit />
                            <Input id="uploadInput" type="file" hidden />
                          </Icon>
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3} lg={4} container>
                    <Box position="relative" height="max-content" mx="auto">
                      <Typography variant="h6" fontWeight="small" color="label" textAlign="center">
                        Large Logo
                      </Typography>
                      <Avatar src={team2} alt="profile picture" size="xxl" variant="rounded" />
                      <Box
                        alt="spotify logo"
                        position="absolute"
                        right={0}
                        bottom={0}
                        mr={-1}
                        mb={-1}
                      >
                        <Button
                          id="largeLogo"
                          variant="gradient"
                          color="light"
                          component="label"
                          iconOnly
                        >
                          <Icon>
                            <Edit />
                            <Input type="file" hidden />
                          </Icon>
                        </Button>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={12} lg={10} container sx={{ paddingTop: '0 !important' }}>
                    <FormControl sx={{ width: '100%' }}>
                      <FormLabel>Select Working Hours</FormLabel>
                      <Select
                        id="workingHours"
                        name="workingHours"
                        options={WorkingHours}
                        errorText={
                          errors.workingHours && touched.workingHours && errors.workingHours
                        }
                        error={errors.workingHours && touched.workingHours}
                        success={!errors.workingHours && touched.workingHours}
                        onChange={(selectedOption) => {
                          const event = { target: { name: 'gender', value: selectedOption } };
                          handleChangWorkingHours(event);
                        }}
                        onBlur={() => {
                          handleBlur({ target: { name: 'gender' } });
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} container justifyContent="center">
                    <Box sx={{ width: '82%' }}>
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
                        errorText={
                          errors.permanentAdd && touched.permanentAdd && errors.permanentAdd
                        }
                        error={errors.permanentAdd && touched.permanentAdd}
                        success={!errors.permanentAdd && touched.permanentAdd}
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
};

/* <div>Organisation things we need here Small,Large Logo, Working hours, location.</div> */

export default Organisation;
