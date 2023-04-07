import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { FormControlLabel, Grid, RadioGroup, Radio, useTheme, FormLabel } from '@mui/material';
import Icon from '@mui/material/Icon';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import team2 from 'Assets/Images/team-4-800x800.jpg';
import { Edit } from '@mui/icons-material';
import { keyDownTypeNumber, keyDownValidation } from 'Helpers/Global';

const Basic = ({ role, props }) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props;
  const theme = useTheme();
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [gender, setGender] = useState('male');
  const inputFile = useRef(null);

  useEffect(() => {
    if (values !== null) {
      setGender(values.hasOwnProperty('gender') ? values.gender !== null && values.gender : 'male');
      setProfilePicUrl(
        values.hasOwnProperty('profilePic')
          ? values.profilePic !== null && URL.createObjectURL(values.profilePic)
          : ''
      );
    }
  }, []);

  const profilePicUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setFieldValue('profilePic', e.target.files[0]);
    setProfilePicUrl(url);
  };

  const onClickGender = (genderValue) => {
    setGender(genderValue);
    setFieldValue('gender', genderValue);
  };

  return (
    <Box>
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
                <Box>
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
                    errorText={errors.firstName && touched.firstName && errors.firstName}
                    error={errors.firstName && touched.firstName}
                    success={!errors.firstName && touched.firstName}
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box>
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
                    errorText={errors.lastName && touched.lastName && errors.lastName}
                    error={errors.lastName && touched.lastName}
                    success={!errors.lastName && touched.lastName}
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                  />
                </Box>
              </Grid>
              {role !== 'admin' && (
                <>
                  <Grid item xs={12} md={5}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="Alec"
                        size="medium"
                        fullWidth
                        id="fatherName"
                        name="fatherName"
                        label="Middle Name"
                        value={values.fatherName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(evt) =>
                          keyDownValidation.includes(evt.key) && evt.preventDefault()
                        }
                      />
                    </Box>
                  </Grid>
                  {/*  <Grid item xs={12} md={5}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="eg. Development"
                        size="medium"
                        fullWidth
                        id="department"
                        name="department"
                        label="Department"
                        value={values.department}
                        disabled
                      />
                    </Box>
                  </Grid> */}
                  <Grid item xs={12} md={5}>
                    <Box>
                      <Input
                        type="text"
                        placeholder="ex. Web Developer"
                        size="medium"
                        fullWidth
                        id="designation"
                        name="designation"
                        label="Title"
                        value={values.designation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(evt) =>
                          keyDownValidation.includes(evt.key) && evt.preventDefault()
                        }
                      />
                    </Box>
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={5}>
                <Box>
                  <Input
                    type="date"
                    placeholder="Date Of Birth"
                    size="medium"
                    fullWidth
                    id="dob"
                    name="dob"
                    label="Date Of Birth"
                    value={moment(values.dob).format('YYYY-MM-DD')}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box>
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
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // errorText={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                    // error={errors.phoneNumber && touched.phoneNumber}
                    // success={!errors.phoneNumber && touched.phoneNumber}
                    onKeyDown={(evt) => keyDownTypeNumber.includes(evt.key) && evt.preventDefault()}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box>
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
                    value={values.alternatePhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    /*  errorText={
                      errors.alternatePhone && touched.alternatePhone && errors.alternatePhone
                    }
                    error={errors.alternatePhone && touched.alternatePhone}
                    success={!errors.alternatePhone && touched.alternatePhone} */
                    onKeyDown={(evt) => keyDownTypeNumber.includes(evt.key) && evt.preventDefault()}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    sx={{ p: 2, pt: 0, pb: 0 }}
                    aria-label="font-family"
                    name="gender"
                    value={gender}
                    onChange={(event) => onClickGender(event.target.value)}
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
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Basic;
