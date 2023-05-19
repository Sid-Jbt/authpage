import React, { useEffect } from 'react';
import Typography from 'Elements/Typography';
import { Card, FormControlLabel, Grid, Switch } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { Formik } from 'formik';
import { useNavigate, useOutletContext, useLocation } from 'react-router';
import { roleFormSchema } from 'Helpers/ValidationSchema';
import { getRolePattern } from 'Routes/routeConfig';
import { defaultModulePermissions } from 'Helpers/Global';

const initialValues = {
  roleName: '',
  modules: {}
};

const AddRole = () => {
  const { GetRoleAdd, GetRoleById, GetRoleUpdate, GetModuleList } = useOutletContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const collapseName = pathname.split('/').slice(1)[1];

  const excludePermission = [
    'organisation',
    'role',
    'roleDetails',
    'dashboard',
    'profileSetup',
    'profile',
    'personal',
    'accounts'
  ];

  useEffect(() => {
    let arr = [];
    if (collapseName !== 'addRole') {
      GetRoleById(
        {
          slug: collapseName
        },
        (res) => {
          if (res && res.data && res.data.data) {
            const { permission, name } = res.data.data;
            initialValues.roleName = name;
            initialValues.modules = permission;
          }
        }
      );
    } else {
      GetModuleList({}, (res) => {
        if (res && res.data && res.data.data) {
          arr = res.data.data
            .map((v) => ({ ...v, permission: { r: 0, w: 0, u: 0, d: 0, a: 0 } }))
            .sort((a, b) => (a.name > b.name ? 1 : -1));
          const arrayToObject = () => {
            const newList = {};
            for (let i = 0; i < arr.length; i++) {
              const key = arr[i].name;
              newList[key] = arr[i].permission;
              delete newList[key].id;
              delete newList[key].name;
            }
            return newList;
          };
          initialValues.modules = arrayToObject(arr);
        }
      });
    }
    return () => {
      initialValues.roleName = '';
      initialValues.modules = {};
    };
  }, []);

  const onSubmit = (values, actions) => {
    let formData;
    if (values.modules.employee.r === 1) {
      formData = {
        roleName: values.roleName,
        permission: JSON.stringify({
          ...values.modules,
          role: { r: 1, w: 0, u: 0, d: 0, a: 0 },
          dashboard: defaultModulePermissions.dashboard,
          organisation: defaultModulePermissions.organisation,
          roleDetails: defaultModulePermissions.roleDetails,
          profileSetup: defaultModulePermissions.profileSetup,
          profile: defaultModulePermissions.profile,
          personal: defaultModulePermissions.personal,
          accounts: defaultModulePermissions.accounts
        })
      };
    } else {
      formData = {
        roleName: values.roleName,
        permission: JSON.stringify({
          ...values.modules,
          dashboard: defaultModulePermissions.dashboard,
          organisation: defaultModulePermissions.organisation,
          role: defaultModulePermissions.role,
          roleDetails: defaultModulePermissions.roleDetails,
          profileSetup: defaultModulePermissions.profileSetup,
          profile: defaultModulePermissions.profile,
          personal: defaultModulePermissions.personal,
          accounts: defaultModulePermissions.accounts
        })
      };
    }

    if (collapseName === 'addRole') {
      GetRoleAdd(formData, (res) => {
        const { status } = res.data;
        if (status) {
          navigate(getRolePattern());
        }
      });
    } else {
      GetRoleUpdate(formData, (res) => {
        const { status } = res.data;
        if (status) {
          navigate(getRolePattern());
        }
      });
    }
    actions.setSubmitting(false);
  };
  return (
    <Card
      sx={{
        py: 2,
        px: 2,
        boxShadow: ({ boxShadows: { sm } }) => sm
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              onSubmit(values, actions);
            }}
            validationSchema={roleFormSchema}
          >
            {(props) => {
              const {
                values: { roleName, modules },
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Input
                        type="text"
                        placeholder="Write role here..."
                        size="medium"
                        id="roleName"
                        name="roleName"
                        label="Role Name"
                        fullWidth
                        value={roleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.roleName && touched.roleName && errors.roleName}
                        error={errors.roleName && touched.roleName}
                        success={!errors.roleName && touched.roleName}
                        disabled={collapseName !== 'addRole'}
                      />
                    </Grid>
                    {modules !== null &&
                      Object.keys(modules).map(
                        (key) =>
                          excludePermission.indexOf(key) < 0 && (
                            <Grid item xs={12} md={6} lg={4} xl={3} key={key}>
                              <Card>
                                <Grid container p={2}>
                                  <Grid item xs={12}>
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
                                  <Grid container item xs={12}>
                                    <FormControlLabel
                                      sx={{ m: 0, fontSize: '12px' }}
                                      control={
                                        <Switch
                                          checked={modules[key].r === 1}
                                          color="primary"
                                          name="r"
                                          onChange={() => {
                                            setFieldValue('modules', {
                                              ...modules,
                                              [key]: {
                                                ...modules[key],
                                                r: modules[key].r === 1 ? 0 : 1
                                              }
                                            });
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          variant="button"
                                          fontWeight="regular"
                                          sx={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            paddingRight: 2
                                          }}
                                        >
                                          View
                                        </Typography>
                                      }
                                      labelPlacement="end"
                                    />
                                    <FormControlLabel
                                      sx={{ m: 0, fontSize: '12px' }}
                                      control={
                                        <Switch
                                          checked={modules[key].w === 1}
                                          color="primary"
                                          name="w"
                                          onChange={() => {
                                            setFieldValue('modules', {
                                              ...modules,
                                              [key]: {
                                                ...modules[key],
                                                w: modules[key].w === 1 ? 0 : 1,
                                                r: modules[key].w === 1 ? 0 : 1
                                              }
                                            });
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          variant="button"
                                          fontWeight="regular"
                                          sx={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            paddingRight: 2
                                          }}
                                        >
                                          Add
                                        </Typography>
                                      }
                                      labelPlacement="end"
                                    />
                                    <FormControlLabel
                                      sx={{ m: 0, fontSize: '12px' }}
                                      control={
                                        <Switch
                                          checked={modules[key].u === 1}
                                          color="primary"
                                          name="u"
                                          onChange={() => {
                                            setFieldValue('modules', {
                                              ...modules,
                                              [key]: {
                                                ...modules[key],
                                                u: modules[key].u === 1 ? 0 : 1,
                                                r: modules[key].u === 1 ? 0 : 1,
                                                w: modules[key].u === 1 ? 0 : 1
                                              }
                                            });
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          variant="button"
                                          fontWeight="regular"
                                          sx={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            paddingRight: 2
                                          }}
                                        >
                                          Update
                                        </Typography>
                                      }
                                      labelPlacement="end"
                                    />
                                    <FormControlLabel
                                      sx={{ m: 0, fontSize: '12px' }}
                                      control={
                                        <Switch
                                          checked={modules[key].d === 1}
                                          color="primary"
                                          name="d"
                                          onChange={() => {
                                            setFieldValue('modules', {
                                              ...modules,
                                              [key]: {
                                                ...modules[key],
                                                d: modules[key].d === 1 ? 0 : 1,
                                                r: modules[key].d === 1 ? 0 : 1,
                                                w: modules[key].d === 1 ? 0 : 1,
                                                u: modules[key].d === 1 ? 0 : 1
                                              }
                                            });
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          variant="button"
                                          fontWeight="regular"
                                          sx={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            paddingRight: 2
                                          }}
                                        >
                                          Delete
                                        </Typography>
                                      }
                                      labelPlacement="end"
                                    />
                                    <FormControlLabel
                                      sx={{ m: 0, fontSize: '12px' }}
                                      control={
                                        <Switch
                                          checked={modules[key].a === 1}
                                          color="primary"
                                          name="a"
                                          onChange={() => {
                                            setFieldValue('modules', {
                                              ...modules,
                                              [key]: {
                                                ...modules[key],
                                                a: modules[key].a === 1 ? 0 : 1,
                                                r: modules[key].a === 1 ? 0 : 1,
                                                w: modules[key].a === 1 ? 0 : 1,
                                                u: modules[key].a === 1 ? 0 : 1,
                                                d: modules[key].a === 1 ? 0 : 1
                                              }
                                            });
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          variant="button"
                                          fontWeight="regular"
                                          sx={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            paddingRight: 2
                                          }}
                                        >
                                          Admin
                                        </Typography>
                                      }
                                      labelPlacement="end"
                                    />
                                  </Grid>
                                </Grid>
                              </Card>
                            </Grid>
                          )
                      )}
                    <Grid item xs={12} textAlign="end">
                      <Button
                        type="submit"
                        color="info"
                        variant="contained"
                        size="medium"
                        disabled={isSubmitting}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Card>
  );
};
export default AddRole;
