import { React, useState } from 'react';
import { Grid, Menu } from '@mui/material';
import Icon from '@mui/material/Icon';
import { RemoveRedEye } from '@mui/icons-material';
import ExpenseInfoDetails from './ExpenseInfoDetails';
import image from '../../Assets/Images/bruce-mars.jpg';
import DialogMenu from '../../Elements/Dialog';

const ViewExpense = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const renderDialogContent = () => (
    <>
      <Grid item xs={12} md={6} xl={4}>
        <ExpenseInfoDetails
          info={{
            title: 'Water bill',
            name: 'Sonika',
            purchaseFrom: 'local',
            purchaseDate: '01/02/2023',
            amount: '350',
            image
          }}
          onClose={handleCloseDialog}
        />
      </Grid>
    </>
  );

  const renderMenu = () => (
    <Menu
      anchorEl={isDialogOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(isDialogOpen)}
      onClose={handleCloseDialog}
      keepMounted
    >
      <div>
        <DialogMenu
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          dialogTitle="Expense Details"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          dialogContent={renderDialogContent()}
        />
      </div>
    </Menu>
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
