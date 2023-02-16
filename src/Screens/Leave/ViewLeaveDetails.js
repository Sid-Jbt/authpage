import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import React from 'react';
import FormField from 'Elements/FormField';

const ViewLeaveDetails = ({ info }) => {
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
    <Box key={label} display="flex" py={0.5} pr={2}>
      {label !== 'image' && (
        <>
          <Typography variant="button" fontWeight="bold" textTransform="capitalize">
            {label}: &nbsp;
          </Typography>
          <Typography variant="button" fontWeight="regular" color="text">
            &nbsp;{values[key]}
          </Typography>
        </>
      )}
    </Box>
  ));

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>{renderItems}</Grid>
        <Grid item xs={12}>
          <FormField
            type="textarea"
            placeholder="Please Enter the reason of approve or reject"
            label="Reason"
            multiline
            rows={5}
            errorFalse
            disabled={info !== null && info.status.props.badgeContent !== 'pending'}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ViewLeaveDetails;
