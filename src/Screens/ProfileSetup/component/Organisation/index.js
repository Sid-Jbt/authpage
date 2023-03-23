import React, { useRef, useState } from 'react';
import { FormControl, FormLabel, Grid } from '@mui/material';
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
import CropperImage from 'Components/ImageCrop';
import DialogMenu from 'Elements/Dialog';

const Organisation = (props) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props.props;
  const smallLogoInputFile = useRef(null);
  const largeLogoInputFile = useRef(null);
  const [workingHours, setWorkingHours] = useState(WorkingHours[0]);
  const [smallLogo, setSmallLogo] = useState('');
  const [largeLogo, setLargeLogo] = useState('');
  const [logoType, setLogoType] = useState('');
  const [cropClose, setCropClose] = useState(false);

  const handleImageChange = (e, type) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      setCropClose(true);
      if (type === 'small') {
        setLogoType('small');
        setSmallLogo(reader.result);
      } else {
        setLogoType('large');
        setLargeLogo(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            Let&apos;s start with the organisation information
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Let us know more about your organisation.
        </Typography>
      </Box>

      <Box mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} sm={3} lg={4} container justifyContent="center">
            <Box position="relative" height="max-content" mx="auto">
              <Typography variant="h6" fontWeight="small" color="label" textAlign="center">
                Small Logo (1x1 px)
              </Typography>
              <Box>
                <input
                  ref={smallLogoInputFile}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, 'small')}
                />
                <Avatar
                  src={smallLogo === '' ? team2 : smallLogo}
                  alt="small picture"
                  size="xxl"
                  variant="rounded"
                />
                <Box alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                  <Button
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
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} lg={4} container>
            <Box position="relative" height="max-content" mx="auto">
              <Typography variant="h6" fontWeight="small" color="label" textAlign="center">
                Large Logo (16x9 px)
              </Typography>
              <Box>
                <input
                  ref={largeLogoInputFile}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, 'large')}
                />
                <Avatar
                  src={largeLogo === '' ? team2 : largeLogo}
                  alt="large picture"
                  size="xxl"
                  variant="rounded"
                />
                <Box alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                  <Button
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
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
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
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <Box>
              <Input
                type="text"
                placeholder="1303, Shivalik Shilp, Iskcon Cross Rd Ahmedabad"
                size="medium"
                fullWidth
                id="organizationAddress"
                name="location"
                label="Organisation Address"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.location && touched.location && errors.location}
                error={errors.location && touched.location}
                success={!errors.location && touched.location}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DialogMenu
        isOpen={cropClose}
        onClose={() => setCropClose(false)}
        dialogContent={
          <CropperImage
            src={logoType === 'large' ? largeLogo : smallLogo}
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
    </>
  );
};

export default Organisation;
