import React, { useEffect, useState } from 'react';
import Typography from 'Elements/Typography';
import { Card, FormControlLabel, Grid, Switch } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { Formik } from 'formik';
import { useNavigate, useOutletContext, useLocation } from 'react-router';
import { roleFormSchema } from '../../../Helpers/ValidationSchema';
import { getRolePattern } from '../../../Routes/routeConfig';

const initialValues = {
  roleName: ''
};

const module = {
  dashboard: { r: 1, w: 1, d: 1 },
  employee: { r: 1, w: 1, d: 1 },
  expense: { r: 1, w: 1, d: 1 },
  leave: { r: 1, w: 1, d: 1 },
  payslip: { r: 1, w: 1, d: 1 },
  attendance: { r: 1, w: 1, d: 1 },
  role: { r: 1, w: 1, d: 1 },
  supportTicket: { r: 1, w: 1, d: 1 },
  reports: { r: 1, w: 1, d: 1 },
  allReports: { r: 1, w: 1, d: 1 },
  timeActivity: { r: 1, w: 1, d: 1 },
  weeklyLimit: { r: 1, w: 1, d: 1 },
  holiday: { r: 1, w: 1, d: 1 },
  profile: { r: 1, w: 1, d: 1 },
  profileSetup: { r: 1, w: 1, d: 1 },
  privacy: { r: 1, w: 1, d: 1 },
  employeeDetails: { r: 1, w: 1, d: 1 },
  settings: { r: 1, w: 1, d: 1 },
  roleDetails: { r: 1, w: 1, d: 1 }
};
const AddRole = () => {
  const [modules, setModules] = useState(module);
  const { GetRoleAdd, GetRoleById } = useOutletContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const collapseName = pathname.split('/').slice(1)[1];

  const onChangePermission = (moduleName, permissionKey) => {
    const data = { ...modules };
    data[moduleName][permissionKey] = modules[moduleName][permissionKey] === 0 ? 1 : 0;
    setModules(data);
  };

  useEffect(() => {
    if (collapseName !== 'addRole') {
      GetRoleById(
        {
          slug: collapseName
        },
        (res) => {
          if (res && res.data && res.data.data) {
            const { permission, name } = res.data.data;
            initialValues.roleName = name;
            setModules(permission);
          }
        }
      );
    }
  }, []);

  return (
    <Card
      sx={{
        py: 2,
        px: 2,
        boxShadow: ({ boxShadows: { sm } }) => sm
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, action) => {
              const formData = {
                roleName: values.roleName,
                permission: JSON.stringify(module)
              };
              GetRoleAdd(formData, (res) => {
                const { status } = res.data;
                if (status) {
                  navigate(getRolePattern());
                }
              });
              action.setSubmitting(false);
            }}
            validationSchema={roleFormSchema}
          >
            {(props) => {
              const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
              // console.log('values', values);
              return (
                <form onSubmit={handleSubmit}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button type="submit" color="info" variant="contained" size="medium">
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Input
                        type="text"
                        placeholder="Write role here..."
                        size="medium"
                        id="roleName"
                        name="roleName"
                        label="Role Name"
                        fullWidth
                        value={values.roleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.roleName && touched.roleName && errors.roleName}
                        error={errors.roleName && touched.roleName}
                        success={!errors.roleName && touched.roleName}
                      />
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Grid>
        <Grid item xs={12}>
          {Object.keys(modules).map((key) => (
            <Grid container sx={{ padding: 1 }}>
              <Grid item xs={12} md={2}>
                <Typography
                  variant="subtitle2"
                  color="text"
                  fontWeight="bold"
                  textTransform="capitalize"
                  sx={{ paddingRight: 2 }}
                >
                  {key}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={10}
                sx={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <FormControlLabel
                  sx={{ m: 0, fontSize: '14px' }}
                  value={modules[key].r === 1}
                  control={
                    <Switch
                      checked={modules[key].r === 1}
                      color="primary"
                      name="r"
                      onChange={() => onChangePermission(key, 'r')}
                    />
                  }
                  label={
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      sx={{ cursor: 'pointer', userSelect: 'none', paddingRight: 2 }}
                    >
                      Read
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  sx={{ m: 0, fontSize: '14px' }}
                  value={modules[key].w === 1}
                  control={
                    <Switch
                      checked={modules[key].w === 1}
                      color="primary"
                      name="w"
                      onChange={() => onChangePermission(key, 'w')}
                    />
                  }
                  label={
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      sx={{ cursor: 'pointer', userSelect: 'none', paddingRight: 2 }}
                    >
                      Write
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  sx={{ m: 0, fontSize: '14px' }}
                  value={modules[key].d === 1}
                  control={
                    <Switch
                      checked={modules[key].d === 1}
                      color="primary"
                      name="d"
                      onChange={() => onChangePermission(key, 'd')}
                    />
                  }
                  label={
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      sx={{ cursor: 'pointer', userSelect: 'none', paddingRight: 2 }}
                    >
                      Delete
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};
export default AddRole;
