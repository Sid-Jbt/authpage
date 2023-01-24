import { MoreVertTwoTone } from '@mui/icons-material';
import { Icon, Menu, MenuItem } from '@mui/material';
import Badge from 'Elements/Badge';
import { useState } from 'react';

const Action = ({ id }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);
  const handleEdit = () => {
    // child props to parent props data pass
    handleCloseMenu();
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleEdit}>Edit</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Another action</MenuItem>
      <MenuItem onClick={handleCloseMenu}>Something else here</MenuItem>
    </Menu>
  );
  return (
    <>
      <Icon
        id={id}
        sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        fontSize="small"
        onClick={handleOpenMenu}
      >
        <MoreVertTwoTone />
      </Icon>
      {renderMenu()}
    </>
  );
};

const leaveListData = {
  columns: [
    { name: 'id', align: 'center', headerName: 'Id' },
    { name: 'leaveType', align: 'center', headerName: 'Leave Type' },
    { name: 'from', align: 'center', headerName: 'From' },
    { name: 'to', align: 'center', headerName: 'To' },
    { name: 'noOfDays', align: 'center', headerName: 'No Of Days' },
    { name: 'reason', align: 'center', headerName: 'Reason' },
    { name: 'status', align: 'center', headerName: 'Status' },
    { name: 'approvedBy', align: 'center', headerName: 'Approved By' },
    { name: 'action', align: 'center', headerName: 'Action' }
  ],

  rows: [
    {
      id: 1,
      leaveType: 'Sick Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: 'Suresh Borad',
      action: <Action id={1} />
    },
    {
      id: 2,
      leaveType: 'Loss Of Pay Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="rejected" color="error" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 3,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="pending" color="warning" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 4,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    },
    {
      id: 5,
      leaveType: 'Medical Leave',
      from: '27 Feb 2019',
      to: '27 Feb 2019',
      noOfDays: '1 day',
      reason: 'Going To Hospital',
      status: (
        <Badge variant="gradient" badgeContent="approved" color="success" size="xs" container />
      ),
      approvedBy: 'Suresh Borad'
    }
  ]
};

export default leaveListData;
