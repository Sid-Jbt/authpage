import React, { useRef, useState } from 'react';
import { Card, FormControl, FormLabel, Grid } from '@mui/material';
import Input from 'Elements/Input';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import Button from 'Elements/Button';
import Icon from '@mui/material/Icon';
import { Edit } from '@mui/icons-material';
import Select from 'Elements/Select';
import { keyDownValidation, WorkingHours } from 'Helpers/Global';
import { DialogContent } from 'Components/Dialog';
import CropperImage from 'Components/ImageCrop';
import DialogMenu from 'Elements/Dialog';
import smallFile from '../../../Assets/Images/logo.jpeg';
import largeFile from '../../../Assets/Images/jbt-full-logo.svg';

const Organisation = ({ isEdit, props }) => {
  const { values, handleChange, handleBlur, setFieldValue } = props;
  const smallLogoInputFile = useRef(null);
  const largeLogoInputFile = useRef(null);
  const [smallLogo, setSmallLogo] = useState('');
  const [largeLogo, setLargeLogo] = useState('');
  const [logoType, setLogoType] = useState('');
  const [cropperImage, setCropperImage] = useState('');
  const [cropClose, setCropClose] = useState(false);
  const onClickLogoUpload = (e, type) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      setCropClose(true);
      if (type === 'small') {
        setLogoType('small');
        setCropperImage(reader.result);
      } else {
        setLogoType('large');
        setCropperImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Card sx={{ overflow: 'visible' }}>
      <Grid container spacing={2} p={2} alignItems="center" justifyContent="center">
        <Grid container item spacing={2} xs={12} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="medium" textAlign="center">
              Organistation Logo
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box position="relative" size="large">
              <input
                ref={largeLogoInputFile}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onClickLogoUpload(e, 'large')}
              />
              <Avatar
                src={
                  !values.largeLogo ? largeFile : largeLogo === '' ? values.largeLogo : largeLogo
                }
                alt="large picture"
                variant="rounded"
                size="xxl"
                sx={{ m: 'auto' }}
              />
              {isEdit && (
                <Button
                  sx={{ position: 'absolute', bottom: 0, right: 0, mr: 2, mb: -1 }}
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
          <Grid item xs={12} md={2} justifyContent="center">
            <Box position="relative">
              <input
                ref={smallLogoInputFile}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onClickLogoUpload(e, 'small')}
              />
              <Avatar
                src={
                  !values.smallLogo ? smallFile : smallLogo === '' ? values.smallLogo : smallLogo
                }
                alt="small picture"
                size="xxl"
                variant="rounded"
                sx={{ m: 'auto' }}
              />
              {isEdit && (
                <Button
                  sx={{ position: 'absolute', bottom: 0, right: 0, mr: 2, mb: -1 }}
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
        <Grid item xs={12} md={6} lg={4}>
          <Input
            type="text"
            placeholder="Organisation Name"
            size="medium"
            fullWidth
            id="organisationName"
            name="organisationName"
            label="Name"
            value={values.organisationName}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!isEdit}
            onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} pt={0}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>Working Hours</FormLabel>
            <Select
              name="workingHours"
              value={
                WorkingHours.find((o) => o.value === values.workingHours) || values.workingHours
              }
              options={WorkingHours}
              onChange={(value) => {
                setFieldValue('workingHours', value);
              }}
              onBlur={handleBlur}
              isDisabled={!isEdit}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <Input
            type="text"
            placeholder="1303, Shivalik Shilp, Iskcon Cross Rd Ahmedabad"
            size="medium"
            fullWidth
            id="location"
            name="location"
            label="Current Address"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!isEdit}
          />
        </Grid>
      </Grid>
      <DialogMenu
        isOpen={cropClose}
        onClose={() => {
          setCropClose(false);
          if (logoType === 'large') {
            setLargeLogo(largeLogo);
            setFieldValue('largeLogo', largeLogo);
          } else {
            setSmallLogo(smallLogo);
            setFieldValue('smallLogo', smallLogo);
          }
        }}
        dialogContent={
          <DialogContent
            customContent={
              <CropperImage
                src={cropperImage}
                imageType={logoType}
                getCroppedFile={(file, image, type) => {
                  if (type === 'large') {
                    setLargeLogo(image);
                    setFieldValue('largeLogo', file);
                  } else {
                    setSmallLogo(image);
                    setFieldValue('smallLogo', file);
                  }
                  setCropClose(false);
                }}
              />
            }
          />
        }
      />
    </Card>
  );
};

export default Organisation;
