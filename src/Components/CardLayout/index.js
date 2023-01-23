import { Card, Icon, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';

const DetailedStaticsCard = ({
  bgColor,
  title,
  count,
  isPercentage = true,
  percentage,
  icon,
  direction
}) => (
  <Card>
    <Box bgColor={bgColor} variant="gradient">
      <Box p={2}>
        <Grid container>
          <Grid item xs={8}>
            <Box ml={direction === 'left' ? 2 : 0} lineHeight={1}>
              <Typography
                variant="button"
                color={bgColor === 'white' ? 'text' : 'white'}
                textTransform="uppercase"
                fontWeight="medium"
              >
                {title}
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={bgColor === 'white' ? 'dark' : 'white'}
                mb={1}
              >
                {count}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box
              variant="gradient"
              bgColor={bgColor === 'white' ? icon.color : 'white'}
              color={bgColor === 'white' ? 'white' : 'dark'}
              width="3rem"
              height="3rem"
              borderRadius="section"
              display="flex"
              justifyContent="center"
              alignItems="center"
              ml="auto"
            >
              {typeof icon.component === 'string' ? (
                <Icon fontSize="small" color="inherit">
                  {icon.component}
                </Icon>
              ) : (
                <Box fontSize="1.75rem" display="grid" placeItems="center" color="inherit">
                  {icon.component}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
        {isPercentage && (
          <Typography
            display="flex"
            alignItems="center"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.count}
            <Typography
              variant="body2"
              fontWeight="regular"
              color={bgColor === 'white' ? 'text' : 'white'}
              ml={0.5}
              mt={-0.125}
            >
              {percentage.text}
            </Typography>
          </Typography>
        )}
      </Box>
    </Box>
  </Card>
);

// Setting default values for the props of DetailedStaticsCard
DetailedStaticsCard.defaultProps = {
  bgColor: 'white',
  percentage: {
    color: 'success',
    count: 0,
    text: ''
  },
  direction: 'right'
};
export default DetailedStaticsCard;
