import React, { useState } from 'react';
import { Card, Icon, Grid, FormLabel, FormControl } from '@mui/material';
import { ImportExportRounded } from '@mui/icons-material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Months, Years } from 'Helpers/Global';
import payslipData from './data/payslipData';

const Payslip = () => {
  const { columns: prCols, rows: prRows } = payslipData;
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleChangeMonth = (value) => {
    setMonth(value.value);
  };

  const handleChangeYear = (value) => {
    setYear(value.value);
  };
  console.log('Month & Year --> ', month, year);

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        <Grid item xs="auto">
          <Button color="white" variant="outlined" size="small">
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid>
      </Grid>
      <Card
        mb={3}
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              <Select options={Months} onChange={(value) => handleChangeMonth(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              <Select options={Years} onChange={(value) => handleChangeYear(value)} />
            </FormControl>
          </Grid>
        </FilterLayout>
        <Table columns={prCols} rows={prRows} />
      </Card>
    </>
  );
};

export default Payslip;
