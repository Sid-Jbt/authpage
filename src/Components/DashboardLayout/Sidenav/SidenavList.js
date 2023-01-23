import List from '@mui/material/List';

const SidenavList = ({ children }) => (
  <List
    sx={{
      pl: 2,
      ml: 3
    }}
  >
    {children}
  </List>
);

export default SidenavList;
