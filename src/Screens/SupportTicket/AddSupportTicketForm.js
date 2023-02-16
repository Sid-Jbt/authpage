import React, { useState } from 'react';
import { Formik } from 'formik';
import { supportTicketFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormControl, FormLabel, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Select from 'Elements/Select';
import Input from 'Elements/Input';
import Editor from 'Elements/Editor';
import Button from 'Elements/Button';
import { Department } from 'Helpers/Global';

const initialValues = {
  subject: '',
  message: '',
  department: ''
};

const AddSupportTicketDialog = ({ isDialogOpen, handleDialog, setIsEdit, title }) => {
  const [department, setDepartment] = useState(Department[0]);
  const [data, setData] = useState(initialValues);

  const handleChangeDepartment = (selectedDepartment) => {
    setDepartment(selectedDepartment);
  };

  const onSubmit = (formData) => {
    console.log('formData', formData);
  };

  console.log('setData,,,,', setData);

  return (
    <>
      <SideDrawer
        open={Boolean(isDialogOpen)}
        onClose={() => {
          handleDialog();
          setIsEdit(false);
        }}
        title={title}
      >
        <Formik
          enableReinitialize
          initialValues={data}
          onSubmit={(formData) => {
            onSubmit(formData);
          }}
          validationSchema={supportTicketFormSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Write here..."
                      size="medium"
                      id="subject"
                      name="subject"
                      label="SUBJECT"
                      fullWidth
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.subject && touched.subject && errors.subject}
                      error={errors.subject && touched.subject}
                      success={!errors.subject && touched.subject}
                    />
                  </Box>
                </Grid>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12} md={12}>
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <FormLabel> DEPARTMENT </FormLabel>
                        <Select
                          value={department}
                          options={Department}
                          fullWidth
                          onChange={(value) => handleChangeDepartment(value)}
                        />
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Editor
                        title="MESSAGE"
                        value={values.message}
                        label="MESSAGE"
                        backgroundContainerColor="white"
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    sm={12}
                    md={4}
                    lg={6}
                    xl={12}
                    sx={{
                      marginRight: '10px'
                    }}
                  >
                    <Button type="submit" color="info" variant="contained" size="small">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </SideDrawer>
    </>
  );
};

export default AddSupportTicketDialog;
