import { styled, Box, Fade } from '@mui/material';
import CustomBox from 'Elements/Box';
import { useState } from 'react';

const AlertCloseIcon = styled('span')(({ theme }) => {
  const { palette, typography, functions, transitions } = theme;

  const { white } = palette;
  const { size, fontWeightMedium } = typography;
  const { pxToRem } = functions;

  return {
    color: white.main,
    fontSize: size.xl,
    padding: `${pxToRem(9)} ${pxToRem(6)} ${pxToRem(8)}`,
    marginLeft: pxToRem(40),
    fontWeight: fontWeightMedium,
    opacity: 0.9,
    cursor: 'pointer',
    lineHeight: 0,
    transition: transitions.create('opacity', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter
    }),

    '&:hover': {
      opacity: 1
    }
  };
});

const AlertRoot = styled(Box)(({ theme, ownerState }) => {
  const { palette, typography, borders, functions } = theme;
  const { color } = ownerState;

  const { white, alertColors } = palette;
  const { fontSizeRegular, fontWeightMedium } = typography;
  const { borderWidth, borderRadius } = borders;
  const { pxToRem, linearGradient } = functions;

  const backgroundImageValue = alertColors[color]
    ? linearGradient(alertColors[color].main, alertColors[color].state)
    : linearGradient(alertColors.info.main, alertColors.info.state);

  const borderValue = alertColors[color]
    ? `${borderWidth[1]} solid ${alertColors[color].border}`
    : `${borderWidth[1]} solid ${alertColors.info.border}`;

  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: pxToRem(60),
    backgroundImage: backgroundImageValue,
    color: white.main,
    position: 'relative',
    padding: pxToRem(16),
    marginBottom: pxToRem(16),
    border: borderValue,
    borderRadius: borderRadius.md,
    fontSize: fontSizeRegular,
    fontWeight: fontWeightMedium
  };
});

const Alert = ({ color, dismissible, children, ...rest }) => {
  const [alertStatus, setAlertStatus] = useState('mount');

  const handleAlertStatus = () => setAlertStatus('fadeOut');

  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <AlertRoot ownerState={{ color }} {...rest}>
        <CustomBox display="flex" alignItems="center" color="white">
          {children}
        </CustomBox>
        {dismissible ? (
          <AlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</AlertCloseIcon>
        ) : null}
      </AlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === 'mount':
      return alertTemplate();
    case alertStatus === 'fadeOut':
      setTimeout(() => setAlertStatus('unmount'), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
};

Alert.defaultProps = {
  color: 'info',
  dismissible: false
};

export default Alert;
