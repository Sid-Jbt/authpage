import React, { useEffect, useState } from 'react';
import { FormControlLabel, Grid, RadioGroup, Radio, useTheme, FormLabel } from '@mui/material';
import moment from 'moment';
import Box from 'Elements/Box';
import Input from 'Elements/Input';
import { useSelector } from 'react-redux';

const PersonalDetails = ({ props, employeeProfileDetails, isEdit }) => {
  const { role } = useSelector((state) => state.route);
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props;
  const theme = useTheme();

  const [gender, setGender] = useState('male');

  useEffect(() => {
    if (employeeProfileDetails !== null) {
      Object.keys(employeeProfileDetails.profile).map((key) => {
        setFieldValue(
          key,
          employeeProfileDetails.profile[key] === null ? '' : employeeProfileDetails.profile[key]
        );
      });
      setGender(
        employeeProfileDetails.profile.gender === null
          ? 'male'
          : employeeProfileDetails.profile.gender
      );
    }
  }, [employeeProfileDetails]);

  return (
    <Grid container spacing={1} p={2}>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="Alen"
            size="large"
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.firstName && touched.firstName && errors.firstName}
            error={errors.firstName && touched.firstName}
            success={!errors.firstName && touched.firstName}
            disabled={!isEdit}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
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
            disabled={!isEdit}
          />
        </Box>
      </Grid>
      {role !== 'admin' && (
        <>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Input
                type="text"
                placeholder="Alec"
                size="large"
                fullWidth
                id="fatherName"
                name="fatherName"
                label="Father Name"
                value={values.fatherName}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.fatherName && touched.fatherName && errors.fatherName}
                error={errors.fatherName && touched.fatherName}
                success={!errors.fatherName && touched.fatherName}
                disabled={!isEdit}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Input
                type="text"
                placeholder="eg. Development"
                size="large"
                fullWidth
                id="department"
                name="department"
                label="Department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.department && touched.department && errors.department}
                error={errors.department && touched.department}
                success={!errors.department && touched.department}
                disabled={!isEdit}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Input
                type="text"
                placeholder="ex. Web Developer"
                size="large"
                fullWidth
                id="designation"
                name="designation"
                label="Designation"
                value={values.designation}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.designation && touched.designation && errors.designation}
                error={errors.designation && touched.designation}
                success={!errors.designation && touched.designation}
                disabled={!isEdit}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Input
                type="text"
                placeholder="Emp001"
                size="large"
                fullWidth
                id="employeeCode"
                name="employeeCode"
                label="Employee Code"
                value={values.employeeCode}
                disabled
              />
            </Box>
          </Grid>
        </>
      )}

      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="date"
            placeholder="Date Of Birth"
            size="large"
            fullWidth
            id="dob"
            name="dob"
            label="Date Of Birth"
            value={
              values.dob === null
                ? moment().format('YYYY-MM-DD')
                : moment(values.dob).format('YYYY-MM-DD')
            }
            onChange={handleChange}
            disabled={!isEdit}
          />
        </Box>
      </Grid>
      {role !== 'admin' && (
        <>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Input
                type="text"
                placeholder="Date Of Join"
                size="large"
                fullWidth
                id="dateOfJoin"
                name="dateOfJoin"
                label="Date Of Join"
                disabled
                value={
                  values.dateOfJoin === null
                    ? moment().format('YYYY-MM-DD')
                    : moment(values.dateOfJoin).format('YYYY-MM-DD')
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Input
                type="text"
                placeholder="Date Of Leave"
                size="large"
                fullWidth
                id="dol"
                name="dol"
                label="Date Of Leave"
                disabled
                value={
                  values.dol === null
                    ? moment().format('YYYY-MM-DD')
                    : moment(values.dol).format('YYYY-MM-DD')
                }
              />
            </Box>
          </Grid>
        </>
      )}
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="number"
            placeholder="+91 925 532 5324"
            size="large"
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            minLength="9"
            maxLength="14"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
            error={errors.phoneNumber && touched.phoneNumber}
            success={!errors.phoneNumber && touched.phoneNumber}
            disabled={!isEdit}
            onKeyDown={(evt) => ['e', 'E', '-', '.'].includes(evt.key) && evt.preventDefault()}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="number"
            placeholder="+91 925 532 5325"
            size="large"
            fullWidth
            id="alternatePhone"
            name="alternatePhone"
            label="Alternative Number"
            value={values.alternatePhone}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.alternatePhone && touched.alternatePhone && errors.alternatePhone}
            error={errors.alternatePhone && touched.alternatePhone}
            success={!errors.alternatePhone && touched.alternatePhone}
            disabled={!isEdit}
            onKeyDown={(evt) => ['e', 'E', '-', '.'].includes(evt.key) && evt.preventDefault()}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
            size="large"
            fullWidth
            id="permanentAddress"
            name="permanentAddress"
            label="Permanent Address"
            value={values.permanentAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={
              errors.permanentAddress && touched.permanentAddress && errors.permanentAddress
            }
            error={errors.permanentAddress && touched.permanentAddress}
            success={!errors.permanentAddress && touched.permanentAddress}
            disabled={!isEdit}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
            size="large"
            fullWidth
            id="presentAddress"
            name="presentAddress"
            label="Present Address"
            value={values.presentAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.presentAddress && touched.presentAddress && errors.presentAddress}
            error={errors.presentAddress && touched.presentAddress}
            success={!errors.presentAddress && touched.presentAddress}
            disabled={!isEdit}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          row
          sx={{ p: 2, pt: 0, pb: 0 }}
          aria-label="font-family"
          value={gender}
          onChange={(event) => {
            setGender(event.target.value);
          }}
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 28 },
              '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
            }}
            defaultChecked
            disabled={!isEdit}
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 28 },
              '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
            }}
            disabled={!isEdit}
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

export default PersonalDetails;
