import { forwardRef } from 'react';
import Select from 'react-select';
import colors from 'Theme/base/colors';
import styles from './styles';

const CustomSelect = forwardRef(({ size, error, success, ...rest }, ref) => {
  const { light } = colors;

  return (
    <Select
      {...rest}
      ref={ref}
      styles={styles(size, error, success)}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: light.main,
          primary: light.main
        }
      })}
    />
  );
});

CustomSelect.defaultProps = {
  size: 'medium',
  error: false,
  success: false
};

export default CustomSelect;
