import { React, useState } from 'react';
import { Grid } from '@mui/material';
import Icon from '@mui/material/Icon';
import { RemoveRedEye } from '@mui/icons-material';
import image from 'Assets/Images/bruce-mars.jpg';
import DialogMenu from 'Elements/Dialog';
import Button from 'Elements/Button';
import ExpenseInfoDetails from './ExpenseInfoDetails';

const ViewExpense = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const renderMenu = () => (
    <DialogMenu
      isOpen={isDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      dialogTitle="Expense Details: Water bill"
      dialogContent={
        <ExpenseInfoDetails
          info={{
            name: 'Sonika',
            purchaseFrom: 'local',
            purchaseDate: '01/02/2023',
            amount: '350',
            image
          }}
        />
      }
      dialogAction={
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
          <Grid item>
            <Button
              type="submit"
              color="info"
              variant="contained"
              size="small"
              onClick={handleCloseDialog}
            >
              Approve
            </Button>
          </Grid>
          <Grid item>
            <Button color="error" variant="contained" size="small" onClick={handleCloseDialog}>
              Reject
            </Button>
          </Grid>
        </Grid>
      }
    />
  );
  return (
    <>
      <Icon
        id={id}
        sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        fontSize="small"
        onClick={handleOpenDialog}
      >
        <RemoveRedEye />
      </Icon>
      {renderMenu()}
    </>
  );
};

export default ViewExpense;
