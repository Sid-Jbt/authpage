import React, { useContext, useRef, useState } from 'react';
import moment from 'moment';
import { FormControlLabel, Grid, RadioGroup, Radio, useTheme, FormLabel } from '@mui/material';
import Icon from '@mui/material/Icon';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import team2 from 'Assets/Images/team-4-800x800.jpg';
import { CloseSharp, Edit } from '@mui/icons-material';
import { keyDownTypeNumber, keyDownValidation } from 'Helpers/Global';
import { SnackbarContext } from '../../../../Context/SnackbarProvider';

const Basic = ({ role, props }) => {
  const { values, handleChange, handleBlur, setFieldValue } = props;
  const theme = useTheme();
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const inputFile = useRef(null);
  const { setSnack } = useContext(SnackbarContext);

  const profilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file.size >= 4012368) {
      return setSnack({
        title: 'Size Error',
        message: 'Size should be less then 4mb',
        time: false,
        icon: <CloseSharp color="white" />,
        color: 'error',
        open: true
      });
    }
    const url = URL.createObjectURL(file);
    setFieldValue('profilePic', e.target.files[0]);
    setProfilePicUrl(url);
  };

  return (
    <>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            Let&apos;s start with the basic information
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Let us know more about you.
        </Typography>
      </Box>

      <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} container justifyContent="center">
            <Box position="relative" height="max-content" mx="auto">
              <Box>
                <input
                  ref={inputFile}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => profilePicUpload(e)}
                  name="profilePic"
                />
                <Avatar
                  src={profilePicUrl === '' ? team2 : profilePicUrl}
                  alt="profile picture"
                  size="xxl"
                  variant="rounded"
                  sx={{
                    borderStyle: 'groove',
                    img: {
                      objectFit: 'cover'
                    }
                  }}
                />
                <Box alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                  <Button
                    variant="gradient"
                    color="light"
                    component="label"
                    onClick={() => inputFile.current && inputFile.current.click()}
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
          <Grid item xs={12} sm={8}>
            <Grid container spacing={1} rowSpacing={0}>
              <Grid item xs={12} md={5}>
                <Input
                  type="text"
                  placeholder="Alen"
                  size="medium"
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorFalse
                  onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <Input
                  type="text"
                  placeholder="Prior"
                  size="medium"
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorFalse
                  onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                />
              </Grid>
              {!role && (
                <>
                  <Grid item xs={12} md={5}>
                    <Input
                      type="text"
                      placeholder="Alec"
                      size="medium"
                      fullWidth
                      id="fatherName"
                      name="fatherName"
                      label="Middle Name"
                      errorFalse
                      value={values.fatherName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={(evt) =>
                        keyDownValidation.includes(evt.key) && evt.preventDefault()
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Input
                      type="text"
                      placeholder="ex. Web Developer"
                      size="medium"
                      fullWidth
                      id="designation"
                      name="designation"
                      label="Title"
                      errorFalse
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={(evt) =>
                        keyDownValidation.includes(evt.key) && evt.preventDefault()
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={5}>
                <Input
                  type="date"
                  placeholder="Date Of Birth"
                  size="medium"
                  fullWidth
                  id="dob"
                  name="dob"
                  label="Date Of Birth"
                  errorFalse
                  value={moment(values.dob).format('YYYY-MM-DD')}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <Input
                  type="number"
                  placeholder="9255325324"
                  size="medium"
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  minLength="10"
                  maxLength="13"
                  errorFalse
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(evt) => keyDownTypeNumber.includes(evt.key) && evt.preventDefault()}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <Input
                  type="number"
                  placeholder="9255325325"
                  size="medium"
                  fullWidth
                  id="alternatePhone"
                  name="alternatePhone"
                  label="Alternative Number"
                  minLength="10"
                  maxLength="13"
                  errorFalse
                  value={values.alternatePhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(evt) => keyDownTypeNumber.includes(evt.key) && evt.preventDefault()}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  sx={{ p: 2, pt: 0, pb: 0 }}
                  aria-label="font-family"
                  name="gender"
                  value={values.gender}
                  onChange={(event) => setFieldValue('gender', event.target.value)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    sx={{
                      '& .MuiSvgIcon-root': { fontSize: 28 },
                      '& .MuiFormControlLabel-label': {
                        color: theme.palette.grey[900]
                      }
                    }}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    sx={{
                      '& .MuiSvgIcon-root': { fontSize: 28 },
                      '& .MuiFormControlLabel-label': {
                        color: theme.palette.grey[900]
                      }
                    }}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Basic;
