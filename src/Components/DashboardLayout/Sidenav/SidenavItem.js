import { ArrowDropUp } from '@mui/icons-material';
import { Collapse, Icon, ListItem, ListItemText } from '@mui/material';
import Box from 'Elements/Box';
import { useSelector } from 'react-redux';
import { item, itemArrow, itemContent } from './styles/sidenavItem';

const SidenavItem = ({ name, active, nested, children, open, ...rest }) => {
  const customization = useSelector((state) => state.customization);
  const miniSidenav = customization.miniSidenav;
  return (
    <>
      <ListItem {...rest} component="li" sx={item}>
        <Box sx={(theme) => itemContent(theme, { active, miniSidenav, name, nested })}>
          <ListItemText primary={name} />
          {children && (
            <Icon component="i" sx={(theme) => itemArrow(theme, { open, miniSidenav })}>
              <ArrowDropUp />
            </Icon>
          )}
        </Box>
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
};

SidenavItem.defaultProps = {
  active: false,
  nested: false,
  children: false,
  open: false
};

export default SidenavItem;
