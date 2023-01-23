import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { TextField, Grid } from '@mui/material';
import React from 'react';

const ExpenseInfoDetails = ({ info, onClose }) => {
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <Box key={label} display="flex" py={1} pr={2}>
      <Typography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </Typography>
      {label === 'image' ? (
        <img src={values[key]} alt="person" width="50%" />
      ) : (
        <Typography variant="button" fontWeight="regular" color="text">
          &nbsp;{values[key]}
        </Typography>
      )}
    </Box>
  ));

  return (
    <Box sx={{ height: '100%' }}>
      <Box p={1}>
        <Box>{renderItems}</Box>
        <Box display="flex" py={1} pr={2}>
          <Typography variant="button" fontWeight="bold" textTransform="capitalize">
            Message: &nbsp;
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { width: '25ch' }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-multiline-static" placeholder="Message" multiline rows={6} />
          </Box>
        </Box>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Button
            type="submit"
            color="info"
            variant="contained"
            size="small"
            sx={{ marginRight: '10px', alignItems: 'center' }}
            onClick={onClose}
          >
            Approved
          </Button>
          <Button
            color="error"
            sx={{ marginRight: '10px', alignItems: 'center' }}
            variant="contained"
            size="small"
            onClick={onClose}
          >
            Reject
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default ExpenseInfoDetails;
