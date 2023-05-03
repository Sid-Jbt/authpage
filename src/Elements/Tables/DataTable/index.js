import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';

import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Select from 'Elements/Select';
import Input from 'Elements/Input';
import { useMemo, useEffect, useState } from 'react';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import Pagination from './Pagination';
import DataTableHeadCell from './DataTableHeadCell';
import DataTableBodyCell from './DataTableBodyCell';

const DataTable = ({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  onClickAction
}) => {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = tableInstance;

  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  const setEntriesPerPage = ({ value }) => setPageSize(value);

  const renderPagination = pageOptions.map((option) => (
    <Pagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </Pagination>
  ));

  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  const customizedPageOptions = pageOptions.map((option) => option + 1);

  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  const [search, setSearch] = useState(globalFilter);

  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? 'desc' : 'asce';
    } else if (isSorted) {
      sortedValue = 'none';
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      {entriesPerPage || canSearch ? (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <Box display="flex" alignItems="center">
              <Box width="25%">
                <Select
                  defaultValue={{ value: defaultValue, label: defaultValue }}
                  options={entries.map((entry) => ({ value: entry, label: entry }))}
                  onChange={setEntriesPerPage}
                  size="small"
                />
              </Box>
              <Typography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </Typography>
            </Box>
          )}
          {canSearch && (
            <Box width="12rem" ml="auto">
              <Input
                placeholder="Search..."
                value={search}
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </Box>
          )}
        </Box>
      ) : null}
      <Table {...getTableProps()}>
        <Box component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <DataTableHeadCell
                  key={index}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : 'auto'}
                  align={column.align ? column.align : 'left'}
                  sorted={setSortedValue(column)}
                >
                  {column.render('Header')}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </Box>
        <TableBody {...getTableBodyProps()} sx={{ cursor: 'pointer' }}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <DataTableBodyCell
                    onClick={() => onClickAction(row.values.name.toLowerCase())}
                    key={index}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : 'left'}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <Box mb={{ xs: 3, sm: 0 }}>
            <Typography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </Typography>
          </Box>
        )}
        {pageOptions.length > 1 && (
          <Pagination
            variant={pagination.variant ? pagination.variant : 'gradient'}
            color={pagination.color ? pagination.color : 'info'}
          >
            {canPreviousPage && (
              <Pagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>
                  <ChevronLeftOutlined />
                </Icon>
              </Pagination>
            )}
            {renderPagination.length > 6 ? (
              <Box width="5rem" mx={1}>
                <Input
                  inputProps={{ type: 'number', min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </Box>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <Pagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>
                  <ChevronRightOutlined />
                </Icon>
              </Pagination>
            )}
          </Pagination>
        )}
      </Box>
    </TableContainer>
  );
};

DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: 'gradient', color: 'info' },
  isSorted: true,
  noEndBorder: false
};

export default DataTable;
