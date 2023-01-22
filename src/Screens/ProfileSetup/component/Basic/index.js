import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import Button from 'Elements/Button';

import team2 from 'Assets/Images/team-4-800x800.jpg';
import FormField from 'Elements/FormField';
import { Edit } from '@mui/icons-material';

const Basic = () => (
  <Box>
    <Box width="80%" textAlign="center" mx="auto" mb={4}>
      <Box mb={1}>
        <Typography variant="h5" fontWeight="regular">
          Let&apos;s start with the basic information
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight="regular" color="text">
        Let us know your name and father name.
      </Typography>
    </Box>
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} container justifyContent="center">
          <Box position="relative" height="max-content" mx="auto">
            <Avatar src={team2} alt="profile picture" size="xxl" variant="rounded" />
            <Box alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
              <Button variant="gradient" color="light" size="small" iconOnly>
                <Icon>
                  <Edit />
                </Icon>
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={1} rowSpacing={0}>
            <Grid item xs={12} md={5}>
              <Box>
                <FormField type="text" label="first name" placeholder="Eg. Michael" />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box>
                <FormField type="text" label="last name" placeholder="Eg. Tomson" />
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Box>
                <FormField type="text" label="father name" placeholder="Eg. Tomson" />
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Box>
                <FormField type="text" label="designation" placeholder="Eg. Tomson" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default Basic;
