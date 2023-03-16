import React from 'react';
import { Formik } from 'formik';
import { CircularProgress, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SideDrawer from 'Elements/SideDrawer';
import { addEmployeeSchema } from 'Helpers/ValidationSchema';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import moment from 'moment';

const AddEmployeeDialog = ({ GetEmployeeAdd, isDialogOpen, handleDialog, Loading }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (formData) => {
    GetEmployeeAdd(formData, () => handleDialog());
  };

  return (
    <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD NEW EMPLOYEE">
      <Formik
        enableReinitialize
        initialValues={{
          email: '',
          password: '',
          employeeCode: '',
          dateOfJoin: moment().format('YYYY-MM-DD')
        }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={addEmployeeSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container justifyContent="space-between" columnSpacing={2}>
                <Grid item xs={12} md={6}>
                  <Input
                    type="text"
                    placeholder="eg. JBT0001"
                    size="large"
                    fullWidth
                    id="employeeCode"
                    name="employeeCode"
                    label="Employee Code"
                    value={values.employeeCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.employeeCode && touched.employeeCode && errors.employeeCode}
                    error={errors.employeeCode && touched.employeeCode}
                    success={!errors.employeeCode && touched.employeeCode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    type="date"
                    placeholder="Date Of Join"
                    size="large"
                    fullWidth
                    id="dateOfJoin"
                    name="dateOfJoin"
                    label="Date Of Join"
                    defaultValue={values.dateOfJoin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.dateOfJoin && touched.dateOfJoin && errors.dateOfJoin}
                    error={errors.dateOfJoin && touched.dateOfJoin}
                    success={!errors.dateOfJoin && touched.dateOfJoin}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item sm={12} md={4} lg={6} pt={2}>
                  <Button type="submit" color="info" variant="contained" size="medium">
                    {Loading ? (
                      <CircularProgress size={20} color="inherit" title="Adding" />
                    ) : (
                      'Add Employee'
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

export default AddEmployeeDialog;
