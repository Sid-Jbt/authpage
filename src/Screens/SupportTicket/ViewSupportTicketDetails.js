import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import FormField from 'Elements/FormField';
import { Link } from 'react-router-dom';
import { getSupportTicketPattern } from '../../Routes/routeConfig';

const ViewSupportTicketDetails = ({ data, role, approveRejectReason }) => {
  const labels = [];
  const values = [];

  // Remove unwanted key-value pairs from object
  const viewData = Object.keys(data)
    .filter((key) => key !== 'subject' && key !== 'id' && key !== 'reason')
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
    <Box sx={{ width: 400 }}>
      {renderItems}
      <Grid item xs={12}>
        {role === 'admin' && (data.status === 'reject' || data.status === 'approved') ? (
          <>
            <Typography variant="button" fontWeight="bold" textTransform="capitalize">
              Reason: &nbsp;
            </Typography>
            <Typography
              variant="button"
              fontWeight="regular"
              color="text"
              textTransform="capitalize"
            >
              {data.reason}
            </Typography>
          </>
        ) : role === 'admin' ? (
          <FormField
            type="textarea"
            placeholder="Reason"
            label="Reason"
            defaultValue={viewData.reason}
            onChange={(event) => approveRejectReason(event.target.value)}
            multiline
            rows={5}
            disabled={data.status === 'reject' || data.status === 'approved'}
          />
        ) : (
          <>
            <Typography variant="button" fontWeight="bold" textTransform="capitalize">
              Reason: &nbsp;
            </Typography>
            <Typography
              variant="button"
              fontWeight="regular"
              color="text"
              textTransform="capitalize"
            >
              {viewData.reason}
            </Typography>
            {data.status === 'reject' && (
              <Typography
                component={Link}
                to={getSupportTicketPattern()}
                variant="button"
                color="info"
                fontWeight="medium"
                underline="true"
              >
                &nbsp; Support Ticket
              </Typography>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ViewSupportTicketDetails;
