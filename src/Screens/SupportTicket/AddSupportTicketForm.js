import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { supportTicketFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { FormControl, FormLabel, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Select from 'Elements/Select';
import Input from 'Elements/Input';
import Editor from 'Elements/Editor';
import Button from 'Elements/Button';
import { Department, Priority } from 'Helpers/Global';

const initialValues = {
  subject: '',
  message: ''
};

const AddSupportTicketDialog = ({
  isDialogOpen,
  handleDialog,
  setIsEdit,
  title,
  selectedSupportId,
  isEdit,
  GetSupportAdd,
  GetSupportUpdate,
  GetSupportById
}) => {
  const [department, setDepartment] = useState(Department[0]);
  const [priority, setPriority] = useState(Priority[0]);
  const [supportData, setSupportData] = useState(initialValues);

  useEffect(() => {
    if (selectedSupportId !== null) {
      GetSupportById({ id: selectedSupportId }, (res) => {
        if (res && res.data && res.data.data) {
          const { data } = res.data;
          supportData.subject = data.subject;
          supportData.message = data.message;
          setDepartment(Department.find((value) => value.value === data.department.toLowerCase()));
          setPriority(Priority.find((value) => value.value === data.priority.toLowerCase()));
        }
      });
    } else {
      initialValues.subject = '';
      initialValues.message = '';
      setSupportData(initialValues);
    }
  }, [selectedSupportId]);

  const onSubmit = async (formData) => {
    if (isEdit) {
      GetSupportUpdate({ data: formData, params: selectedSupportId }, (res) => {
        const { status } = res.data;
        if (status) {
          handleDialog();
          setIsEdit(false);
        }
      });
    } else {
      GetSupportAdd(formData, (res) => {
        const { status } = res.data;
        if (status) {
          handleDialog();
          setIsEdit(false);
        }
      });
    }
  };

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
          initialValues={supportData}
          onSubmit={(formData) => {
            formData.priority = priority.value;
            formData.department = department.value;
            onSubmit(formData);
          }}
          validationSchema={supportTicketFormSchema}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            } = props;
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
                  <Grid item xs={12} md={6}>
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <FormLabel> DEPARTMENT </FormLabel>
                        <Select
                          value={department}
                          options={Department}
                          fullWidth
                          onChange={(value) => setDepartment(value)}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <FormLabel> Priority </FormLabel>
                        <Select
                          value={priority}
                          options={Priority}
                          fullWidth
                          onChange={(value) => setPriority(value)}
                        />
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Editor
                        title="MESSAGE"
                        label="MESSAGE"
                        id="message"
                        name="message"
                        value={values.message}
                        backgroundContainerColor="white"
                        onChange={(value) => {
                          setFieldValue('message', value);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4} lg={6}>
                    <Button type="submit" color="info" variant="contained" size="medium">
                      {isEdit ? 'Update Ticket' : 'Add Ticket'}
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
