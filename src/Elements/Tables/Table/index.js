import { useMemo, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Checkbox
} from '@mui/material';
import Avatar from 'Elements/Avatar';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import typography from 'Theme/base/typography';
import borders from 'Theme/base/borders';
import Pagination from 'Elements/Pagination';
import { Action } from 'Elements/Tables/Action';
import breakpoints from 'Theme/base/breakpoints';
import Icon from '@mui/material/Icon';
import { RemoveRedEye } from '@mui/icons-material';

const Table = ({
  columns,
  rows,
  isChecked = false,
  isAction = false,
  options,
  onClickAction,
  isView = false,
  isDialogAction,
  rowsCount = 0,
  initialPage = 0,
  onChangePage,
  rowsPerPage = 10,
  onRowsPerPageChange,
  sortKey = 'id',
  sortOrder = 'asc',
  handleRequestSort
}) => {
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;
  const [selectedIds, setSelectedIds] = useState([]);
  const onSelectAll = (isCheckSelectAll) => {
    let selectedId = [];
    if (isCheckSelectAll === false) {
      rows.map(({ id }) => {
        selectedId.push(id);
      });
    } else {
      selectedId = [];
    }
    setSelectedIds(selectedId);
  };

  const onSelectedIds = (id) => {
    const isSelectedId = selectedIds.includes(id);
    if (isSelectedId) {
      const indexOfUser = selectedIds.findIndex((item) => id === item);
      selectedIds.splice(indexOfUser, 1);
    } else {
      selectedIds.push(id);
    }
    setSelectedIds([...selectedIds]);
  };

  const renderColumns = columns.map(({ headerName, mobileHeader, align, width, name }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <Box
        key={headerName}
        component="th"
        width={width || 'auto'}
        pt={1.5}
        pb={1.25}
        pl={align === 'left' ? pl : 3}
        pr={align === 'right' ? pr : 3}
        textAlign={align}
        fontSize={size.sm}
        fontWeight={fontWeightBold}
        color="dark"
        opacity={0.7}
        sx={({ palette: { light } }) => ({ borderBottom: `${borderWidth[1]} solid ${light.main}` })}
      >
        <TableSortLabel
          active={
            window.innerWidth < breakpoints.values.xl
              ? mobileHeader.toUpperCase() !== 'ACTION' && mobileHeader.toUpperCase() !== 'ID'
              : headerName.toUpperCase() !== 'ACTION' && headerName.toUpperCase() !== 'ID'
          }
          direction={sortKey.toLowerCase() === name.toLowerCase() ? sortOrder : 'asc'}
          onClick={(e) => handleRequestSort(e, name, sortOrder === 'asc' ? 'desc' : 'asc')}
          hideSortIcon={
            window.innerWidth < breakpoints.values.xl
              ? mobileHeader.toUpperCase() === 'ACTION' && mobileHeader.toUpperCase() === 'ID'
              : headerName.toUpperCase() === 'ACTION' && headerName.toUpperCase() === 'ID'
          }
        >
          {window.innerWidth < breakpoints.values.xl
            ? mobileHeader.toUpperCase()
            : headerName.toUpperCase()}
        </TableSortLabel>
      </Box>
    );
  });

  const renderRows =
    rows &&
    rows.length &&
    rows.map((row, key) => {
      const rowKey = `row-${key}`;
      const tableRow = columns.map(({ name, align }) => {
        let template;
        if (Array.isArray(row[name])) {
          template = (
            <Box
              key={`${name}_${key}`}
              component="td"
              p={1}
              sx={({ palette: { light } }) => ({
                borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null
              })}
            >
              <Box display="flex" alignItems="center" py={0.5} px={1}>
                <Box mr={2}>
                  <Avatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
                </Box>
                <Typography
                  variant="button"
                  fontWeight="medium"
                  color="secondary"
                  sx={{ width: 'max-content' }}
                >
                  {row[name][1]}
                </Typography>
              </Box>
            </Box>
          );
        } else {
          template = (
            <Box
              key={`${name}_${key}`}
              component="td"
              p={1}
              textAlign={align}
              lineHeight={0.65}
              sx={({ palette: { light } }) => ({
                borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
                verticalAlign: 'middle'
              })}
            >
              <Typography
                variant="button"
                fontWeight="regular"
                color="secondary"
                sx={{ display: 'inline-block', width: 'max-content' }}
              >
                {row[name] === undefined || row[name] === null ? '-' : row[name]}
              </Typography>
            </Box>
          );
        }
        return template;
      });

      return (
        <TableRow key={rowKey}>
          {isChecked && (
            <TableCell sx={{ width: '3%', pr: 0 }}>
              <Checkbox
                onClick={() => onSelectedIds(row.id)}
                checked={selectedIds.includes(row.id)}
              />
            </TableCell>
          )}
          {tableRow}
          {isAction && (
            <TableCell sx={{ textAlign: 'center' }}>
              <Action
                id={row.id}
                isAction={isAction}
                options={options}
                onClickAction={(value) => onClickAction(value, row.id)}
              />
            </TableCell>
          )}
          {isView && (
            <TableCell sx={{ textAlign: 'center' }}>
              <Icon
                id={row.id}
                sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                fontSize="small"
                onClick={() => isDialogAction(row)}
              >
                <RemoveRedEye />
              </Icon>
            </TableCell>
          )}
        </TableRow>
      );
    });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <Box component="thead">
            <TableRow>
              {isChecked && (
                <TableCell>
                  <Checkbox
                    onClick={() => onSelectAll(selectedIds.length === rows && rows.length)}
                    checked={selectedIds.length === rows && rows.length}
                    id="selectedAll"
                  />
                </TableCell>
              )}
              {renderColumns}
              {(isAction || isView) && (
                <TableCell
                  key="action"
                  component="th"
                  width="auto"
                  sx={{
                    pt: '1.5',
                    pb: '1.25',
                    textAlign: 'center',
                    fontSize: 'size.sm',
                    fontWeight: 'fontWeightBold',
                    color: 'dark',
                    opacity: '0.7'
                  }}
                >
                  ACTION
                </TableCell>
              )}
            </TableRow>
          </Box>
          <TableBody>
            {renderRows && renderRows.length > 0 ? (
              <>
                {renderRows}
                {rowsCount && (
                  <TableCell
                    colSpan={isChecked ? renderColumns.length + 2 : renderColumns.length + 1}
                  >
                    <Pagination
                      rows={rowsCount}
                      initialPage={initialPage}
                      onChangePage={(page) => onChangePage(page)}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={(rowsPage) => onRowsPerPageChange(rowsPage)}
                    />
                  </TableCell>
                )}
              </>
            ) : (
              <TableRow>
                <Box component="td" colSpan={10} p={1} textAlign="center">
                  <Typography
                    variant="button"
                    fontWeight="regular"
                    color="secondary"
                    sx={{
                      pt: '1.5',
                      pb: '1.25',
                      textAlign: 'center',
                      fontSize: 'size.sm',
                      fontWeight: 'fontWeightBold',
                      color: 'dark',
                      opacity: '0.7'
                    }}
                  >
                    No Data Found!
                  </Typography>
                </Box>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows, selectedIds]
  );
};

export default Table;
