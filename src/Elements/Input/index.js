import React, { forwardRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  FormControl,
  FormHelperText,
  InputBase,
  useTheme,
  FormLabel,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import moment from 'moment';

const InputRoot = styled(InputBase)(({ theme, ownerState }) => {
  const { palette, functions, typography, borders, boxShadows } = theme;
  const { size, error, success, iconDirection, disabled, darkMode, type } = ownerState;

  const { inputColors, grey, white, transparent, info, text, dark } = palette;
  const { inputBoxShadow } = boxShadows;
  const { pxToRem, boxShadow } = functions;
  const { size: fontSize } = typography;
  const { borderRadius } = borders;

  const smallStyles = () => ({
    fontSize: fontSize.xs,
    padding: `${pxToRem(4)} ${pxToRem(12)}`
  });

  const largeStyles = () => ({
    padding: pxToRem(12)
  });

  const errorStyles = () => ({
    backgroundImage:
      type === 'password' || type === 'date'
        ? ''
        : "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`
  });

  const successStyles = () => ({
    backgroundImage:
      type === 'password' || type === 'date'
        ? ''
        : "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%2366d432' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`
  });

  const withIconStyles = () => ({
    borderColor: transparent.main,
    borderRadius: borderRadius.md
  });

  let borderColor = inputColors.borderColor.main;
  let boxShadowValue = inputBoxShadow;
  let focusedBorderColor = info.main;

  if (error) {
    borderColor = inputColors.error;
    focusedBorderColor = inputColors.error;
    boxShadowValue = `${boxShadow([0, 3], [9, 0], inputColors.error, 0)}, ${boxShadow(
      [3, 4],
      [8, 0],
      inputColors.error,
      0.1
    )}`;
  } else if (success) {
    borderColor = inputColors.success;
    focusedBorderColor = inputColors.success;
    boxShadowValue = `${boxShadow([0, 3], [9, 0], inputColors.success, 0)}, ${boxShadow(
      [3, 4],
      [8, 0],
      inputColors.success,
      0.1
    )}`;
  }

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : white.main,
    borderColor,
    pointerEvents: disabled ? 'none' : 'auto',
    ...(size === 'small' && smallStyles()),
    ...(size === 'large' && largeStyles()),
    ...(error && errorStyles()),
    ...(success && successStyles()),
    ...((iconDirection === 'left' || iconDirection === 'right') && withIconStyles()),

    input: {
      padding: 0,
      color: darkMode ? white.main : dark.main,

      '::placeholder': {
        color: `${darkMode ? white.main : text.main} !important`
      }
    },

    '&.Mui-focused': {
      outline: 0,
      borderColor: focusedBorderColor,
      boxShadow: boxShadowValue
    },

    '&.MuiInputBase-multiline': {
      padding: `${pxToRem(10)} ${pxToRem(12)}`
    }
  };
});

const MyFormHelperText = ({ errorText }) => {
  const theme = useTheme();

  return (
    <FormHelperText sx={{ mr: 0, ml: 0, color: theme.palette.error.main }}>
      {errorText || ' '}
    </FormHelperText>
  );
};

// eslint-disable-next-line react/display-name
const TextField = forwardRef(
  (
    {
      size,
      error,
      success,
      disabled,
      errorText,
      errorFalse,
      label = '',
      type,
      inputProps,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
      <FormControl sx={{ width: '100%' }}>
        <FormLabel>{label}</FormLabel>
        <InputRoot
          {...rest}
          type={showPassword ? 'text' : type}
          inputProps={
            type === 'date'
              ? {
                  min: rest.value,
                  max: moment().format('YYYY-MM-DD'),
                  ...inputProps
                }
              : {}
          }
          endAdornment={
            type === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : null
          }
          ref={ref}
          ownerState={{ size, error, success, disabled, type }}
        />
        {!errorFalse && <MyFormHelperText errorText={errorText} />}
      </FormControl>
    );
  }
);

TextField.defaultProps = {
  size: 'medium',
  error: false,
  success: false,
  disabled: false
};

export default TextField;
