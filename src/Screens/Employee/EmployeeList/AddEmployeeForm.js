import React from 'react';
import { Formik } from 'formik';
import { Grid, Icon, IconButton, InputAdornment } from '@mui/material';
import { Save, Visibility, VisibilityOff } from '@mui/icons-material';
import SideDrawer from '../../../Elements/SideDrawer';
import { validationSchema } from '../../../Helpers/ValidationSchema';
import Box from '../../../Elements/Box';
import Input from '../../../Elements/Input';
import Button from '../../../Elements/Button';

const renderAddEmployeeDialog = ({ isDialogOpen, handleDialog }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD NEW EMPLOYEE">
        <Formik
          enableReinitialize
          initialValues={{
            email: '',
            password: '',
            empCode: '',
            dateOfJoin: '',
            dateOfLeave: ''
          }}
          onSubmit={(values) => {
            console.log('values===========', values);
          }}
          validationSchema={validationSchema}
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
                        placeholder="eg. JBT0001"
                        size="large"
                        fullWidth
                        id="empCode"
                        name="empCode"
                        label="Employee Code"
                        value={values.empCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.empCode && touched.empCode && errors.empCode}
                        error={errors.empCode && touched.empCode}
                        success={!errors.empCode && touched.empCode}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        type="email"
                        placeholder="eg. alen@abc.com"
                        size="large"
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.email && touched.email && errors.email}
                        error={errors.email && touched.email}
                        success={!errors.email && touched.email}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        placeholder="********"
                        size="large"
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.password && touched.password && errors.password}
                        error={errors.password && touched.password}
                        success={!errors.password && touched.password}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid container item spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Input
                          type="date"
                          placeholder="Date Of Join"
                          size="large"
                          fullWidth
                          id="dateOfJoin"
                          name="dateOfJoin"
                          label="Date Of Join"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorText={errors.dateOfJoin && touched.dateOfJoin && errors.dateOfJoin}
                          error={errors.dateOfJoin && touched.dateOfJoin}
                          success={!errors.dateOfJoin && touched.dateOfJoin}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Input
                          type="date"
                          placeholder="Date Of Leave"
                          size="large"
                          fullWidth
                          id="dateOfLeave"
                          name="dateOfLeave"
                          label="Date Of Leave"
                          success={!errors.dateOfLeave && touched.dateOfLeave}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} md={4} lg={6}>
                    <Button type="submit" color="info" variant="contained" size="medium">
                      <Icon sx={{ mr: 1 }}>
                        <Save />
                      </Icon>
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

export default renderAddEmployeeDialog;
