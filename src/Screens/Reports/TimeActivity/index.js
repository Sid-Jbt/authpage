import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Grid } from '@mui/material';
import StaticCard from 'Components/CardLayouts/StaticCard';
import DefaultLineChart from 'Elements/Charts/LineCharts/DefaultLineChart';
import FilterLayout from 'Components/FilterLayout';
import Input from 'Elements/Input';
import Table from 'Elements/Tables/Table';
import { GraphicEqOutlined, RemoveRedEye } from '@mui/icons-material';
import { timeActivityListData } from 'StaticData/timeActivityListData';
import { defaultLineChartData } from 'StaticData/defaultLineChartData';
import { useOutletContext } from 'react-router';
import { Roles, userArray } from '../../../Helpers/Global';
import Select from '../../../Elements/Select';

const TimeActivity = () => {
  const { columns: prCols, adminColumns: adminPrCol } = timeActivityListData;
  const { role, GetEmployeeList } = useOutletContext();
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    if (role === 'admin') {
      GetEmployeeList({ limit: 0 }, (res) => {
        if (res && res.data && res.data.data) {
          setUserList(userArray(res.data.data.rows));
        }
      });
    }
  }, []);

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
          <FilterLayout>
            <Grid item xs={6} md={4} lg={3}>
              <Input
                type="date"
                label="From Date"
                size="small"
                fullWidth
                id="fromDate"
                name="fromDate"
              />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <Input type="date" label="To Date" size="small" fullWidth id="toDate" name="toDate" />
            </Grid>
            {role === 'admin' && (
              <>
                <Grid item sm={12} md={4} lg={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Select User</FormLabel>
                    <Select
                      size="small"
                      value={user}
                      options={userList}
                      onChange={(value) => setUser(value)}
                      renderValue={user !== '' ? undefined : () => 'Select...'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Select Role</FormLabel>
                    <Select
                      size="small"
                      value={selectedRole}
                      options={Roles}
                      onChange={(value) => setSelectedRole(value)}
                    />
                  </FormControl>
                </Grid>
              </>
            )}
          </FilterLayout>
          <Table
            columns={role === 'admin' ? adminPrCol : prCols}
            rows={[]}
            rowsCount={0}
            initialPage={0}
            rowsPerPage={10}
            isAction={role !== 'admin'}
            options={[{ name: 'view', title: 'View', value: 'view' }]}
            isView={
              role === 'admin' && [
                {
                  name: 3,
                  tooltip: 'Click to view',
                  color: 'info',
                  icon: <RemoveRedEye />,
                  value: 'view'
                }
              ]
            }
          />
        </Card>
      </Grid>
    </Grid>
  );
};
export default TimeActivity;
