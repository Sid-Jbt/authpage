import { createContext, useState } from 'react';
import Snackbar from 'Elements/Snackbar';
import { Check } from '@mui/icons-material';

export const SnackbarContext = createContext({});

const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    title: '',
    message: '',
    time: false,
    color: '',
    open: false
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ open: false });
  };

  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <Snackbar
        color={snack.color}
        icon={<Check color="white" />}
        title={snack.title}
        content={snack.message}
        dateTime={snack.time}
        open={snack.open}
        onClose={handleClose}
        close={handleClose}
        bgWhite={false}
      />
      <>{children}</>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
