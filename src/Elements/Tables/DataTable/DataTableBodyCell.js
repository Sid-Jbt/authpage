import Box from 'Elements/Box';

const DataTableBodyCell = ({ noBorder, align, children }) => (
  <Box
    component="td"
    textAlign={align}
    py={1.5}
    px={3}
    sx={({ borders: { borderWidth, borderColor }, typography: { size } }) => ({
      fontSize: size.sm,
      borderBottom: noBorder ? 0 : `${borderWidth[1]} solid ${borderColor}`
    })}
  >
    <Box display="inline-block" width="max-content" color="text" sx={{ verticalAlign: 'middle' }}>
      {children}
    </Box>
  </Box>
);

DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: 'left'
};

export default DataTableBodyCell;
