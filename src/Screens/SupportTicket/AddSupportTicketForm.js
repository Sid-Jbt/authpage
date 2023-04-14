import React, { useState } from 'react';
import { Formik } from 'formik';
import { supportTicketFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { CircularProgress, FormControl, FormLabel, Grid } from '@mui/material';
import Select from 'Elements/Select';
import Input from 'Elements/Input';
import Editor from 'Elements/Editor';
import Button from 'Elements/Button';
import { Department, Priority } from 'Helpers/Global';

const initialValues = {
  subject: '',
  department: Department[0],
  priority: Priority[0],
  message: ''
};

const AddSupportTicketDialog = ({
  isDialogOpen,
  handleDialog,
  title,
  isEdit,
  GetSupportAddUpdate,
  Loading,
  selectedData
}) => {
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('');
  return (
    <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title={title}>
      <Formik
        enableReinitialize
        initialValues={selectedData || initialValues}
        onSubmit={(values, action) => {
          const formData = {
            subject: values.subject,
            department:
              isEdit && department !== ''
                ? department.value
                : !isEdit
                ? values.department.value
                : values.department,
            priority:
              isEdit && priority !== ''
                ? priority.value
                : !isEdit
                ? values.priority.value
                : values.priority,
            message: values.message.replace(/(<([^>]+)>)/gi, ''),
            ...(isEdit && { id: selectedData.id })
          };
          GetSupportAddUpdate(formData, (res) => {
            const { status } = res.data;
            if (status) {
              handleDialog();
            }
          });
          action.setSubmitting(false);
        }}
        validationSchema={supportTicketFormSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid container spacing={1} justifyContent="space-between">
                <Grid item xs={12} md={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel> DEPARTMENT </FormLabel>
                    <Select
                      value={
                        selectedData === null
                          ? values.department
                          : Department.find((o) => o.value === values.department)
                      }
                      options={Department}
                      onChange={(value) => {
                        setDepartment(value);
                        setFieldValue('department', value);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel> Priority </FormLabel>
                    <Select
                      value={
                        selectedData === null
                          ? values.priority
                          : Priority.find((o) => o.value === values.priority)
                      }
                      options={Priority}
                      onChange={(value) => {
                        setPriority(value);
                        setFieldValue('priority', value);
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12} md={4} lg={6}>
                  <Button type="submit" color="info" variant="contained" size="medium">
                    {Loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : isEdit ? (
                      'Update Support Ticket'
                    ) : (
                      'New Support Ticket'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </SideDrawer>
  );
};

export default AddSupportTicketDialog;
