import React, { useState } from 'react';
import {
  Card,
  Icon,
  MenuItem,
  Select,
  Grid,
  FormLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import {
  ImportExportRounded,
  SearchRounded,
  ClearRounded,
  FilterListSharp
} from '@mui/icons-material';
import Typography from 'Elements/Typography';
import Table from 'Elements/Table';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import { Months, Years } from 'Helpers/Globle';
import payslipData from './data/payslipData';

const Payslip = () => {
  const { columns: prCols, rows: prRows } = payslipData;
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <Card
      mb={3}
      sx={{
        background: ({ palette: { grey } }) => grey[100],
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
        boxShadow: ({ boxShadows: { md } }) => md
      }}
    >
      <Grid container alignItems="center" spacing={2} p={2} pb={0}>
        <Grid container item sm={12} alignItems="center" justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h3">Payslip</Typography>
          </Grid>
          <Grid container item xs={6} justifyContent="end" sx={{ gap: 2 }}>
            <Button color="info" variant="contained" size="small">
              <Icon>
                <ImportExportRounded />
              </Icon>
              Export
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Icon>
            <FilterListSharp />
          </Icon>
          <Typography variant="h6">Filter</Typography>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>Select Month</FormLabel>
            <Select
              id="selectMonth"
              value={month}
              onChange={handleChangeMonth}
              displayEmpty
              renderValue={month !== '' ? undefined : () => 'All'}
            >
              {Months.map((m, key) => (
                <MenuItem key={key} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ mr: 0, ml: 0, color: 'red' }}> </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>Select Year</FormLabel>
            <Select
              id="selectMonth"
              value={year}
              onChange={handleChangeYear}
              displayEmpty
              renderValue={year !== '' ? undefined : () => 'All'}
            >
              {Years.map((y, key) => (
                <MenuItem key={key} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ mr: 0, ml: 0, color: 'red' }}> </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input
            placeholder="Search"
            type="text"
            label="Search"
            size="small"
            fullWidth
            id="search"
            name="search"
            errorFalse
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={8}
          lg={4}
          pt={4}
          sx={({ breakpoints }) => ({
            [breakpoints.down('lg' && 'md')]: {
              marginBottom: 2
            }
          })}
        >
          <Button color="info" variant="contained" size="small" sx={{ marginRight: '10px' }}>
            <Icon sx={{ mr: '2px' }}>
              <SearchRounded />
            </Icon>
            Search
          </Button>
          <Button color="error" variant="contained" size="small">
            <Icon sx={{ mr: '2px' }}>
              <ClearRounded />
            </Icon>
            Clear
          </Button>
        </Grid>
      </Grid>
      <Table columns={prCols} rows={prRows} />
    </Card>
  );
};

export default Payslip;
