import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { FormControl, FormLabel, Grid } from '@mui/material';
import moment from 'moment/moment';
import SideDrawer from '../../Elements/SideDrawer';
import { noticeEventSchema } from '../../Helpers/ValidationSchema';
import Box from '../../Elements/Box';
import Input from '../../Elements/Input';
import Button from '../../Elements/Button';
import Select from '../../Elements/Select';
import { EventsType } from '../../Helpers/Global';

const initialValues = {
  title: '',
  start: moment().format('YYYY-MM-DD'),
  end: moment().format('YYYY-MM-DD')
};

const AddCalendarEventDialog = ({ isDialogOpen, handleDialog, selectedData, onSubmitEvent }) => {
  const [eventType, setEventType] = useState(EventsType[0]);
  const [title, setTitle] = useState('Add NEW Notice/Event');

  const handleChangeEventType = (value) => {
    setEventType(value);
  };

  useEffect(() => {
    if (selectedData !== null) {
      setTitle('EDIT Notice/Event');
      Object.keys(initialValues).map((key) => {
        initialValues[key] = selectedData[key];
        if (key === 'title') {
          initialValues[key] = selectedData.title;
        }
        if (key === 'start') {
          initialValues[key] = moment(selectedData.start).format('YYYY-MM-DD');
        }
        if (key === 'end') {
          initialValues[key] = moment(selectedData.end).format('YYYY-MM-DD');
        }
      });
      setEventType(EventsType.find((event) => event.label === selectedData.className));
    }
  }, [selectedData]);

  const onSubmit = (formData) => {
    onSubmitEvent({ ...formData, eventType: eventType.value, id: Math.floor(Math.random() * 100) });
    handleDialog();
  };

  return (
    <>
      <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title={title}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(formData) => {
            onSubmit(formData);
          }}
          validationSchema={noticeEventSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="eg. Meeting with Mary"
                        size="large"
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.title && touched.title && errors.title}
                        error={errors.title && touched.title}
                        success={!errors.title && touched.title}
                      />
                    </Box>
                  </Grid>
                  <Grid container item spacing={2} pt={0}>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Input
                          type="date"
                          placeholder="Start Date"
                          size="large"
                          fullWidth
                          id="start"
                          name="start"
                          label="Start"
                          defaultValue={values.start}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorText={errors.start && touched.start && errors.start}
                          error={errors.start && touched.start}
                          success={!errors.start && touched.start}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Input
                          type="date"
                          placeholder="End Date"
                          size="large"
                          fullWidth
                          id="end"
                          name="end"
                          label="End"
                          defaultValue={values.end}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorText={errors.end && touched.end && errors.end}
                          error={errors.end && touched.end}
                          success={!errors.end && touched.end}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                      <FormLabel>Select Event Type</FormLabel>
                      <Select
                        value={eventType}
                        options={EventsType}
                        onChange={(value) => handleChangeEventType(value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={4} lg={6} mt={1}>
                    <Button type="submit" color="info" variant="contained" size="medium">
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

export default AddCalendarEventDialog;
