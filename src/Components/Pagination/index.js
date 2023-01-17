import React, { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

const Paginations = (rows) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={rows.rows}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Paginations;
