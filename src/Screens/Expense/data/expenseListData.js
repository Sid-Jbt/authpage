import Badge from 'Elements/Badge';
import Icon from '@mui/material/Icon';
import { useState, React } from 'react';
import { Grid, Menu } from '@mui/material';
import DialogMenu from 'Elements/Dialog';
import ExpenseInfoDetails from 'Screens/Expense/ExpenseInfoDetails';
import image from 'Assets/Images/bruce-mars.jpg';
import { RemoveRedEye } from '@mui/icons-material';

const Action = ({ id }) => {
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

const expenseListData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id' },
    { name: 'title', align: 'center', headerName: 'Title' },
    { name: 'name', align: 'left', headerName: 'Name' },
    { name: 'purchaseFrom', align: 'center', headerName: 'Purchase From' },
    { name: 'purchaseDate', align: 'center', headerName: 'Purchase Date' },
    { name: 'amount', align: 'center', headerName: 'Amount' },
    { name: 'status', align: 'center', headerName: 'Status' },
    { name: 'action', align: 'center', headerName: 'Action' }
  ],

  rows: [
    {
      id: '101',
      title: 'Water bill',
      name: 'Sonika',
      purchaseFrom: 'local',
      purchaseDate: '01/02/2023',
      amount: '350',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action: <Action id={101} />
    },
    {
      id: '102',
      title: 'Birthday decoration',
      name: 'Hinal',
      purchaseFrom: 'local store',
      purchaseDate: '01/02/2023',
      amount: '500',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action: <Action id={102} />
    },
    {
      id: '103',
      title: 'Office cleaning',
      name: 'Hetali',
      purchaseFrom: 'Other',
      purchaseDate: '01/02/2023',
      amount: '1000',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action: <Action id={103} />
    },
    {
      id: '104',
      title: 'Water bill',
      name: 'Hiren',
      purchaseFrom: 'local',
      purchaseDate: '01/02/2023',
      amount: '350',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action: <Action id={104} />
    },
    {
      id: '105',
      title: 'Birthday decoration',
      name: 'Bhavy',
      purchaseFrom: 'local store',
      purchaseDate: '01/02/2023',
      amount: '500',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action: <Action id={105} />
    },
    {
      id: '106',
      title: 'Office cleaning',
      name: 'Mridul',
      purchaseFrom: 'Other',
      purchaseDate: '01/02/2023',
      amount: '1000',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      action: <Action id={106} />
    }
  ]
};

export default expenseListData;
