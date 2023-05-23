import { Card } from '@mui/material';
import Box from 'Elements/Box';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';

const SweetAlert = ({ title, action }) => (
  <Card>
    <Box p={3} textAlign="center">
      <Button mb={2}>
        <Typography variant="body2" color="text">
          {title}
        </Typography>
      </Button>
      <Button variant="gradient" color="info" onClick={action}>
        Try Me!
      </Button>
    </Box>
  </Card>
);

export default SweetAlert;
