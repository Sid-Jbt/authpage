import { Card, Icon, Link } from '@mui/material';
import Button from 'Elements/Button';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { ArrowForward } from '@mui/icons-material';

const CompleteProfileCard = ({ color, image, title, description, action }) => (
  <Card raised sx={{ p: 2 }}>
    <Box
      sx={({
        functions: { linearGradient, rgba },
        palette: { gradients },
        borders: { borderRadius }
      }) => ({
        backgroundImage: gradients[color]
          ? `${linearGradient(
              rgba(gradients[color].main, 0.8),
              rgba(gradients[color].state, 0.8)
            )}, url(${image})`
          : `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
            )}, url(${image})`,
        backgroundSize: 'cover',
        borderRadius: borderRadius.lg,
        p: 2
      })}
    >
      <Box mb={2}>
        <Typography variant="h6" color="white" fontWeight="bold" textTransform="capitalize">
          {title}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body2" color="white">
          {description}
        </Typography>
      </Box>
      {action.type === 'internal' ? (
        <Button component={Link} to={action.route} variant="outlined" color="white" circular>
          {action.label} &nbsp;
          <Icon>
            <ArrowForward />
          </Icon>
        </Button>
      ) : (
        <Button
          component="a"
          href={action.route}
          target="_blank"
          rel="noreferrer"
          variant="outlined"
          color="white"
          circular
        >
          {action.label} &nbsp;
          <Icon>
            <ArrowForward />
          </Icon>
        </Button>
      )}
    </Box>
  </Card>
);

CompleteProfileCard.defaultProps = {
  color: 'primary'
};

export default CompleteProfileCard;
