import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import React from 'react';
import { CreateViewData } from 'Helpers/Global';

const TimeActivityDetails = ({ data }) => {
  const { labels, values } = CreateViewData(data, ['screenShotUrl', 'id', 'dateTime']);
  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <Box key={label} display="flex" py={0.5} pr={2}>
      {label !== 'screenShotUrl' && (
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
        {data && data.screenShotUrl !== '' && (
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={data.screenShotUrl}
              alt="profile-image"
              height="150px"
              width="150px"
              sx={{ display: 'block', ml: 'auto', borderRadius: 2 }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default TimeActivityDetails;
