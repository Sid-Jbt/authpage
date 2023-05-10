import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { CircularProgress, Grid } from '@mui/material';
import SideDrawer from 'Elements/SideDrawer';
import { addEmployeeSchema } from 'Helpers/ValidationSchema';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import moment from 'moment';
import Select from 'Elements/Select';
import { rolesArray } from '../../Helpers/Global';

const AddEmployeeDialog = ({
  GetEmployeeAdd,
  isDialogOpen,
  handleDialog,
  Loading,
  GetRoleList
}) => {
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    GetRoleList(
      {
        limit: 0
      },
      (res) => {
        if (res && res.data && res.data.data) {
          const roles = rolesArray(res.data.data.rows);
          setAllRoles(rolesArray(res.data.data.rows));
          setSelectedRole(roles[roles.findIndex((x) => x.value.toLowerCase() === 'employee')]);
        }
      }
    );
  }, []);

  return (
    <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD NEW EMPLOYEE">
      <Formik
        enableReinitialize
        initialValues={{
          employeeCode: '',
          email: '',
          password: '',
          dateOfJoin: moment().format('YYYY-MM-DD'),
          roleId: selectedRole
        }}
        onSubmit={(values, action) => {
          const formData = {
            employeeCode: values.employeeCode,
            email: values.email,
            password: values.password,
            dateOfJoin: values.dateOfJoin,
            roleId: values.roleId.id
          };
          GetEmployeeAdd(formData, (res) => {
            const { status } = res.data;
            if (status) {
              handleDialog();
            }
          });
          action.setSubmitting(false);
        }}
        validationSchema={addEmployeeSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
            props;
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
                    label="Onboarding Date"
                    defaultValue={values.dateOfJoin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.dateOfJoin && touched.dateOfJoin && errors.dateOfJoin}
                    error={errors.dateOfJoin && touched.dateOfJoin}
                    success={!errors.dateOfJoin && touched.dateOfJoin}
                  />
                </Grid>
                {allRoles.length > 0 && (
                  <Grid item xs={12}>
                    <Select
                      label="Select Role"
                      value={selectedRole}
                      options={allRoles}
                      onChange={(value) => {
                        setSelectedRole(value);
                        setFieldValue('roleId', value);
                      }}
                    />
                  </Grid>
                )}

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
                    type="password"
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
