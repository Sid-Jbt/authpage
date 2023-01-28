import { Close } from '@mui/icons-material';
import { styled, Icon, Fade, IconButton, Divider } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import typography from 'Theme/base/typography';

const RootSnackbar = styled(Icon)(({ theme, ownerState }) => {
  // eslint-disable-next-line no-shadow
  const { palette, functions, typography } = theme;
  const { color, bgWhite } = ownerState;

  const { white, transparent, gradients } = palette;
  const { pxToRem, linearGradient } = functions;
  const { size } = typography;

  let backgroundImageValue;

  if (bgWhite) {
    backgroundImageValue = gradients[color]
      ? linearGradient(gradients[color].main, gradients[color].state)
      : linearGradient(gradients.info.main, gradients.info.state);
  } else if (color === 'light') {
    backgroundImageValue = linearGradient(gradients.dark.main, gradients.dark.state);
  }

  return {
    backgroundImage: backgroundImageValue,
    WebkitTextFillColor: bgWhite || color === 'light' ? transparent.main : white.main,
    WebkitBackgroundClip: 'text',
    marginRight: pxToRem(8),
    fontSize: size.lg,
    transform: `translateY(${pxToRem(-2)})`
  };
});

const Snackbar = ({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) => {
  const { size } = typography;
  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = 'dark';
    dividerColor = false;
  } else if (color === 'light') {
    titleColor = 'dark';
    dateTimeColor = 'text';
    dividerColor = false;
  } else {
    titleColor = 'white';
    dateTimeColor = 'white';
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      {...rest}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <Box
        variant={bgWhite ? 'contained' : 'gradient'}
        bgColor={bgWhite ? 'white' : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" color="dark" p={1.5}>
          <Box display="flex" alignItems="center" lineHeight={0}>
            <RootSnackbar fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </RootSnackbar>
            <Typography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" lineHeight={0}>
            <Typography variant="caption" color={dateTimeColor}>
              {dateTime}
            </Typography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  bgWhite || color === 'light' ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                cursor: 'pointer',
                marginLeft: 2,
                transform: 'translateY(-1px)'
              }}
              onClick={close}
            >
              <Close />
            </Icon>
          </Box>
        </Box>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <Box p={1.5} color={bgWhite || color === 'light' ? 'text' : 'white'} fontSize={size.sm}>
          {content}
        </Box>
      </Box>
    </Snackbar>
  );
};

Snackbar.defaultProps = {
  bgWhite: false,
  color: 'info'
};

export default Snackbar;
