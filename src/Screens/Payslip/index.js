/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Months, Years } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import payslipColumns from './data/payslipData';

const Payslip = () => {
  const { columns: prCols, adminColumns: adminPrCol } = payslipColumns;
  const { role } = useSelector((state) => state.login);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);

  const [allPayslipList, setAllPayslipList] = useState([]);
  const [payslipListCount, setPayslipListCount] = useState(0);
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  // const [isExport, setIsExport] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleChangeMonth = (value) => {
    setMonth(value);
  };

  const handleChangeYear = (value) => {
    setYear(value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleClear = () => {
    setMonth('');
    setYear('');
    setSearch('');
  };

  const onClickSearch = () => {
    setLoader(true);
    setIsSearch(true);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {/* <Grid item xs="auto">
          <Button color="white" variant="outlined" size="small" onClick={onClickExport}>
        <Grid item xs="auto">
          <Button
            color="white"
            variant="outlined"
            size="small"
            onClick={onClickExport}
            disabled={loader}
            sx={loader && isExport && { height: '40px !important' }}
          >
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            {loader && isExport ? <CircularProgress color="inherit" /> : 'Export'}
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
          handleSearch={handleChangeSearch}
          handleClear={() => handleClear()}
          onClickSearch={() => onClickSearch()}
          loader={loader}
          isSearch={isSearch}
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
        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allPayslipList}
          rowsCount={payslipListCount}
          // onClickAction={(value, row) => onClickAction(value, row)}
          isAction
          // options={downloadOption}
          initialPage={page}
          onChangePage={(value) => onPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => onRowsPerPageChange(rowsPerPage)}
          sortKey={sortKey}
          sortOrder={sortOrder}
          handleRequestSort={(event, orderName, orderKey) => onSort(event, orderName, orderKey)}
        />
      </Card>
    </>
  );
};

export default Payslip;
