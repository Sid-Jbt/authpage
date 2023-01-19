import React, { useState } from 'react';
import {
  Card,
  Icon,
  MenuItem,
  Select,
  Grid,
  FormLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Add,
  ImportExportRounded,
  SearchRounded,
  ClearRounded,
  FilterListSharp,
  VisibilityOff,
  Visibility,
  Save
} from '@mui/icons-material';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import SideDrawer from 'Elements/SideDrawer';
import employeeListData from './data/employeeListData';
import { Formik } from 'formik';
import validationSchema from '../../Helpers/ValidationSchema';

const EmployeeList = () => {
  const { columns: prCols, rows: prRows } = employeeListData;
  const [role, setRole] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const renderAddEmployeeDialog = () => (
    <>
      <SideDrawer open={Boolean(isDialogOpen)} onClose={handleDialog} title="ADD NEW EMPLOYEE">
        <Formik
          enableReinitialize
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            empCode: '',
            dateOfJoin: '',
            dateOfLeave: ''
          }}
          onSubmit={(values) => {
            console.log('ON SUBMIT');
            console.log('values===========', values);
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} justifyContent="space-between">
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
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="Alen"
                        size="large"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.firstName && touched.firstName && errors.firstName}
                        error={errors.firstName && touched.firstName}
                        success={!errors.firstName && touched.firstName}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="Prior"
                        size="large"
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.lastName && touched.lastName && errors.lastName}
                        error={errors.lastName && touched.lastName}
                        success={!errors.lastName && touched.lastName}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Input
                        type="email"
                        placeholder="Email"
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
                        placeholder="Password"
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
                  <Grid item sm={12} md={4} lg={6}>
                    <Button
                      type="submit"
                      color="info"
                      variant="contained"
                      size="small"
                      sx={{ marginRight: '10px' }}
                    >
                      <Icon sx={{ mr: '2px' }}>
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

  return (
    <Card
      mb={3}
      sx={{
        background: ({ palette: { grey } }) => grey[100],
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
        boxShadow: ({ boxShadows: { md } }) => md
      }}
    >
      <Grid container alignItems="center" spacing={2} p={2} pb={0}>
        <Grid container item sm={12} alignItems="center" justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h3">Employee</Typography>
          </Grid>
          <Grid container item xs={6} justifyContent="end" sx={{ gap: 2 }}>
            <Button color="info" variant="contained" size="small" onClick={handleDialog}>
              <Icon>
                <Add />
              </Icon>
              Add
            </Button>
            <Button color="info" variant="contained" size="small">
              <Icon>
                <ImportExportRounded />
              </Icon>
              Export
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Icon>
            <FilterListSharp />
          </Icon>
          <Typography variant="h6">Filter</Typography>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input
            type="date"
            label="From Date"
            size="small"
            fullWidth
            id="fromDate"
            name="fromDate"
          />
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input type="date" label="To Date" size="small" fullWidth id="toDate" name="toDate" />
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input
            placeholder="Search"
            type="text"
            label="Search"
            size="small"
            fullWidth
            id="search"
            name="search"
          />
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>Select Role</FormLabel>
            <Select
              id="selectRole"
              value={role}
              onChange={handleChangeRole}
              displayEmpty
              renderValue={role !== '' ? undefined : () => 'All'}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="superAdmin">Super Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="developer">Developer</MenuItem>
              <MenuItem value="hR">HR</MenuItem>
              <MenuItem value="qA">QA</MenuItem>
              <MenuItem value="tester">Tester</MenuItem>
            </Select>
            <FormHelperText sx={{ mr: 0, ml: 0, color: 'red' }}> </FormHelperText>
          </FormControl>
        </Grid>
        <Grid
          item
          sm={12}
          md={8}
          lg={4}
          sx={({ breakpoints }) => ({
            [breakpoints.down('lg' && 'md')]: {
              marginBottom: 2
            }
          })}
        >
          <Button color="info" variant="contained" size="small" sx={{ marginRight: '10px' }}>
            <Icon sx={{ mr: '2px' }}>
              <SearchRounded />
            </Icon>
            Search
          </Button>
          <Button color="error" variant="contained" size="small">
            <Icon sx={{ mr: '2px' }}>
              <ClearRounded />
            </Icon>
            Clear
          </Button>
        </Grid>
      </Grid>
      <Table columns={prCols} rows={prRows} />
      {renderAddEmployeeDialog()}
    </Card>
  );
};

export default EmployeeList;
