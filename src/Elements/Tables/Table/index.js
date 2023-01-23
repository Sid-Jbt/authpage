import { useMemo, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
  TableSortLabel,
  Checkbox
} from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import typography from 'Theme/base/typography';
import borders from 'Theme/base/borders';
import Paginations from 'Elements/Pagination';

const Table = ({ columns, rows, isChecked = false }) => {
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

  const renderColumns = columns.map(({ headerName, align, width }, key) => {
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
          active={headerName.toUpperCase() !== 'ACTION' && headerName.toUpperCase() !== 'ID'}
          hideSortIcon={headerName.toUpperCase() === 'ACTION' && headerName.toUpperCase() === 'ID'}
          direction="desc"
        >
          {headerName.toUpperCase()}
        </TableSortLabel>
      </Box>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <Box
            key={key}
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
            key={key}
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
              {row[name]}
            </Typography>
          </Box>
        );
      }
      return template;
    });

    return (
      <TableRow key={rowKey}>
        {isChecked && (
          <Checkbox
            sx={{ ml: 2 }}
            onClick={() => onSelectedIds(row.id)}
            checked={selectedIds.includes(row.id)}
          />
        )}
        {tableRow}
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
                    onClick={() => onSelectAll(selectedIds.length === rows.length)}
                    checked={selectedIds.length === rows.length}
                    id="selectedAll"
                  />
                </TableCell>
              )}
              {renderColumns}
            </TableRow>
          </Box>
          <TableBody>
            {renderRows}
            <TableCell colSpan={isChecked ? renderColumns.length + 1 : renderColumns.length}>
              <Paginations rows={renderRows.length} />
            </TableCell>
          </TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows, selectedIds]
  );
};

export default Table;
