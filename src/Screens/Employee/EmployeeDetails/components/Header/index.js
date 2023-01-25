import {
  AccountBox,
  DeleteOutlineTwoTone,
  InfoTwoTone,
  PasswordTwoTone
} from '@mui/icons-material';
import Card from '@mui/material/Card';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';

const Header = () => {
  const sidenavItems = [
    { icon: <InfoTwoTone />, label: 'basic info', href: 'basic-info' },
    { icon: <AccountBox />, label: 'bank details', href: 'account-info' },
    // { icon: <CurrencyRupeeTwoTone />, label: 'salary details', href: 'salary-info' },
    { icon: <PasswordTwoTone />, label: 'change password', href: 'change-password' },
    {
      icon: <DeleteOutlineTwoTone />,
      label: 'delete account',
      href: 'delete-account'
    }
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;

    return (
      <Box key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
        <Typography
          component="a"
          href={`#${href}`}
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem, rgba },
            palette: { light },
            transitions
          }) => ({
            display: 'flex',
            alignItems: 'center',
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create('background-color', {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter
            }),

            '&:hover': {
              backgroundColor: rgba(light.main, 1)
            }
          })}
        >
          <Box fontSize="16px" color="secondary" mr={1.5} lineHeight={0}>
            {icon}
          </Box>
          {label}
        </Typography>
      </Box>
    );
  });

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: 'sticky',
        top: '12%'
      }}
    >
      <Box
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: 'none' }}
      >
        {renderSidenavItems}
      </Box>
    </Card>
  );
};

export default Header;
