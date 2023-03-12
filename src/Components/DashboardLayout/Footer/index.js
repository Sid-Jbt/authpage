import { FavoriteTwoTone } from '@mui/icons-material';
import { Link, Icon } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import typography from 'Theme/base/typography';

const Footer = ({ company, links }) => {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <Box key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <Typography variant="button" fontWeight="regular" color="text">
            {link.name}
          </Typography>
        </Link>
      </Box>
    ));

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: 'column', lg: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <Box fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            <FavoriteTwoTone />
          </Icon>
        </Box>
        by
        <Link href={href} target="_blank">
          <Typography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </Typography>
        </Link>
      </Box>
      <Box
        component="ul"
        sx={({ breakpoints }) => ({
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          listStyle: 'none',
          mt: 1,
          mb: 0,
          p: 0,

          [breakpoints.up('lg')]: {
            mt: 0
          }
        })}
      >
        {renderLinks()}
      </Box>
    </Box>
  );
};

Footer.defaultProps = {
  company: { href: 'https://www.jarvisbitz.com/', name: 'Jarvis Bitz Tech' },
  links: [
    { href: 'https://www.jarvisbitz.com/', name: 'Home' },
    { href: 'https://www.jarvisbitz.com/about', name: 'About Us' },
    { href: 'https://www.jarvisbitz.com/blog', name: 'Blog' }
  ]
};

export default Footer;
