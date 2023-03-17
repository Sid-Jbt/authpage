import React from 'react';
import TablePagination from '@mui/material/TablePagination';

const Pagination = ({ rows, initialPage, onChangePage, rowsPerPage, onRowsPerPageChange }) => {
  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    // onChangePage(0);
  };

  return (
    <TablePagination
      component="div"
      count={rows}
      page={initialPage}
      onPageChange={(event, newPage) => handleChangePage(event, newPage)}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10, 20, 30, { label: 'All', value: rows }]}
      onRowsPerPageChange={(event) => {
        handleChangeRowsPerPage(event);
      }}
    />
  );
};

export default Pagination;
