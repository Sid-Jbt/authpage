import React, { useState } from 'react';
import { Card, Grid, FormLabel, FormControl } from '@mui/material';
// import { Check, ImportExportRounded } from '@mui/icons-material';
import Table from 'Elements/Tables/Table';
// import Button from 'Elements/Button';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Months, Years } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import payslipData from './data/payslipData';
// import { SnackbarContext } from '../../Context/SnackbarProvider';

const Payslip = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = payslipData;
  const { role } = useSelector((state) => state.route);
  // const { setSnack } = useContext(SnackbarContext);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [search, setSearch] = useState('');

  const handleChangeMonth = (value) => {
    setMonth(value);
  };

  const handleChangeYear = (value) => {
    setYear(value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event);
  };

  /*  const onClickExport = () => {
    setSnack({
      title: 'Warning',
      message: 'Export coming soon...',
      time: false,
      icon: <Check color="white" />,
      color: 'warning',
      open: true
    });
  }; */

  const handleClear = () => {
    setMonth('');
    setYear('');
    setSearch('');
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {/* <Grid item xs="auto">
          <Button color="white" variant="outlined" size="small" onClick={onClickExport}>
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid> */}
      </Grid>
      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={() => handleChangeSearch()}
          handleClear={() => handleClear()}
        >
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              <Select
                value={month}
                options={Months}
                onChange={(value) => handleChangeMonth(value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              <Select value={year} options={Years} onChange={(value) => handleChangeYear(value)} />
            </FormControl>
          </Grid>
        </FilterLayout>
        <Table columns={role === 'admin' ? adminPrCol : prCols} rows={prRows} />
      </Card>
    </>
  );
};

export default Payslip;
