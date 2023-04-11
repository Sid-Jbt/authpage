import React, { useEffect, useState } from 'react';
import { Card, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Months, Years } from 'Helpers/Global';
import { useOutletContext } from 'react-router';
import { FileDownloadRounded } from '@mui/icons-material';
import { payslipColumns } from 'StaticData/payslipData';

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
        limit: isNaN(limit) ? 0 : limit,
        month: month.value,
        year: year.value,
        search,
        page,
        sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
        sortOrder: sort.order
      },
      (res) => {
        if (res && res.data && res.data.data) {
          setAllPayslipList(res.data.data.rows);
          setPayslipListCount(res.data.data.count);
        }
      }
    );
    return () => {};
  }, [filter, page, sort, limit]);

  const handleClear = () => {
    setMonth('');
    setYear('');
    setSearch('');
    setFilter(!filter);
  };

  return (
    <Card
      sx={{
        background: ({ palette: { grey } }) => grey[100],
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
        boxShadow: ({ boxShadows: { md } }) => md
      }}
    >
      <FilterLayout
        search={search}
        handleSearch={(e) => setSearch(e.target.value)}
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
        isView={[
          {
            name: 4,
            tooltip: 'Click to download',
            color: 'info',
            icon: <FileDownloadRounded />,
            value: 'edit'
          }
        ]}
        initialPage={page}
        onChangePage={(value) => setPage(value)}
        rowsPerPage={isNaN(limit) ? payslipListCount : limit}
        onRowsPerPageChange={(rowsPerPage) => {
          setLimit(rowsPerPage);
        }}
        sortKey={sort.key}
        sortOrder={sort.order}
        handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
      />
    </Card>
  );
};

export default Payslip;
