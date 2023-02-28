import React from 'react';
import TablePagination from '@mui/material/TablePagination';

const Pagination = ({ rows, initialPage, onChangePage, rowsPerPage, onRowsPerPageChange }) => {
  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onChangePage(0);
  };

  return (
    <TablePagination
      component="div"
      count={rows}
      page={initialPage}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: rows }]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
