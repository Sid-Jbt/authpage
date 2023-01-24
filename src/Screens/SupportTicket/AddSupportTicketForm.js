import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import SideDrawer from 'Elements/SideDrawer';
// import { FormControl, FormLabel, Grid } from '@mui/material';
import Box from 'Elements/Box';
// import Select from 'Elements/Select';
import Input from 'Elements/Input';
import Editor from 'Elements/Editor';
import Button from 'Elements/Button';
import moment from 'moment/moment';
import { Grid } from '@mui/material';
import { validationSchema } from '../../Helpers/ValidationSchema';
// import Select from '../../Elements/Select';
// import { Department } from '../../Helpers/Globle';

const initialValues = {
  subject: '',
  message: '',
  department: ''
};

const renderDialogContent = ({ isDialogOpen, handleDialog, selectedData }) => {
  const [title, setTitle] = useState('ADD NEW SUPPORT TICKET');
  // const [department, setDepartment] = useState('');
  //
  // const handleChangeDepartment = (value) => {
  //   setDepartment(value.value);
  // };

  useEffect(() => {
    if (selectedData !== null) {
      setTitle({ title });
      Object.keys(initialValues).map((key) => {
        initialValues[key] = selectedData[key];
        if (key === 'subject') {
          initialValues[key] = moment(selectedData.from).format('text');
        }
      });
      // setLeaveType(leaveTypes.find((leave) => leave.label === selectedData.leaveType));
    }
  }, [selectedData]);

  const onSubmit = (formData) => {
    console.log('formData', formData);
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
          validationSchema={validationSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="eg. JBT0001"
                        size="large"
                        fullWidth
                        id="sub"
                        name="sub"
                        label="Subject"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.sub && touched.sub && errors.sub}
                        error={errors.sub && touched.sub}
                        success={!errors.sub && touched.sub}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Editor
                        label="Write down"
                        value={values.supportTicket}
                        backgroundContainerColor="white"
                      />
                    </Box>
                  </Grid>
                  {/* <Grid item xs={12} md={4} lg={2.4}> */}
                  {/*  <FormControl sx={{ width: '100%' }}> */}
                  {/*    <FormLabel>DEPARTMENT</FormLabel> */}
                  {/*    <Select */}
                  {/*      options={Department} */}
                  {/*      onChange={(value) => handleChangeDepartment(value)} */}
                  {/*    /> */}
                  {/*  </FormControl> */}
                  {/* </Grid> */}

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
                      SUBMIT
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

// const renderDialogContent = ({ isDialogOpen, handleDialog }) => (
//   <>
//     <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD NEW SUPPORT TICKET">
//       <Formik
//         enableReinitialize
//         initialValues={{
//           subject: '',
//           message: '',
//           department: ''
//         }}
//         onSubmit={(values) => {
//           console.log('values===========', values);
//         }}
//         validationSchema={validationSchema}
//       >
//         {(props) => {
//           const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
//           return (
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={1} justifyContent="space-between">
//                 <Grid item xs={12} md={6}>
//                   <Box>
//                     <Input
//                       type="text"
//                       placeholder="eg. JBT0001"
//                       size="large"
//                       fullWidth
//                       id="sub"
//                       name="sub"
//                       label="Subject"
//                       value={values.subject}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       errorText={errors.sub && touched.sub && errors.sub}
//                       error={errors.sub && touched.sub}
//                       success={!errors.sub && touched.sub}
//                     />
//                   </Box>
//                 </Grid>
//
//                 <Grid item xs={12}>
//                   <Box>
//                     <Editor
//                       label="Write down"
//                       value={values.supportTicket}
//                       backgroundContainerColor="white"
//                     />
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} md={4} lg={2.4}>
//                   <FormControl sx={{ width: '100%' }}>
//                     <FormLabel>Select Status</FormLabel>
//                     <Select options={Status} onChange={(value) => handleChangeDepartment(value)} />
//                   </FormControl>
//                 </Grid>
//
//                 <Grid
//                   item
//                   sm={12}
//                   md={4}
//                   lg={6}
//                   xl={12}
//                   sx={{
//                     marginRight: '10px'
//                   }}
//                 >
//                   <Button type="submit" color="info" variant="contained" size="small">
//                     SUBMIT
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           );
//         }}
//       </Formik>
//     </SideDrawer>
//   </>
// );
export default renderDialogContent;
