import Box from '../Box';
import Typography from '../Typography';
import Input from '../Input';

const FormField = ({ label, ...rest }) => (
  <>
    {label && (
      <Box ml={0.5} lineHeight={0} display="inline-block">
        <Typography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </Typography>
      </Box>
    )}
    <Input {...rest} />
  </>
);

export default FormField;
