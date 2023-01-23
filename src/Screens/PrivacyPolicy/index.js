import React, { useState } from 'react';
import { Grid, Card, Checkbox, FormControlLabel } from '@mui/material';
import Box from 'Elements/Box';
import Badge from 'Elements/Badge';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';

const PrivacyPolicy = () => {
  const [isCheck, setIsCheck] = useState(false);

  const handleIsChecked = () => setIsCheck(!isCheck);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h1" fontWeights="bold">
          TERMS OF SERVICE
        </Typography>
        <Badge
          variant="gradient"
          badgeContent="Updated 12 Jan, 2023"
          color="dark"
          size="xs"
          container
        />
      </Box>
      <Card align="center" sx={{ mt: 2, p: 5 }}>
        <Typography
          variant="h4"
          color="black"
          fontWeight="regular"
          fontSize="1rem"
          justifyContent="center"
          textAlign="justify"
          sx={{ mb: 1 }}
        >
          The Terms of Service Agreement is mainly used for legal purposes by companies which
          provide software or services, such as web browsers, e-commerce, web search engines, social
          media, and transport services. A legitimate terms-of-service agreement is legally binding
          and may be subject to change. Companies can enforce the terms by refusing service.
          Customers can enforce by filing a lawsuit or arbitration case if they can show they were
          actually harmed by a breach of the terms. There is a heightened risk of data going astray
          during corporate changes, including mergers, divestitures, buyouts, downsizing, etc., when
          data can be transferred improperly.
        </Typography>
        <Typography
          variant="h4"
          color="black"
          fontWeight="regular"
          fontSize="1rem"
          justifyContent="center"
          textAlign="justify"
          sx={{ mb: 1 }}
        >
          The Terms of Service Agreement is mainly used for legal purposes by companies which
          provide software or services, such as web browsers, e-commerce, web search engines, social
          media, and transport services. A legitimate terms-of-service agreement is legally binding
          and may be subject to change. Companies can enforce the terms by refusing service.
          Customers can enforce by filing a lawsuit or arbitration case if they can show they were
          actually harmed by a breach of the terms. There is a heightened risk of data going astray
          during corporate changes, including mergers, divestitures, buyouts, downsizing, etc., when
          data can be transferred improperly.
        </Typography>
        <Typography
          variant="h4"
          color="black"
          fontWeight="regular"
          fontSize="1rem"
          justifyContent="center"
          textAlign="justify"
        >
          The Terms of Service Agreement is mainly used for legal purposes by companies which
          provide software or services, such as web browsers, e-commerce, web search engines, social
          media, and transport services. A legitimate terms-of-service agreement is legally binding
          and may be subject to change. Companies can enforce the terms by refusing service.
          Customers can enforce by filing a lawsuit or arbitration case if they can show they were
          actually harmed by a breach of the terms. There is a heightened risk of data going astray
          during corporate changes, including mergers, divestitures, buyouts, downsizing, etc., when
          data can be transferred improperly.
        </Typography>
        <Grid item xs={12} md={6} lg={4}>
          <FormControlLabel
            control={<Checkbox onClick={handleIsChecked} />}
            label="I accept Terms Of Service"
          />
          <Box mt={1}>
            <Button variant="contained" color="info" size="large" type="submit" disabled={!isCheck}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Card>
    </>
  );
};

export default PrivacyPolicy;
