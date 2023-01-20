import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Icon, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Box from 'Elements/Box';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { item, itemIcon, itemIconBox, itemText } from './styles/sidenavItem';

const SidenavItem = ({ icon, name, active, open, type, child, ...rest }) => {
  const customization = useSelector((state) => state.customization);
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <ListItem component="li" sx={{ p: 0, pt: 1 }}>
        <Box
          {...rest}
          sx={(theme) => item(theme, { active, miniSidenav: customization.miniSidenav })}
          onClick={() => setCollapse(!collapse)}
        >
          <ListItemIcon sx={(theme) => itemIconBox(theme, { active })}>
            {typeof icon === 'string' ? (
              <Icon sx={(theme) => itemIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => itemText(theme, { miniSidenav: customization.miniSidenav, active })}
          />

          {type === 'collapse' ? collapse ? <ArrowDropUp /> : <ArrowDropDown /> : null}
        </Box>
      </ListItem>
      <Box>
        {child &&
          collapse &&
          child.map((item) => (
            <NavLink to={item.path} key={item.key} onClick={() => handleMiniSidenav()}>
              <SidenavItem name={item.name} icon={item.icon} active={false} />
            </NavLink>
          ))}
      </Box>
    </>
  );
};

SidenavItem.defaultProps = {
  color: 'info',
  active: false,
  open: false
};

export default SidenavItem;
