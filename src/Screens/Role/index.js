import DataTable from 'Elements/Tables/DataTable';
import React from 'react';
import { roleData } from 'StaticData/roleData';

const Role = () => {
  const { columns: prCols, rows: prRows } = roleData;

  return (
    <>
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
