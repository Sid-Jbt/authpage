import React, { useState } from 'react';
import Typography from 'Elements/Typography';
import { Card, FormControlLabel, Grid, Switch } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';

const module = {
  dashboard: { read: 1, write: 0, view: 0, delete: 0 },
  employee: { read: 0, write: 1, view: 1, delete: 0 },
  expense: { read: 0, write: 1, view: 0, delete: 0 },
  leave: { read: 0, write: 1, view: 0, delete: 0 },
  paySlip: { read: 0, write: 1, view: 0, delete: 0 },
  attendance: { read: 0, write: 1, view: 0, delete: 0 },
  role: { read: 0, write: 1, view: 0, delete: 0 },
  supportTicket: { read: 0, write: 1, view: 0, delete: 0 },
  reports: { read: 0, write: 1, view: 0, delete: 1 },
  allReports: { read: 0, write: 1, view: 0, delete: 0 },
  timeActivity: { read: 0, write: 1, view: 1, delete: 0 },
  weeklyLimit: { read: 0, write: 1, view: 0, delete: 0 },
  holiday: { read: 0, write: 1, view: 0, delete: 0 }
};

const AddRole = () => {
  const [modules, setModules] = useState(module);

  const onChangePermission = (moduleName, permissionKey) => {
    const data = { ...modules };
    data[moduleName][permissionKey] = modules[moduleName][permissionKey] === 0 ? 1 : 0;
    setModules(data);
  };

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
        <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" color="info" variant="contained" size="small">
            Save
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Input
            type="text"
            placeholder="Role Name"
            size="large"
            fullWidth
            id="roleName"
            name="roleName"
            label="Role Name"
          />
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
                  value={modules[key].read === 1}
                  control={
                    <Switch
                      checked={modules[key].read === 1}
                      color="primary"
                      name="read"
                      onChange={() => onChangePermission(key, 'read')}
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
                  value={modules[key].write === 1}
                  control={
                    <Switch
                      checked={modules[key].write === 1}
                      color="primary"
                      name="write"
                      onChange={() => onChangePermission(key, 'write')}
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
                  value={modules[key].view === 1}
                  control={
                    <Switch
                      checked={modules[key].view === 1}
                      color="primary"
                      name="view"
                      onChange={() => onChangePermission(key, 'view')}
                    />
                  }
                  label={
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      sx={{ cursor: 'pointer', userSelect: 'none', paddingRight: 2 }}
                    >
                      View
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  sx={{ m: 0, fontSize: '14px' }}
                  value={modules[key].delete === 1}
                  control={
                    <Switch
                      checked={modules[key].delete === 1}
                      color="primary"
                      name="delete"
                      onChange={() => onChangePermission(key, 'delete')}
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
