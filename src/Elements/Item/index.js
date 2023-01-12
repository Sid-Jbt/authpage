import { MenuItem } from '@mui/material';
import { forwardRef } from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { WatchLater } from '@mui/icons-material';

export function menuItem(theme) {
  const { palette, borders, transitions } = theme;

  const { secondary, light } = palette;
  const { borderRadius } = borders;

  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    color: secondary.main,
    py: 1,
    px: 2,
    borderRadius: borderRadius.md,
    transition: transitions.create('background-color', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard
    }),

    '&:not(:last-child)': {
      mb: 1.25
    },

    '&:hover': {
      backgroundColor: light.main
    }
  };
}

export function menuImage(theme, ownerState) {
  const { functions, palette, borders } = theme;
  const { color } = ownerState;

  const { linearGradient } = functions;
  const { gradients } = palette;
  const { borderRadius } = borders;

  return {
    display: 'grid',
    placeItems: 'center',
    backgroundImage: gradients[color]
      ? linearGradient(gradients[color].main, gradients[color].state)
      : linearGradient(gradients.dark.main, gradients.dark.state),

    '& img': {
      width: '100%',
      borderRadius: borderRadius.lg
    }
  };
}

const NotificationItem = forwardRef(({ color, image, title, date, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <Box
      width="2.25rem"
      height="2.25rem"
      mt={0.25}
      mr={2}
      mb={0.25}
      borderRadius="lg"
      sx={(theme) => menuImage(theme, { color })}
    >
      {image}
    </Box>
    <Box>
      <Typography variant="button" textTransform="capitalize" fontWeight="regular">
        <strong>{title[0]}</strong> {title[1]}
      </Typography>
      <Typography
        variant="caption"
        color="secondary"
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 0.5
        }}
      >
        <Typography variant="button" color="secondary">
          <WatchLater
            sx={{
              lineHeight: 1.2,
              mr: 0.5
            }}
          />
        </Typography>
        {date}
      </Typography>
    </Box>
  </MenuItem>
));

NotificationItem.defaultProps = {
  color: 'dark'
};

export default NotificationItem;
