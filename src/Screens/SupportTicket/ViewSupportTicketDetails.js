import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import FormField from 'Elements/FormField';

const ViewSupportTicketDetails = ({ data, role, approveRejectReason }) => {
  const labels = [];
  const values = [];

  // Remove unwanted key-value pairs from object
  const viewData = Object.keys(data)
    .filter((key) => key !== 'subject' && key !== 'id')
    .reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(viewData).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(viewData).forEach((el) => {
    values.push(el);
  });

  // Render the card data items
  const renderItems = labels.map((label, key) => (
    <Box key={label} display="flex" py={0.5} pr={2}>
      {label !== 'image' && (
        <>
          <Typography variant="button" fontWeight="bold" textTransform="capitalize">
            {label}: &nbsp;
          </Typography>
          <Typography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
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
          {role === 'admin' ? (
            <FormField
              type="textarea"
              placeholder="Reason"
              label="Reason"
              defaultValue={viewData.reason}
              onChange={(event) => approveRejectReason(event.target.value)}
              multiline
              rows={5}
              errorFalse
              disabled={data.status === 'reject' || data.status === 'approved'}
            />
          ) : (
            <FormField
              type="textarea"
              placeholder="Reason"
              label="Reason"
              defaultValue={viewData.reason}
              multiline
              rows={5}
              errorFalse
              disabled
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ViewSupportTicketDetails;
