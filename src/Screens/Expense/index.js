// import React, { useState } from 'react';
// import { Card, Grid, Icon } from '@mui/material';
// import {
//     Add,
//     ImportExportRounded,
//     PendingTwoTone,
//     ThumbDown,
//     ThumbUpAlt
// } from '@mui/icons-material';
// import Button from 'Elements/Button';
// import Table from 'Elements/Tables/Table';
// import { useSelector } from 'react-redux';
// import DialogMenu from 'Elements/Dialog';
// import expenseListData from './data/expenseListData';
// import FilterLayout from '../../Components/FilterLayout';
// import ExpenseCard from '../../Components/CardLayouts/StaticCard';
// import ViewExpenseDetails from './ViewExpenseDetails';
// import AddExpenseForm from "./AddExpenseForm";
// import DeleteDialog from "../../Components/DeleteDialog";
// const Expense = () => {
//     const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = expenseListData;
//     const { role } = useSelector((state) => state.route);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
//     const [selectedData, setSelectedData] = useState(null);
//     const [search, setSearch] = useState('');
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [selectedId, setSelectedId] = useState('');
//     const [isViewExpenseDialogOpen, setIsViewExpenseDialogOpen] = useState(false);
//
//     const handleDialog = () => {
//         setSelectedData(null);
//         setIsDialogOpen(!isDialogOpen);
//     };
//
//     const handleOpenDialog = () => {
//         // console.log('handleOpenDialog....');
//         setIsExpenseDialogOpen(true);
//     };
//
//     const handleCloseDialog = () => {
//         setIsExpenseDialogOpen(false);
//     };
//
//     const onClickView = (row) => {
//         // console.log('onClickView Row --> ', row);
//         setSelectedData(row);
//         handleOpenDialog();
//     };
//
//     const onClickAction = (key, index) => {
//         if (key === 'edit') {
//             setSelectedData(prRows.find((o) => o.id === index));
//             setIsDialogOpen(!isDialogOpen);
//         } else if (key === 'view') {
//             console.log('View Modal...');
//             setIsViewExpenseDialogOpen(true);
//         } else {
//             setSelectedId(index);
//             setIsDeleteDialogOpen(true);
//         }
//     };
//
//     const handleViewDialogClose = () => {
//         setIsViewExpenseDialogOpen(false);
//     };
//
//     const handleDialogClose = () => {
//         setIsDeleteDialogOpen(false);
//     };
//
//     const onDelete = () => {
//         handleDialogClose();
//     };
//
//     const handleChangeSearch = (event) => {
//         setSearch(event);
//     };
//     const handleClear = () => {
//         setSearch('');
//     };
//
//     console.log('isViewExpenseDialogOpen --> ', isViewExpenseDialogOpen);
//
//     // const onClickAction = (key, index, row) => {
//     //     if (key === 'edit') {
//     //         setSelectedData(prRows.find((o) => o.id === index));
//     //         setIsDialogOpen(!isDialogOpen);
//     //     } else if(key === 'view'){
//     //         setSelectedData(row);
//     //         handleOpenDialog();
//     //     } else{
//     //         setSelectedId(index);
//     //         setIsDeleteDialogOpen(true);
//     //     }
//     // };
//
//     return (
//         <>
//             <Grid container spacing={3} mb={3}>
//                 <Grid item xs={12} md={6} lg={3}>
//                     <ExpenseCard
//                         title="Approved"
//                         count="5"
//                         icon={{ color: 'success', component: <ThumbUpAlt /> }}
//                         isPercentage={false}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={3}>
//                     <ExpenseCard
//                         title="Declined"
//                         count="1"
//                         icon={{ color: 'error', component: <ThumbDown /> }}
//                         isPercentage={false}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={3}>
//                     <ExpenseCard
//                         title="Pending"
//                         count="3"
//                         icon={{ color: 'warning', component: <PendingTwoTone /> }}
//                         isPercentage={false}
//                     />
//                 </Grid>
//             </Grid>
//             <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
//                 <Grid item xs="auto">
//                     <Button
//                         sx={({ breakpoints, palette: { dark } }) => ({
//                         [breakpoints.down('xl' && 'lg')]: {
//                             color: dark.main,
//                             borderColor: dark.main
//                         }
//                     })}
//                         variant="outlined"
//                         size="small"
//                         onClick={handleDialog}
//                     >
//                         <Icon sx={{ mr: 1 }}>
//                             <Add />
//                         </Icon>
//                         Add
//                     </Button>
//                 </Grid>
//                 <Grid item xs="auto">
//                     <Button sx={({ breakpoints, palette: { dark } }) => ({
//                         [breakpoints.down('xl' && 'lg')]: {
//                             color: dark.main,
//                             borderColor: dark.main
//                         }
//                     })} variant="outlined" size="small">
//                         <Icon sx={{ mr: 1 }}>
//                             <ImportExportRounded />
//                         </Icon>
//                         Export
//                     </Button>
//                 </Grid>
//             </Grid>
//             <Card
//                 sx={{
//                     background: ({ palette: { grey } }) => grey[100],
//                     borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
//                     boxShadow: ({ boxShadows: { md } }) => md
//                 }}
//             >
//                 <FilterLayout
//                     search={search}
//                     handleSearch={() => handleChangeSearch()}
//                     handleClear={() => handleClear()}
//                 />
//
//                 <Table
//                     columns={role === 'admin' ? adminPrCol : prCols}
//                     rows={prRows}
//                     onClickAction={(value, id, row) => onClickAction(value, id, row)}
//                     isAction={role !== 'admin'}
//                     options={[
//                         { title: 'Edit', value: 'edit' },
//                         { title: 'View', value: 'view' },
//                         { title: 'Delete', value: 'delete' }
//                     ]}
//                     isView={role === 'admin'}
//                     isDialogAction={(row) => onClickView(row)}
//                 />
//                 {isDialogOpen && (
//                     <AddExpenseForm
//                         isDialogOpen={isDialogOpen}
//                         handleDialog={() => handleDialog()}
//                         selectedData={selectedData}
//                         setSelectedData={(value) => setSelectedData(value)}
//                     />
//                 )}
//                 {isDeleteDialogOpen && (
//                     <DialogMenu
//                         isOpen={isDeleteDialogOpen}
//                         onClose={handleDialogClose}
//                         dialogTitle="Delete"
//                         dialogContent={
//                             <DeleteDialog
//                                 handleDialogClose={handleDialogClose}
//                                 selectedId={selectedId}
//                                 deleteItem={onDelete}
//                             />
//                         }
//                     />
//                 )}
//             </Card>
//             {role !== 'admin' && isViewExpenseDialogOpen && (
//                 <DialogMenu
//                     isOpen={isViewExpenseDialogOpen}
//                     onClose={handleViewDialogClose}
//                     dialogTitle={`Expense Details: ${selectedData && selectedData.leave}`}
//                     dialogContent={<ViewExpenseDetails info={selectedData} />}
//                     dialogAction={
//                         (role !== 'admin' ||
//                             (selectedData !== null && selectedData.status.props.badgeContent === 'pending')) && (
//                             <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
//                                 <Grid item>
//                                     <Button
//                                         type="submit"
//                                         color="info"
//                                         variant="contained"
//                                         size="small"
//                                         onClick={handleCloseDialog}
//                                     >
//                                         Approve
//                                     </Button>
//                                 </Grid>
//                                 <Grid item>
//                                     <Button
//                                         color="error"
//                                         variant="contained"
//                                         size="small"
//                                         onClick={handleCloseDialog}
//                                     >
//                                         Reject
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         )
//                     }
//                 />
//             )}
//             {isExpenseDialogOpen && selectedData && (
//                 <DialogMenu
//                     isOpen={isExpenseDialogOpen}
//                     onClose={handleCloseDialog}
//                     dialogTitle={`Leave Details: ${selectedData.leave}`}
//                     dialogContent={<ViewExpenseDetails info={selectedData} />}
//                     dialogAction={
//                         (role !== 'admin' || (selectedData.status.props.badgeContent === 'pending')) && (
//                             <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
//                                 <Grid item>
//                                     <Button
//                                         type="submit"
//                                         color="info"
//                                         variant="contained"
//                                         size="small"
//                                         onClick={handleCloseDialog}
//                                     >
//                                         Approve
//                                     </Button>
//                                 </Grid>
//                                 <Grid item>
//                                     <Button
//                                         color="error"
//                                         variant="contained"
//                                         size="small"
//                                         onClick={handleCloseDialog}
//                                     >
//                                         Reject
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         )
//                     }
//                 />
//             )}
//         </>
//     );
// };
//
// export default Expense;

import React, { useState } from 'react';
import { Card, Grid, Icon } from '@mui/material';
import {
  Add,
  ImportExportRounded,
  PendingTwoTone,
  ThumbDown,
  ThumbUpAlt
} from '@mui/icons-material';
import Button from 'Elements/Button';
import Table from 'Elements/Tables/Table';
import { useSelector } from 'react-redux';
import DialogMenu from 'Elements/Dialog';
import expenseListData from './data/expenseListData';
import FilterLayout from '../../Components/FilterLayout';
import ExpenseCard from '../../Components/CardLayouts/StaticCard';
import ViewExpenseDetails from './ViewExpenseDetails';
import AddExpenseForm from './AddExpenseForm';
import DeleteDialog from '../../Components/DeleteDialog';

const Expense = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = expenseListData;
  const { role } = useSelector((state) => state.route);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [isViewExpenseDialogOpen, setIsViewExpenseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleOpenDialog = () => {
    setIsExpenseDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsExpenseDialogOpen(false);
  };

  const handleCloseViewDialog = () => {
    setIsViewExpenseDialogOpen(false);
  };

  const onClickView = (row) => {
    setSelectedData(row);
    handleOpenDialog();
  };

  const onClickAction = (key, index) => {
    if (key === 'edit') {
      setSelectedData(prRows.find((o) => o.id === index));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      setSelectedData(prRows.find((o) => o.id === index));
      setIsViewExpenseDialogOpen(true);
    } else {
      setSelectedId(index);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleChangeSearch = (event) => {
    setSearch(event);
  };

  const handleClear = () => {
    setSearch('');
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = () => {
    handleDialogClose();
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Approved"
            count="5"
            icon={{ color: 'success', component: <ThumbUpAlt /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Declined"
            count="1"
            icon={{ color: 'error', component: <ThumbDown /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ExpenseCard
            title="Pending"
            count="3"
            icon={{ color: 'warning', component: <PendingTwoTone /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        <Grid item xs="auto">
          <Button
            sx={({ breakpoints, palette: { dark } }) => ({
              [breakpoints.down('xl' && 'lg')]: {
                color: dark.main,
                borderColor: dark.main
              }
            })}
            variant="outlined"
            size="small"
            onClick={() => handleDialog()}
          >
            <Icon sx={{ mr: 1 }}>
              <Add />
            </Icon>
            Add
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button
            sx={({ breakpoints, palette: { dark } }) => ({
              [breakpoints.down('xl' && 'lg')]: {
                color: dark.main,
                borderColor: dark.main
              }
            })}
            variant="outlined"
            size="small"
          >
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid>
      </Grid>
      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={() => handleChangeSearch()}
          handleClear={() => handleClear()}
        />

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={prRows}
          onClickAction={(value, id) => onClickAction(value, id)}
          isAction={role !== 'admin'}
          options={[
            { title: 'Edit', value: 'edit' },
            { title: 'View', value: 'view' },
            { title: 'Delete', value: 'delete' }
          ]}
          isView={role === 'admin'}
          isDialogAction={(row) => onClickView(row)}
        />
        {isDialogOpen && (
          <AddExpenseForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => handleDialog()}
            selectedData={selectedData}
            setSelectedData={(value) => setSelectedData(value)}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={handleDialogClose}
            dialogTitle="Delete"
            dialogContent={
              <DeleteDialog
                handleDialogClose={handleDialogClose}
                selectedId={selectedId}
                deleteItem={onDelete}
              />
            }
          />
        )}
      </Card>
      {(isExpenseDialogOpen || isViewExpenseDialogOpen) && selectedData && (
        <DialogMenu
          isOpen={isExpenseDialogOpen || isViewExpenseDialogOpen}
          onClose={isExpenseDialogOpen ? handleCloseDialog : handleCloseViewDialog}
          dialogTitle="Expense Details"
          dialogContent={<ViewExpenseDetails info={selectedData} />}
          dialogAction={
            role === 'admin' && (
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
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={handleCloseDialog}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            )
          }
        />
      )}
    </>
  );
};

export default Expense;
//
