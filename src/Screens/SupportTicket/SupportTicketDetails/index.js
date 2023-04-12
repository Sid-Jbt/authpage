import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import FormField from 'Elements/FormField';
import { Link } from 'react-router-dom';
import { CreateViewData } from 'Helpers/Global';
import { getSupportTicketPattern } from 'Routes/routeConfig';

const SupportTicketDetails = ({ data, role, approveRejectReason }) => {
  const { viewData, labels, values } = CreateViewData(data, ['subject', 'id', 'reason']);

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
            {role !== 'admin' && data.comment !== null && (
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
            )}
            <Box sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
              {data.status === 'reject' && (
                <Typography
                  component={Link}
                  to={getSupportTicketPattern()}
                  variant="button"
                  color="warning"
                  fontWeight="bold"
                  underline="true"
                >
                  &nbsp; Support Ticket
                </Typography>
              )}
            </Box>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SupportTicketDetails;
