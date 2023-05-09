import React from 'react';
import TablePagination from '@mui/material/TablePagination';

const Pagination = ({ rows, initialPage, onChangePage, rowsPerPage, onRowsPerPageChange }) => (
  <TablePagination
    component="div"
    count={rows}
    page={initialPage}
    onPageChange={(event, newPage) => onChangePage(newPage)}
    rowsPerPage={rowsPerPage}
    showFirstButton
    showLastButton
    rowsPerPageOptions={[10, 20, 30, { label: 'All', value: 0 }]}
    onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
  />
);

export default Pagination;
