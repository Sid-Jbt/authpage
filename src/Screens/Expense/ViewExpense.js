import { Grid } from '@mui/material';
import DialogMenu from 'Elements/Dialog';
import Button from 'Elements/Button';
import ExpenseInfoDetails from './ExpenseInfoDetails';

const ViewExpense = ({ dialogContent, isExpenseDialogOpen, handleCloseDialog }) => {
  const renderMenu = () => (
    <DialogMenu
      isOpen={isExpenseDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      dialogTitle={`Expense Details: ${dialogContent.title}`}
      dialogContent={<ExpenseInfoDetails info={dialogContent} />}
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
  return <>{renderMenu()}</>;
};

export default ViewExpense;
