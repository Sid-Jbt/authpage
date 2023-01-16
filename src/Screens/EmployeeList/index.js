import React from 'react';
import { Card, FormControl, Icon, InputLabel, MenuItem, Select } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import Button from 'Elements/Button';
import { Add, ImportExportRounded, SearchRounded, ClearRounded } from '@mui/icons-material';
import Input from 'Elements/Input';
import Paginations from 'Components/Pagination/index';
import employeeListData from './data/employeeListData';

const EmployeeList = () => {
  const { columns: prCols, rows: prRows } = employeeListData;
  const [role, setRole] = React.useState('');

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  console.log('Role --> ', role);
  return (
    <Card
      mb={3}
      sx={{
        background: ({ palette: { grey } }) => grey[100],
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
        boxShadow: ({ boxShadows: { md } }) => md
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} p={2} pb={0}>
        <Typography variant="h6">Employee</Typography>
        <Box>
          <Button color="info" variant="contained" size="medium" sx={{ marginRight: '10px' }}>
            <Icon sx={{ fontWeight: 'bold', paddingRight: '20px' }}>
              <Add />{' '}
            </Icon>
            Add
          </Button>
          <Button color="info" variant="contained" size="medium">
            <Icon sx={{ fontWeight: 'bold', paddingRight: '20px' }}>
              <ImportExportRounded />{' '}
            </Icon>
            Export
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        p={2}
        pb={0}
        pt={0}
      >
        <Box display="flex" justifyContent="space-between">
          <Box mr={2}>
            <Input
              type="date"
              placeholder="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
            />
          </Box>
          <Box mr={3}>
            <Input
              type="date"
              placeholder="To Date"
              size="small"
              fullWidth
              id="toDate"
              name="toDate"
            />
          </Box>
          <Box sx={{ minWidth: 130 }} mr={5}>
            <FormControl fullWidth>
              <InputLabel id="select-role-label" size="large" pb={3}>
                Role
              </InputLabel>
              <Select
                labelId="select-role-label"
                id="selectRole"
                value={role}
                label="Select Role"
                displayEmpty
                onChange={handleChangeRole}
                sx={{ borderRadius: '8px' }}
              >
                <MenuItem value={10}>Super Admin</MenuItem>
                <MenuItem value={20}>Admin</MenuItem>
                <MenuItem value={30}>Developer</MenuItem>
                <MenuItem value={40}>HR</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button color="info" variant="contained" size="medium" sx={{ marginRight: '10px' }}>
              <Icon sx={{ fontWeight: 'bold', paddingRight: '20px' }}>
                <SearchRounded />{' '}
              </Icon>
              Search
            </Button>
            <Button color="info" variant="contained" size="medium">
              <Icon sx={{ fontWeight: 'bold', paddingRight: '20px' }}>
                <ClearRounded />{' '}
              </Icon>
              Clear
            </Button>
          </Box>
        </Box>
      </Box>
      <Card
        sx={{
          background: ({ palette: { white } }) => white.main,
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { xl } }) => xl
        }}
      >
        <Box
          sx={{
            '& .MuiTableRow-root:not(:last-child)': {
              '& td': {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`
              }
            }
          }}
        >
          <Table columns={prCols} rows={prRows} />
        </Box>
        <Paginations />
      </Card>
    </Card>
  );
};

export default EmployeeList;
