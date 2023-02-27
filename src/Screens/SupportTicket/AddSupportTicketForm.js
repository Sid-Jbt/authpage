import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { supportTicketFormSchema } from 'Helpers/ValidationSchema';
import SideDrawer from 'Elements/SideDrawer';
import { CircularProgress, FormControl, FormLabel, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Select from 'Elements/Select';
import Input from 'Elements/Input';
import Editor from 'Elements/Editor';
import Button from 'Elements/Button';
import { Department, Priority } from 'Helpers/Global';
import { Check, Error } from '@mui/icons-material';
import { addNewSupportTicket, updateSupportTicket } from '../../APIs/SupportTicket';
import { SnackbarContext } from '../../Context/SnackbarProvider';

const initialValues = {
  subject: '',
  messageBody: ''
};

const AddSupportTicketDialog = ({
  isDialogOpen,
  handleDialog,
  setIsEdit,
  title,
  selectedData,
  isEdit
}) => {
  const [department, setDepartment] = useState(Department[0]);
  const [priority, setPriority] = useState(Priority[3]);
  const [messageBody, setMessageBody] = useState('');
  const [data, setData] = useState(initialValues);
  const { setSnack } = useContext(SnackbarContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (selectedData !== null) {
      Object.keys(data).map((key) => {
        data[key] = selectedData[key];
      });
      setData(data);
      setDepartment(Department.find((value) => value.label === selectedData.department));
      setPriority(Priority.find((value) => value.label === selectedData.priority));
      setMessageBody(selectedData.message);
    } else {
      initialValues.subject = '';
      initialValues.message = '';
      setData(initialValues);
    }
  }, [selectedData]);

  const handleChangeDepartment = (selectedDepartment) => {
    setDepartment(selectedDepartment);
  };

  const handleChangePriority = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const handleChangeMessage = (value) => {
    setMessageBody(value);
  };

  const onSubmitNewSupportTicket = async (formData) => {
    let updatedFormData = {};
    let supportTicketRes;

    updatedFormData = {
      subject: formData.subject,
      priority: priority.label,
      department: department.label,
      message: messageBody
    };

    setLoader(true);
    if (isEdit) {
      supportTicketRes = await updateSupportTicket(updatedFormData, selectedData.id);
    } else {
      supportTicketRes = await addNewSupportTicket(updatedFormData);
    }

    const { status, message } = supportTicketRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      setLoader(false);
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
      setLoader(false);
    }
    handleDialog();
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
          initialValues={data}
          onSubmit={(formData) => {
            onSubmitNewSupportTicket(formData);
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <FormLabel> Priority </FormLabel>
                        <Select
                          value={priority}
                          options={Priority}
                          fullWidth
                          onChange={(value) => handleChangePriority(value)}
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
                        value={messageBody}
                        backgroundContainerColor="white"
                        onChange={(value) => {
                          handleChangeMessage(value);
                        }}
                        modules={Editor.modules}
                        formats={Editor.formats}
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
                    <Button
                      type="submit"
                      color="info"
                      variant="contained"
                      size="small"
                      disabled={loader}
                      sx={loader && { height: '40px !important', width: '80% !important' }}
                    >
                      {loader ? <CircularProgress color="inherit" /> : 'Save'}
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
