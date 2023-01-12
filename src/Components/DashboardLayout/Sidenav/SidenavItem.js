import { Icon, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import { item, itemIcon, itemIconBox, itemText } from './styles/sidenavItem';

const SidenavItem = ({ icon, name, active, open, ...rest }) => {
  const customization = useSelector((state) => state.customization);

  return (
    <>
      <ListItem component="li" sx={{ p: 0, pt: 1 }}>
        <Box
          {...rest}
          sx={(theme) => item(theme, { active, miniSidenav: customization.miniSidenav })}
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
        </Box>
      </ListItem>
    </>
  );
};

SidenavItem.defaultProps = {
  color: 'info',
  active: false,
  open: false
};

export default SidenavItem;
