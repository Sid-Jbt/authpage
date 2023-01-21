import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import Icon from '@mui/material/Icon';
import Box from 'Elements/Box';

const DataTableHeadCell = ({ width, children, sorted, align, ...rest }) => (
  <Box
    component="th"
    width={width}
    py={1.5}
    px={3}
    sx={({ borders: { borderWidth, borderColor } }) => ({
      borderBottom: `${borderWidth[1]} solid ${borderColor}`
    })}
  >
    <Box
      {...rest}
      position="relative"
      textAlign={align}
      color="secondary"
      opacity={0.7}
      sx={({ typography: { size, fontWeightBold } }) => ({
        fontSize: size.xxs,
        fontWeight: fontWeightBold,
        textTransform: 'uppercase',
        cursor: sorted && 'pointer',
        userSelect: sorted && 'none'
      })}
    >
      {children}
      {sorted && (
        <Box
          position="absolute"
          top={0}
          right={align !== 'right' ? '16px' : 0}
          left={align === 'right' ? '-5px' : 'unset'}
          sx={({ typography: { size } }) => ({
            fontSize: size.lg
          })}
        >
          <Box
            position="absolute"
            top={-6}
            color={sorted === 'asce' ? 'text' : 'secondary'}
            opacity={sorted === 'asce' ? 1 : 0.5}
          >
            <Icon>
              <ArrowDropUp />
            </Icon>
          </Box>
          <Box
            position="absolute"
            top={0}
            color={sorted === 'desc' ? 'text' : 'secondary'}
            opacity={sorted === 'desc' ? 1 : 0.5}
          >
            <Icon>
              <ArrowDropDown />
            </Icon>
          </Box>
        </Box>
      )}
    </Box>
  </Box>
);

DataTableHeadCell.defaultProps = {
  width: 'auto',
  sorted: 'none',
  align: 'left'
};

export default DataTableHeadCell;
