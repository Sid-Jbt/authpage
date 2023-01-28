import { styled } from '@mui/material';
import Button from 'Elements/Button';
import Box from 'Elements/Box';
import { createContext, forwardRef, useContext, useMemo } from 'react';

const PaginationItemRoot = styled(Button)(({ theme, ownerState }) => {
  const { borders, functions, typography, palette } = theme;
  const { variant, paginationSize, active } = ownerState;

  const { borderColor } = borders;
  const { pxToRem } = functions;
  const { fontWeightRegular, size: fontSize } = typography;
  const { light } = palette;

  let sizeValue = pxToRem(36);

  if (paginationSize === 'small') {
    sizeValue = pxToRem(30);
  } else if (paginationSize === 'large') {
    sizeValue = pxToRem(46);
  }

  return {
    borderColor,
    margin: `0 ${pxToRem(2)}`,
    pointerEvents: active ? 'none' : 'auto',
    fontWeight: fontWeightRegular,
    fontSize: fontSize.sm,
    width: sizeValue,
    minWidth: sizeValue,
    height: sizeValue,
    minHeight: sizeValue,

    '&:hover, &:focus, &:active': {
      transform: 'none',
      boxShadow: (variant !== 'gradient' || variant !== 'contained') && 'none !important',
      opacity: '1 !important'
    },

    '&:hover': {
      backgroundColor: light.main,
      borderColor
    }
  };
});

const Context = createContext();

const DataTablePagination = forwardRef(
  ({ item, variant, color, size, active, children, ...rest }, ref) => {
    const context = useContext(Context);
    const paginationSize = context ? context.size : null;
    const value = useMemo(() => ({ variant, color, size }), [variant, color, size]);

    return (
      <Context.Provider value={value}>
        {item ? (
          <PaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : 'outlined'}
            color={active ? context.color : 'secondary'}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </PaginationItemRoot>
        ) : (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: 'none' }}
          >
            {children}
          </Box>
        )}
      </Context.Provider>
    );
  }
);

DataTablePagination.defaultProps = {
  item: false,
  variant: 'gradient',
  color: 'info',
  size: 'medium',
  active: false
};

export default DataTablePagination;
