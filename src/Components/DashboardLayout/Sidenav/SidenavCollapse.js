import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';

import Box from 'Elements/Box';

import { ArrowDropUp } from '@mui/icons-material';
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow
} from './styles/sidenavCollapse';

const SidenavCollapse = ({
  icon,
  name,
  children,
  active,
  noCollapse,
  open,
  miniSidenav,
  ...rest
}) => (
  <>
    <ListItem component="li">
      <Box {...rest} sx={(theme) => collapseItem(theme, { active, miniSidenav })}>
        <ListItemIcon sx={(theme) => collapseIconBox(theme, { active })}>
          {typeof icon === 'string' ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
          ) : (
            icon
          )}
        </ListItemIcon>
        {console.log(miniSidenav)}

        <ListItemText primary={name} sx={(theme) => collapseText(theme, { miniSidenav, active })} />

        <Icon sx={(theme) => collapseArrow(theme, { noCollapse, miniSidenav, open })}>
          <ArrowDropUp />
        </Icon>
      </Box>
    </ListItem>
    {children && (
      <Collapse in={open} unmountOnExit>
        {children}
      </Collapse>
    )}
  </>
);

SidenavCollapse.defaultProps = {
  color: 'info',
  active: false,
  noCollapse: false,
  children: false,
  open: false
};

export default SidenavCollapse;
