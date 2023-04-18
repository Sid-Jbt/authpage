import { styled, Button } from '@mui/material';
import { forwardRef } from 'react';

const ButtonRoot = styled(Button)(({ theme, ownerState }) => {
  const { palette, functions, borders } = theme;
  const { color, variant, size, circular, iconOnly } = ownerState;

  const { white, dark, transparent, gradients } = palette;
  const { boxShadow, linearGradient, pxToRem, rgba } = functions;
  const { borderRadius } = borders;

  const containedStyles = () => {
    const backgroundValue = palette[color] ? palette[color].main : white.main;
    const focusedBackgroundValue = palette[color] ? palette[color].focus : white.focus;
    const boxShadowValue = palette[color]
      ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
      : boxShadow([0, 0], [0, 3.2], dark.main, 0.5);

    let colorValue = white.main;

    if (color === 'white' || !palette[color]) {
      colorValue = gradients.dark.main;
    } else if (color === 'light') {
      colorValue = gradients.dark.state;
    }

    let focusedColorValue = white.main;

    if (color === 'white') {
      focusedColorValue = gradients.dark.main;
    } else if (color === 'primary' || color === 'error' || color === 'dark') {
      focusedColorValue = white.main;
    }

    return {
      background: backgroundValue,
      color: colorValue,

      '&:hover': {
        backgroundColor: backgroundValue
      },

      '&:focus:not(:hover)': {
        backgroundColor: focusedBackgroundValue,
        boxShadow: boxShadowValue
      },

      '&:disabled': {
        backgroundColor: backgroundValue,
        color: focusedColorValue
      }
    };
  };

  const outlinedStyles = () => {
    const backgroundValue = color === 'white' ? rgba(white.main, 0.1) : transparent.main;
    const colorValue = palette[color] ? palette[color].main : white.main;
    const boxShadowValue = palette[color]
      ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
      : boxShadow([0, 0], [0, 3.2], white.main, 0.5);

    // border color value
    let borderColorValue = palette[color] ? palette[color].main : rgba(white.main, 0.75);

    if (color === 'white') {
      borderColorValue = rgba(white.main, 0.75);
    }

    return {
      background: backgroundValue,
      color: colorValue,
      borderColor: borderColorValue,

      '&:hover': {
        background: transparent.main,
        borderColor: colorValue
      },

      '&:focus:not(:hover)': {
        background: transparent.main,
        boxShadow: boxShadowValue
      },

      '&:active:not(:hover)': {
        backgroundColor: colorValue,
        color: white.main,
        opacity: 0.85
      },

      '&:disabled': {
        color: colorValue,
        borderColor: colorValue
      }
    };
  };

  const gradientStyles = () => {
    const backgroundValue =
      color === 'white' || !gradients[color]
        ? white.main
        : linearGradient(gradients[color].main, gradients[color].state);

    let colorValue = white.main;

    if (color === 'white') {
      colorValue = gradients.dark.main;
    } else if (color === 'light') {
      colorValue = gradients.dark.state;
    }

    return {
      background: backgroundValue,
      color: colorValue,

      '&:focus:not(:hover)': {
        boxShadow: 'none'
      },

      '&:disabled': {
        background: backgroundValue,
        color: colorValue
      }
    };
  };

  const textStyles = () => {
    const colorValue = palette[color] ? palette[color].main : white.main;
    const focusedColorValue = palette[color] ? palette[color].focus : white.focus;

    return {
      color: colorValue,

      '&:hover': {
        color: focusedColorValue
      },

      '&:focus:not(:hover)': {
        color: focusedColorValue
      }
    };
  };

  const circularStyles = () => ({
    borderRadius: borderRadius.section
  });

  const iconOnlyStyles = () => {
    let sizeValue = pxToRem(38);

    if (size === 'small') {
      sizeValue = pxToRem(25.4);
    } else if (size === 'large') {
      sizeValue = pxToRem(52);
    }

    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;

    if (size === 'small') {
      paddingValue = pxToRem(4.5);
    } else if (size === 'large') {
      paddingValue = pxToRem(16);
    }

    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,

      '& .material-icons': {
        marginTop: 0
      },

      '&:hover, &:focus, &:active': {
        transform: 'none'
      }
    };
  };

  return {
    ...(variant === 'contained' && containedStyles()),
    ...(variant === 'outlined' && outlinedStyles()),
    ...(variant === 'gradient' && gradientStyles()),
    ...(variant === 'text' && textStyles()),
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles())
  };
});

const CustomButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, disabled, ...rest }, ref) => (
    <ButtonRoot
      {...rest}
      ref={ref}
      color="primary"
      variant={variant === 'gradient' ? 'contained' : variant}
      size={size}
      disabled
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </ButtonRoot>
  )
);

CustomButton.defaultProps = {
  size: 'medium',
  variant: 'contained',
  color: 'white',
  circular: false,
  iconOnly: false
};

export default CustomButton;
