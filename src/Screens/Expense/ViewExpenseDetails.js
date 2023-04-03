import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import React from 'react';
import FormField from 'Elements/FormField';
import { Link } from 'react-router-dom';
import { getSupportTicketPattern } from '../../Routes/routeConfig';

const ViewExpenseDetails = ({ data, role, approveRejectReason }) => {
  let labels = [];
  const values = [];

  const viewData = Object.keys(data)
    .filter((key) => key !== 'itemName' && key !== 'id' && key !== 'comment' && key !== 'document')
    .reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

  Object.keys(viewData).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);
      labels.push(newElement);
    } else {
      labels.push(el);
    }
    labels = labels.filter((e) => e !== 'id');
    if (role !== 'admin') {
      labels = labels.filter((e) => e !== 'comment');
    }
  });

  // Push the object values into the values array
  Object.values(viewData).forEach((el) => values.push(el));

  // Render the card info items
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
        <Grid item xs={12} md={6}>
          {renderItems}
        </Grid>
        {data && data.document !== '' && (
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={data.document}
              alt="profile-image"
              height="150px"
              width="150px"
              sx={{ display: 'block', ml: 'auto', borderRadius: 2, cursor: 'pointer' }}
            />
          </Grid>
        )}
        <Grid item xs={12} pt={0}>
          {role === 'admin' ? (
            <FormField
              type="textarea"
              placeholder="Reason"
              label="Reason"
              defaultValue={data.comment}
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
              defaultValue={data.comment}
              multiline
              rows={5}
              errorFalse
              disabled
            />
          )}
        </Grid>
        {data.status === 'rejected' && (
          <Grid item xs={12}>
            <Box display="flex" py={0.5} pr={2}>
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
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ViewExpenseDetails;
