import { createContext, useState } from 'react';
import Snackbar from 'Elements/Snackbar';

export const SnackbarContext = createContext({});

const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ open: false });
  };

  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <Snackbar
        autoHide={snack.autoHide}
        color={snack.color}
        icon={snack.icon}
        title={snack.title}
        content={snack.message}
        dateTime={snack.time}
        open={snack.open}
        onClose={handleClose}
        close={handleClose}
        bgWhite={false}
      />
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
