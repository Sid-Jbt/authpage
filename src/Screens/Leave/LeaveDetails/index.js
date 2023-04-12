import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import React from 'react';
import FormField from 'Elements/FormField';
import { Link } from 'react-router-dom';
import { getSupportTicketPattern } from '../../../Routes/routeConfig';
import { CreateViewData } from '../../../Helpers/Global';

const LeaveDetails = ({ data, role, approveRejectReason }) => {
  const { viewData, labels, values } = CreateViewData(data, ['leaveType', 'id', 'reason']);
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

      {role === 'admin' &&
      viewData.status !== 'pending' &&
      viewData.status === 'reject' &&
      viewData.status === 'approved' ? (
        <>
          <Typography variant="button" fontWeight="bold" textTransform="capitalize">
            Reason: &nbsp;
          </Typography>
          <Typography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
            {viewData.reason}
          </Typography>
        </>
      ) : role === 'admin' && viewData.status === 'pending' ? (
        <FormField
          type="textarea"
          placeholder="Enter the reason"
          defaultValue={viewData.comment}
          onChange={(event) => approveRejectReason(event.target.value)}
          multiline
          rows={5}
          disabled={viewData.status === 'reject' || viewData.status === 'approved'}
        />
      ) : (
        <>
          {viewData && viewData.reason && (
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
            </>
          )}

          {viewData.status === 'reject' && (
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
    </Box>
  );
};

export default LeaveDetails;
