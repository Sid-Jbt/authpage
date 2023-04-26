import React, { useEffect, useState } from 'react';
import {
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  useTheme
} from '@mui/material';
import StaticCard from 'Components/CardLayouts/StaticCard';
import DefaultLineChart from 'Elements/Charts/LineCharts/DefaultLineChart';
import FilterLayout from 'Components/FilterLayout';
import Input from 'Elements/Input';
import Table from 'Elements/Tables/Table';
import { GraphicEqOutlined, RemoveRedEye } from '@mui/icons-material';
import { timeActivityListData } from 'StaticData/timeActivityListData';
import { defaultLineChartData } from 'StaticData/defaultLineChartData';
import { useOutletContext } from 'react-router';
import { Roles, userArray } from 'Helpers/Global';
import Select from 'Elements/Select';
import moment from 'moment';

const TimeActivity = () => {
  const { columns: prCols, adminColumns: adminPrCol } = timeActivityListData;
  const theme = useTheme();
  const { GetEmployeeList, permission } = useOutletContext();
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState({ key: 'email', order: 'asc' });
  const [page, setPage] = useState(0);
  const reportPermissionStatus =
    permission &&
    permission.reports &&
    permission.reports.r &&
    permission.reports.w &&
    permission.reports.u &&
    permission.reports.d;

  const [filterData, setFilterData] = useState({
    search: '',
    startDate: '',
    endDate: '',
    user: '',
    selectedRole: Roles[0],
    radioDate: 'custom'
  });

  useEffect(() => {
    if (reportPermissionStatus) {
      GetEmployeeList({ limit: 0 }, (res) => {
        if (res && res.data && res.data.data) {
          setUserList(userArray(res.data.data.rows));
          setFilterData({ ...filterData, user: userArray(res.data.data.rows)[0] });
        }
      });
    }
  }, []);

  const setDateOnRadioPress = () => {
    const date = new Date();
    if (filterData.radioDate === 'previous') {
      const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);
      setFilterData({
        ...filterData,
        startDate: moment(firstDay).format('YYYY-MM-DD'),
        endDate: moment(lastDay).format('YYYY-MM-DD')
      });
    } else if (filterData.radioDate === 'current') {
      date.setMonth(date.getMonth() + 1);
      const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);
      setFilterData({
        ...filterData,
        startDate: moment(firstDay).format('YYYY-MM-DD'),
        endDate: moment(lastDay).format('YYYY-MM-DD')
      });
    } else {
      setFilterData({
        ...filterData,
        startDate: '',
        endDate: ''
      });
    }
  };

  const handleClear = () => {
    setFilterData({
      search: '',
      startDate: '',
      endDate: '',
      user: userList.length > 0 ? userList[0] : '',
      selectedRole: Roles[0],
      radioDate: 'custom'
    });
    setFilter(!filter);
  };

  useEffect(() => {
    setDateOnRadioPress();
  }, [filterData.radioDate]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <StaticCard title="Time" count="01:00:00" icon={false} isPercentage={false} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StaticCard title="Avg. Activity" count="41%" icon={false} isPercentage={false} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StaticCard title="Graph" count={false} icon={<GraphicEqOutlined />} isPercentage={false} />
      </Grid>
      <Grid item xs={12}>
        <DefaultLineChart title="Line chart" chart={defaultLineChartData} />
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            background: ({ palette: { grey } }) => grey[100],
            borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            boxShadow: ({ boxShadows: { md } }) => md
          }}
        >
          <FilterLayout
            search={filterData.search}
            handleSearch={(e) => setFilterData({ ...filterData, search: e.target.value })}
            handleClear={() => handleClear()}
            isDisable
            // TODO: Once data fetch in state after that disable is dynamic
            onClickSearch={() => setFilter(!filter)}
          >
            <Grid item xs={6} md={4} lg={3}>
              <Input
                type="date"
                label="From Date"
                size="small"
                fullWidth
                id="fromDate"
                name="fromDate"
                inputProps={{
                  min: moment().subtract(50, 'Y').format('YYYY-MM-DD')
                }}
                errorFalse
                value={filterData.startDate}
                onChange={(e) => setFilterData({ ...filterData, startDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <Input
                type="date"
                label="To Date"
                size="small"
                fullWidth
                id="toDate"
                name="toDate"
                errorFalse
                inputProps={{
                  min: filterData.startDate
                }}
                value={filterData.endDate}
                onChange={(e) => setFilterData({ ...filterData, endDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3} display="contents">
              <RadioGroup
                row
                sx={{ p: 2, pt: 0, pb: 0, columnGap: 2 }}
                aria-label="font-family"
                name="radioDate"
                value={filterData.radioDate}
                onChange={(e) => setFilterData({ ...filterData, radioDate: e.target.value })}
              >
                <FormControlLabel
                  value="custom"
                  control={<Radio />}
                  label="Custom Date"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                  }}
                />
                <FormControlLabel
                  value="previous"
                  control={<Radio />}
                  label="Previous Month"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                  }}
                />
                <FormControlLabel
                  value="current"
                  control={<Radio />}
                  label="Current Month"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                  }}
                />
              </RadioGroup>
            </Grid>
            {reportPermissionStatus && (
              <>
                <Grid item sm={12} md={4} lg={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Select User</FormLabel>
                    <Select
                      size="small"
                      renderValue={filterData.user !== '' ? undefined : () => 'Select...'}
                      value={filterData.user}
                      options={userList}
                      onChange={(value) => setFilterData({ ...filterData, user: value })}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Select Role</FormLabel>
                    <Select
                      size="small"
                      value={filterData.selectedRole}
                      options={Roles}
                      onChange={(value) => setFilterData({ ...filterData, selectedRole: value })}
                    />
                  </FormControl>
                </Grid>
              </>
            )}
          </FilterLayout>
          <Table
            columns={reportPermissionStatus ? adminPrCol : prCols}
            rows={[]}
            rowsCount={0}
            rowsPerPage={10}
            isAction={!reportPermissionStatus}
            options={[{ name: 'view', title: 'View', value: 'view' }]}
            isView={
              reportPermissionStatus && [
                {
                  name: 3,
                  tooltip: 'Click to view',
                  color: 'info',
                  icon: <RemoveRedEye />,
                  value: 'view'
                }
              ]
            }
            initialPage={page}
            onChangePage={(value) => setPage(value)}
            // rowsPerPage={isNaN(limit) ? employeeCount : limit}
            // onRowsPerPageChange={(rowsPerPage) => setLimit(rowsPerPage)}
            onRowsPerPageChange={10}
            sortKey={sort.key}
            sortOrder={sort.order}
            handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
export default TimeActivity;
