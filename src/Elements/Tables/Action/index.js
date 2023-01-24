import { useState } from 'react';
import { MoreVertTwoTone } from '@mui/icons-material';
import { Icon, Menu, MenuItem } from '@mui/material';

export const Action = ({ id, options, onClickAction }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      {options &&
        options.map(({ title, value }, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              onClickAction(value);
              handleCloseMenu();
            }}
          >
            {title}
          </MenuItem>
        ))}
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
