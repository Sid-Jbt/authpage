import React, { useContext, useEffect, useState } from 'react';
import { Card, Grid, FormLabel, FormControl } from '@mui/material';
// import { Check, ImportExportRounded } from '@mui/icons-material';
import Table from 'Elements/Tables/Table';
// import Button from 'Elements/Button';
import Select from 'Elements/Select';
import FilterLayout from 'Components/FilterLayout';
import { Months, Years } from 'Helpers/Global';
import { useSelector } from 'react-redux';
import payslipColumns from './data/payslipData';
import { SnackbarContext } from '../../Context/SnackbarProvider';
import { getPayslipList } from '../../APIs/Payslip';

// const EXPORT_URL = process.env.REACT_APP_EXPORT_URL;

const Payslip = () => {
  const { columns: prCols, adminColumns: adminPrCol } = payslipColumns;
  const { role } = useSelector((state) => state.route);
  const { setSnack } = useContext(SnackbarContext);
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
  const [isClear, setIsClear] = useState(false);
  // const [isExport, setIsExport] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const getAllPayslipList = async (
    selectedSortKey = 'id',
    selectedSortOrder = 'asc',
    selectedPage = 0,
    text = '',
    selectedMonth = '',
    selectedYear = '',
    count = 0,
    dataLimit = limit
  ) => {
    const payslipData = {
      limit: dataLimit,
      page: selectedPage,
      sortKey: selectedSortKey.toLowerCase(),
      sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      month: selectedMonth,
      year: selectedYear,
      count
    };
    const payslipRes = await getPayslipList(payslipData);
    const {
      status,
      data: { rows },
      message
    } = payslipRes;
    if (status) {
      setAllPayslipList(rows);
      setPayslipListCount(payslipRes.data.count);
      setLoader(false);
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        color: 'error',
        open: true
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllPayslipList();
  }, []);

  /* const onClickExport = async (
    // selectedSortKey = 'paymentMonth',
    // selectedSortOrder = 'asc',
    // selectedPage = 0,
    text = '',
    // selectedMonth = month,
    // selectedYear = year,
    count = 0,
    dataLimit = limit
  ) => {
    const exportData = {
      limit: dataLimit,
      page: 0,
      // sortKey: selectedSortKey.toLowerCase(),
      // sortOrder: selectedSortOrder.toLowerCase(),
      search: text,
      month: '',
      year: '',
      count
    };
    let exportRes;
    setIsExport(true);
    setLoader(true);
    if (role === 'admin') {
      // Replace with getExportPayslipLists
      // exportRes = await getEmployeePayslipExportList(exportData);
    } else {
      exportRes = await getEmployeePayslipExportList(exportData);
    }

    const { status, message, data } = exportRes;
    if (status) {
      setSnack({
        title: 'Success',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'success',
        open: true
      });
      setLoader(false);
      setIsExport(false);
      window.open(`${EXPORT_URL}/${data}`, '', 'width=900, height=900');
    } else {
      setSnack({
        title: 'Error',
        message,
        time: false,
        icon: <Check color="white" />,
        color: 'error',
        open: true
      });
      setLoader(false);
      setIsExport(false);
    }
    if (role === 'admin') {
      setSnack({
        title: 'Warning',
        message: 'Payslip list export coming soon...',
        time: false,
        icon: <Check color="white" />,
        color: 'warning',
        open: true
      });
      setLoader(false);
      setIsExport(false);
    }
  }; */

  const handleChangeMonth = (value) => {
    setMonth(value);
  };

  const handleChangeYear = (value) => {
    setYear(value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setMonth('');
    setYear('');
    setSearch('');
    setIsClear(!isClear);
    getAllPayslipList(sortKey, sortOrder, page, '', month, year);
  };

  const onClickSearch = () => {
    setLoader(true);
    setIsSearch(true);
    getAllPayslipList(sortKey, sortOrder, page, search, month.value, year.value, 0);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
    await getAllPayslipList(sortKey, sortOrder, selectedPage, month, year);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
    await getAllPayslipList(sortKey, sortOrder, '', '', '', '', 0, selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
    await getAllPayslipList(selectedSortKey, selectedSortOrder, page, month, year);
  };

  useEffect(() => {
    if (isClear) {
      getAllPayslipList(sortKey, sortOrder, page, '', month, year);
    }
  }, [isClear]);

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
