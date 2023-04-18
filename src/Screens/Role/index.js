import DataTable from 'Elements/Tables/DataTable';
import React from 'react';
import { roleData } from 'StaticData/roleData';
import { Grid, Icon } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate, useOutletContext } from 'react-router';
import { getAddRolePattern } from 'Routes/routeConfig';
import Button from 'Elements/Button';

const Role = () => {
  const { columns: prCols, rows: prRows } = roleData;
  const { role } = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {role === 'admin' ? (
          <Grid item xs="auto">
            <Button
              color="white"
              variant="outlined"
              size="small"
              onClick={() => navigate(getAddRolePattern())}
            >
              <Icon sx={{ mr: 1 }}>
                <Add />
              </Icon>
              Add
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <DataTable
        table={{ columns: prCols, rows: prRows }}
        canSearch
        entriesPerPage
        showTotalEntries
        noEndBorder
      />
    </>
  );
};

export default Role;
