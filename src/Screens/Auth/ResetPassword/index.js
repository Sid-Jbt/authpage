import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Check, Error } from '@mui/icons-material';
import { resetPasswordSchema } from 'Helpers/ValidationSchema';
import { defaultPattern, getDefaultPattern } from 'Routes/routeConfig';
import { SnackbarContext } from 'Context/SnackbarProvider';
import { companyResetPassword } from 'APIs/API';

const RestPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (formData, actions) => {
    formData.token = token;
    const resetPasswordRes = await companyResetPassword(formData);
    const { status, message } = resetPasswordRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      actions.setSubmitting(false);
      navigate(getDefaultPattern());
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Error color="white" />,
        color: 'error',
        open: true
      });
    }
  };

  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        Create new password
      </Typography>
      <Formik
        initialValues={{ password: '', resetPassword: '' }}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        validationSchema={resetPasswordSchema}
      >
        {(props) => {
          const { values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Box mt={2}>
                <Input
                  name="password"
                  placeholder="New Password"
                  size="large"
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
              <Box mt={0.5}>
                <Input
                  name="resetPassword"
                  placeholder="Confirm Password"
                  size="large"
                  value={values.resetPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.resetPassword && touched.resetPassword && errors.resetPassword}
                  error={errors.resetPassword && touched.resetPassword}
                  success={!errors.resetPassword && touched.resetPassword}
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
              <Box mt={1}>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  Reset Password
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
      <Box mt={3} textAlign="center">
        <Typography variant="button" color="text" fontWeight="regular">
          Already have an account?&nbsp;
          <Typography
            component={Link}
            to={defaultPattern}
            variant="button"
            color="info"
            fontWeight="medium"
          >
            Sign In
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default RestPassword;
