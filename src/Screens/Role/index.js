import DataTable from 'Elements/Tables/DataTable';
import React, { useEffect, useState } from 'react';
import { roleData } from 'StaticData/roleData';
import { Grid, Icon } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useNavigate, useOutletContext } from 'react-router';
import { getRoleDetailsPattern } from 'Routes/routeConfig';
import Button from 'Elements/Button';

const Role = () => {
  const { columns: prCols } = roleData;
  const { permission, GetRoleList } = useOutletContext();
  /* const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({ key: 'name', order: 'asc' }); */
  const [allRole, setAllRole] = useState([]);
  // const [roleCount, setRoleCount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    GetRoleList(
      {
        limit: 0
      },
      (res) => {
        if (res && res.data && res.data.data) {
          let { rows } = res.data.data;
          // const { count } = res.data.data;
          rows = rows.map(({ id, name, modules, ...rest }) => ({
            id,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            modules,
            action: name === 'admin' || name === 'employee' ? null : <Edit />,
            ...rest
          }));
          setAllRole(rows);
          // setRoleCount(count);
        }
      }
    );
    return () => {};
  }, []);

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {permission.role.w === 1 ? (
          <Grid item xs="auto">
            <Button
              color="white"
              variant="outlined"
              size="small"
              onClick={() => navigate(getRoleDetailsPattern('addRole'))}
            >
              <Icon sx={{ mr: 1 }}>
                <Add />
              </Icon>
              Add
            </Button>
          </Grid>
        ) : null}
      </Grid>
      {allRole.length > 0 && (
        <DataTable
          table={{ columns: prCols, rows: allRole }}
          canSearch
          entriesPerPage
          showTotalEntries
          noEndBorder
          onClickAction={(value) => navigate(getRoleDetailsPattern(value))}
        />
      )}
    </>
  );
};

export default Role;
