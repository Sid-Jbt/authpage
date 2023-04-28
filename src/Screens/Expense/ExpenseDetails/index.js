import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import React from 'react';
import FormField from 'Elements/FormField';
import { Link } from 'react-router-dom';
import { getSupportTicketPattern } from '../../../Routes/routeConfig';
import { CreateViewData } from '../../../Helpers/Global';

const ExpenseDetails = ({ data, isAdmin, approveRejectReason }) => {
  const { viewData, labels, values } = CreateViewData(data, [
    'comment',
    'itemName',
    'id',
    'document'
  ]);
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
        <Grid item xs={12} md={7}>
          {renderItems}
        </Grid>
        {data && data.document !== '' && (
          <Grid item xs={12} md={5}>
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
          {isAdmin &&
          viewData.hasOwnProperty('comment') &&
          (viewData.status === 'reject' || viewData.status === 'approved') ? (
            <>
              <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                Comment: &nbsp;
              </Typography>
              <Typography
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                {viewData.comment}
              </Typography>
            </>
          ) : isAdmin && viewData.status === 'pending' ? (
            <FormField
              type="textarea"
              placeholder="Reason"
              label="Reason"
              defaultValue={viewData.comment}
              onChange={(event) => approveRejectReason(event.target.value)}
              multiline
              rows={5}
              disabled={viewData.status === 'reject' || viewData.status === 'approved'}
            />
          ) : (
            !isAdmin && (
              <>
                {data.comment !== null && (
                  <>
                    <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                      Comment: &nbsp;
                    </Typography>
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      textTransform="capitalize"
                    >
                      {data.comment}
                    </Typography>
                  </>
                )}
                <Box sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
                  {viewData.status === 'reject' && (
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
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ExpenseDetails;
