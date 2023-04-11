import { Card, Icon, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Link } from 'react-router-dom';

const LeaveCard = ({ bgColor, title, icon, direction, link, description }) => (
  <Card component={link && Link} to={link}>
    <Box bgColor={bgColor} variant="gradient">
      <Box p={2}>
        <Grid container>
          <Grid container>
            <Grid item xs={10}>
              <Box
                ml={direction === 'left' ? 2 : 0}
                lineHeight={1}
                sx={{
                  display: 'block'
                }}
              >
                <Typography
                  variant="button"
                  color={bgColor === 'white' ? 'text' : 'white'}
                  textTransform="uppercase"
                  fontWeight="medium"
                >
                  {title}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                variant="gradient"
                color={bgColor === 'white' ? icon.color : 'dark'}
                width="2rem"
                height="2rem"
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
                  <Box fontSize="1.25rem" display="grid" placeitems="center" color="inherit">
                    {icon.component}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box ml={direction === 'left' ? 2 : 0} lineHeight={1}>
              <Typography
                variant="h6"
                fontWeight="regular"
                color={bgColor === 'white' ? 'dark' : 'white'}
                mb={1}
              >
                {description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Card>
);

LeaveCard.defaultProps = {
  bgColor: 'white',
  percentage: {
    color: 'success',
    count: 0,
    text: ''
  },
  direction: 'right'
};
export default LeaveCard;
