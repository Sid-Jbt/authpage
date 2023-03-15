import React, { useRef, useState } from 'react';
import { Card, FormControl, FormLabel, Grid } from '@mui/material';
import Input from 'Elements/Input';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import team2 from 'Assets/Images/team-4-800x800.jpg';
import Button from 'Elements/Button';
import Icon from '@mui/material/Icon';
import { Edit } from '@mui/icons-material';
import Select from 'Elements/Select';
import { WorkingHours } from 'Helpers/Global';

const Organisation = ({ isEdit, props }) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props;
  const smallLogoInputFile = useRef(null);
  const largeLogoInputFile = useRef(null);
  const [workingHours, setWorkingHours] = useState(WorkingHours[0]);
  const [smallLogo, setSmallLogo] = useState('');
  const [largeLogo, setLargeLogo] = useState('');

  const onClickLogoUpload = (e, logo) => {
    const file = e.target.files[0];
    if (logo === 'small') {
      const url = URL.createObjectURL(file);
      setSmallLogo(url);
      setFieldValue('smallLogo', file);
    } else {
      const url = URL.createObjectURL(file);
      setLargeLogo(url);
      setFieldValue('largeLogo', file);
    }
  };

  return (
    <Card>
      <Grid container alignItems="center" justifyContent="center" spacing={2} p={2}>
        <Grid container item xs={12} md="auto" spacing={2}>
          <Grid item xs={12} justifyContent="center">
            <Typography variant="h6" fontWeight="small" color="label" textAlign="center">
              Large Logo
            </Typography>
            <Box position="relative">
              <input
                ref={largeLogoInputFile}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onClickLogoUpload(e, 'large')}
              />
              <Avatar
                src={largeLogo === '' ? team2 : largeLogo}
                alt="large picture"
                size="xxl"
                variant="rounded"
                sx={{ m: 'auto' }}
              />
              {isEdit && (
                <Button
                  sx={{ position: 'absolute', bottom: 0, right: 0, mr: 7, mb: -1 }}
                  variant="gradient"
                  color="light"
                  component="label"
                  onClick={() => largeLogoInputFile.current && largeLogoInputFile.current.click()}
                  iconOnly
                >
                  <Icon>
                    <Edit />
                  </Icon>
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <Typography variant="h6" fontWeight="small" color="label" textAlign="center">
              Small Logo
            </Typography>
            <Box position="relative">
              <input
                ref={smallLogoInputFile}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onClickLogoUpload(e, 'small')}
              />
              <Avatar
                src={smallLogo === '' ? team2 : smallLogo}
                alt="small picture"
                size="xxl"
                variant="rounded"
                sx={{ m: 'auto' }}
              />
              {isEdit && (
                <Button
                  sx={{ position: 'absolute', bottom: 0, right: 0, mr: 7, mb: -1 }}
                  variant="gradient"
                  color="light"
                  component="label"
                  onClick={() => smallLogoInputFile.current && smallLogoInputFile.current.click()}
                  iconOnly
                >
                  <Icon>
                    <Edit />
                  </Icon>
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={8} columnSpacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel> Select Working Hours </FormLabel>
              <Select
                name="workingHours"
                value={workingHours}
                options={WorkingHours}
                onChange={(selectedHour) => {
                  setWorkingHours(selectedHour);
                  setFieldValue('workingHours', selectedHour.value);
                }}
                onBlur={handleBlur}
                isDisabled={!isEdit}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              type="text"
              placeholder="Organisation Name"
              size="medium"
              fullWidth
              id="organisationName"
              name="organisationName"
              label="Organisation Name"
              value={values.organisationName}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={
                errors.organisationName && touched.organisationName && errors.organisationName
              }
              error={errors.organisationName && touched.organisationName}
              success={!errors.organisationName && touched.organisationName}
              disabled={!isEdit}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="text"
              placeholder="1303, Shivalik Shilp, Iskcon Cross Rd Ahmedabad"
              size="medium"
              fullWidth
              id="organizationAddress"
              name="organizationAddress"
              label="Organisation Address"
              value={values.organizationAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={
                errors.organizationAddress &&
                touched.organizationAddress &&
                errors.organizationAddress
              }
              error={errors.organizationAddress && touched.organizationAddress}
              success={!errors.organizationAddress && touched.organizationAddress}
              disabled={!isEdit}
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Organisation;
