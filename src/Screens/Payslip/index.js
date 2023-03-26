/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Months, Years } from 'Helpers/Global';
import { useOutletContext } from 'react-router';
import payslipColumns from './data/payslipData';

const Payslip = () => {
  const { columns: prCols, adminColumns: adminPrCol } = payslipColumns;
  const { role, GetPayslipList } = useOutletContext();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [search, setSearch] = useState('');

  const [allPayslipList, setAllPayslipList] = useState([]);
  const [payslipListCount, setPayslipListCount] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  // const [isExport, setIsExport] = useState(false);
  const [sort, setSort] = useState({ key: 'id', order: 'asc' });
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    GetPayslipList(
      {
        limit,
        month: month.value,
        year: year.value,
        search,
        page,
        sortKey: sort.key,
        sortOrder: sort.order
      },
      (res) => {
        if (res && res.data && res.data.data) {
          setAllPayslipList(res.data.data.rows);
          setPayslipListCount(res.data.data.count);
          setFilter(false);
        }
      }
    );
    return () => {};
  }, [filter, page, sort]);

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
            {Loading && isExport ? <CircularProgress  size={20} color="inherit" /> : 'Export'}
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
          handleSearch={(e) => setSearch(e.target.value.trim())}
          handleClear={handleClear}
          onClickSearch={() => {
            setFilter(!filter);
          }}
        >
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              <Select value={month} options={Months} onChange={(value) => setMonth(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              <Select value={year} options={Years} onChange={(value) => setYear(value)} />
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
          onChangePage={(value) => setPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, orderKey, orderName) =>
            setSort({ order: orderName, key: orderKey })
          }
        />
      </Card>
    </>
  );
};

export default Payslip;
