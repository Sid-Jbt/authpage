import React from 'react';
import { Grid, Card } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';

const PrivacyPolicy = () => (
  <Card align="center">
    <Typography variant="h1" fontWeights="bold">
      TERMS OF SERVICE
    </Typography>
    <Box sx={{ background: 'black', width: '15%', borderRadius: '10px', alignSelf: 'center' }}>
      <Typography variant="body2" fontWeight="light" color="white" fontSize="0.7rem">
        Updated 12 Jan, 2023
      </Typography>
    </Box>
    <Grid container>
      <Grid
        item
        lg={12}
        xl={12}
        sx={{ mx: 'auto', background: 'white', borderRadius: '8px' }}
        mt={3}
      >
        <Box position="relative">
          <Box mb={1}>
            <Typography
              variant="h4"
              color="black"
              fontWeight="regular"
              fontSize="1rem"
              justifyContent="center"
              textAlign="justify"
              padding="4%"
              paddingBottom="1%"
            >
              The Terms of Service Agreement is mainly used for legal purposes by companies which
              provide software or services, such as web browsers, e-commerce, web search engines,
              social media, and transport services. A legitimate terms-of-service agreement is
              legally binding and may be subject to change. Companies can enforce the terms by
              refusing service. Customers can enforce by filing a lawsuit or arbitration case if
              they can show they were actually harmed by a breach of the terms. There is a
              heightened risk of data going astray during corporate changes, including mergers,
              divestitures, buyouts, downsizing, etc., when data can be transferred improperly.
            </Typography>
            <Typography
              variant="h4"
              color="black"
              fontWeight="regular"
              fontSize="1rem"
              justifyContent="center"
              textAlign="justify"
              padding="4%"
              paddingTop="0.5%"
              paddingBottom="1%"
            >
              The Terms of Service Agreement is mainly used for legal purposes by companies which
              provide software or services, such as web browsers, e-commerce, web search engines,
              social media, and transport services. A legitimate terms-of-service agreement is
              legally binding and may be subject to change. Companies can enforce the terms by
              refusing service. Customers can enforce by filing a lawsuit or arbitration case if
              they can show they were actually harmed by a breach of the terms. There is a
              heightened risk of data going astray during corporate changes, including mergers,
              divestitures, buyouts, downsizing, etc., when data can be transferred improperly.
            </Typography>
            <Typography
              variant="h4"
              color="black"
              fontWeight="regular"
              fontSize="1rem"
              justifyContent="center"
              textAlign="justify"
              padding="4%"
              paddingTop="0.5%"
              paddingBottom="1%"
            >
              The Terms of Service Agreement is mainly used for legal purposes by companies which
              provide software or services, such as web browsers, e-commerce, web search engines,
              social media, and transport services. A legitimate terms-of-service agreement is
              legally binding and may be subject to change. Companies can enforce the terms by
              refusing service. Customers can enforce by filing a lawsuit or arbitration case if
              they can show they were actually harmed by a breach of the terms. There is a
              heightened risk of data going astray during corporate changes, including mergers,
              divestitures, buyouts, downsizing, etc., when data can be transferred improperly.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Card>
);

export default PrivacyPolicy;
