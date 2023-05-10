import { forwardRef } from 'react';
import Select from 'react-select';
import colors from 'Theme/base/colors';
import { FormControl, FormLabel } from '@mui/material';
import styles from './styles';

const CustomSelect = forwardRef(({ label, size, error, success, isDisabled, ...rest }, ref) => {
  const { light } = colors;

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel>{label}</FormLabel>
      <Select
        {...rest}
        ref={ref}
        isDisabled={isDisabled}
        styles={styles(size, error, success, isDisabled)}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: light.main,
            primary: light.main
          }
        })}
      />
    </FormControl>
  );
});

CustomSelect.defaultProps = {
  size: 'medium',
  error: false,
  success: false
};

export default CustomSelect;
