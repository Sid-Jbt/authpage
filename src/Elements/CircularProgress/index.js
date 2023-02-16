import { Box, CircularProgress } from '@mui/material';

const CircularProgressLoader = ({ isLoading = false }) =>
  isLoading && (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: `${-80 / 2}px`,
        marginLeft: `${-80 / 2}px`
      }}
    >
      <CircularProgress
        size={80}
        sx={{
          color: 'dark'
        }}
      />
    </Box>
  );

export default CircularProgressLoader;
