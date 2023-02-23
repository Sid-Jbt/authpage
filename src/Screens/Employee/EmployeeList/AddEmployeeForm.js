import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import { Check, Error, Visibility, VisibilityOff } from '@mui/icons-material';
import SideDrawer from 'Elements/SideDrawer';
import { addEmployeeSchema } from 'Helpers/ValidationSchema';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import moment from 'moment';
import { addEmployee } from 'APIs/API';
import { SnackbarContext } from 'Context/SnackbarProvider';

const renderAddEmployeeDialog = ({ isDialogOpen, handleDialog }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { setSnack } = useContext(SnackbarContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (formData) => {
    const addEmployeeRes = await addEmployee(formData);
    const { status, message } = addEmployeeRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
    }
    handleDialog();
  };

  return (
    <>
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
                <Grid container justifyContent="space-between">
                  <Grid container item spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box>
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
                          errorText={
                            errors.employeeCode && touched.employeeCode && errors.employeeCode
                          }
                          error={errors.employeeCode && touched.employeeCode}
                          success={!errors.employeeCode && touched.employeeCode}
                        />
                      </Box>
                    </Grid>
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
                          defaultValue={values.dateOfJoin}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorText={errors.dateOfJoin && touched.dateOfJoin && errors.dateOfJoin}
                          error={errors.dateOfJoin && touched.dateOfJoin}
                          success={!errors.dateOfJoin && touched.dateOfJoin}
                        />
                      </Box>
                    </Grid>
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
                  <Grid item sm={12} md={4} lg={6} pt={2}>
                    <Button type="submit" color="info" variant="contained" size="medium">
                      Add Employee
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
