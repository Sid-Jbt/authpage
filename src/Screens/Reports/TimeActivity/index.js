import React, { useEffect, useState } from 'react';
import { Card, FormControlLabel, Grid, Radio, RadioGroup, useTheme } from '@mui/material';
import StaticCard from 'Components/CardLayouts/StaticCard';
import DefaultLineChart from 'Elements/Charts/LineCharts/DefaultLineChart';
import FilterLayout from 'Components/FilterLayout';
import Input from 'Elements/Input';
import Table from 'Elements/Tables/Table';
import { RemoveRedEye } from '@mui/icons-material';
import { timeActivityListData } from 'StaticData/timeActivityListData';
import { defaultLineChartData } from 'StaticData/defaultLineChartData';
import { useOutletContext } from 'react-router';
import { rolesArray, userArray } from 'Helpers/Global';
import Select from 'Elements/Select';
import moment from 'moment';
import ViewDetailedReport from './ViewDetailedReport';

const TimeActivity = () => {
  const { columns: prCols, adminColumns: adminPrCol } = timeActivityListData;
  const theme = useTheme();
  const {
    GetEmployeeList,
    GetRoleList,
    permission,
    GetTimeActivityReportList,
    GetTimeActivityById,
    Loading
  } = useOutletContext();
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState({ key: 'dateTime', order: 'asc' });
  const [page, setPage] = useState(0);
  const [allRoles, setAllRoles] = useState([]);
  const [allTimeActivityList, setAllTimeActivityList] = useState([]);
  const [timeActivityListCount, setTimeActivityListCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedData, setSelectedData] = useState(null);
  // const [isViewTimeActivityDialogOpen, setIsViewTimeActivityDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAdmin =
    permission &&
    permission.organisation &&
    Object.values(permission.organisation).some((x) => x === 1) &&
    Object.values(permission.reports).some((x) => x === 1);

  const [filterData, setFilterData] = useState({
    search: '',
    startDate: '',
    endDate: '',
    user: '',
    selectedRole: '',
    radioDate: 'custom'
  });

  const isValues = !(
    filterData.search === '' &&
    filterData.startDate === '' &&
    filterData.endDate === '' &&
    filterData.user === '' &&
    filterData.selectedRole.value === '' &&
    filterData.radioDate === 'custom'
  );

  useEffect(() => {
    if (isAdmin) {
      GetEmployeeList({ limit: 0 }, (res) => {
        if (res && res.data && res.data.data) {
          setUserList(userArray(res.data.data.rows));
          setFilterData({ ...filterData, user: userArray(res.data.data.rows)[0] });
        }
      });
      GetRoleList({ limit: 0 }, (res) => {
        if (res && res.data && res.data.data) {
          setAllRoles(rolesArray(res.data.data.rows, true));
          setFilterData({ ...filterData, selectedRole: rolesArray(res.data.data.rows, true)[0] });
        }
      });
    }
  }, []);

  useEffect(() => {
    GetTimeActivityReportList(
      {
        limit: isNaN(limit) ? 0 : limit,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        search: filterData.search,
        role: filterData.selectedRole.id,
        user: filterData.user.value,
        page,
        sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
        sortOrder: sort.order
      },
      (res) => {
        if (res && res.data && res.data.data) {
          setAllTimeActivityList(res.data.data.rows);
          setTimeActivityListCount(res.data.data.count);
        }
      }
    );
  }, [filter, page, sort, limit]);

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
      selectedRole: allRoles.length > 0 ? allRoles[0] : '',
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
      {/* <Grid item xs={12} md={4}>
        <StaticCard title="Graph" count={false} icon={<GraphicEqOutlined />} isPercentage={false} />
      </Grid> */}
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
            handleClear={() => isValues && handleClear()}
            isDisable={!isValues && timeActivityListCount && timeActivityListCount.length <= 0}
            onClickSearch={() => isValues && setFilter(!filter)}
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
            {isAdmin && (
              <>
                <Grid item sm={12} md={4} lg={3}>
                  <Select
                    label="Select User"
                    size="small"
                    renderValue={filterData.user !== '' ? undefined : () => 'Select...'}
                    value={filterData.user}
                    options={userList}
                    onChange={(value) => setFilterData({ ...filterData, user: value })}
                  />
                </Grid>
                {allRoles.length > 0 && (
                  <Grid item xs={12} md={4} lg={3}>
                    <Select
                      label="Select Role"
                      size="small"
                      value={filterData.selectedRole}
                      options={allRoles}
                      onChange={(value) => setFilterData({ ...filterData, selectedRole: value })}
                    />
                  </Grid>
                )}
              </>
            )}
          </FilterLayout>
          <Table
            columns={isAdmin ? adminPrCol : prCols}
            rows={allTimeActivityList}
            rowsCount={timeActivityListCount}
            onClickAction={(value, { id }) => {
              GetTimeActivityById(id, (res) => {
                if (res && res.data && res.data.data) {
                  const { data } = res.data;
                  const setViewData = {
                    id: data.id,
                    mouseClick: data.mouseClick,
                    pressCount: data.pressCount,
                    score: data.score,
                    dateTime: data.dateTime,
                    screenShotUrl: data.screenShotUrl
                  };
                  setSelectedData(setViewData);
                  if (value === 'view') {
                    // setIsViewTimeActivityDialogOpen(true);
                    setIsDialogOpen(true);
                  }
                }
              });
            }}
            isAction={!isAdmin}
            options={[{ name: 'view', title: 'View', value: 'view' }]}
            isView={
              isAdmin && [
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
            rowsPerPage={isNaN(limit) ? timeActivityListCount : limit}
            onRowsPerPageChange={(rowsPerPage) => setLimit(rowsPerPage)}
            sortKey={sort.key}
            sortOrder={sort.order}
            handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
          />
        </Card>
      </Grid>

      {isDialogOpen && selectedData && (
        <ViewDetailedReport
          isDialogOpen={isDialogOpen}
          handleDialog={() => setIsDialogOpen(false)}
          Loading={Loading}
          dataReport={selectedData}
        />
      )}

      {/* {isViewTimeActivityDialogOpen && selectedData && (
        <DialogMenu
          isOpen={isViewTimeActivityDialogOpen}
          onClose={() => {
            setIsViewTimeActivityDialogOpen(false);
            setSelectedData(null);
          }}
          dialogTitle={selectedData.dateTime}
          dialogContent={
            <DialogContent customContent={<TimeActivityDetails data={selectedData} />} />
          }
        />
      )} */}
    </Grid>
  );
};
export default TimeActivity;
