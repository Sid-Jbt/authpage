import { forwardRef } from 'react';
import Typography from 'Elements/Typography';
import ProgressRoot from './ProgressRoot';

const Progress = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <Typography variant="button" fontWeight="medium" color="text">
        {value}%
      </Typography>
    )}
    <ProgressRoot
      {...rest}
      ref={ref}
      variant="determinate"
      value={value}
      ownerState={{ color, value, variant }}
    />
  </>
));

Progress.defaultProps = {
  variant: 'contained',
  color: 'info',
  value: 0,
  label: false
};

export default Progress;
