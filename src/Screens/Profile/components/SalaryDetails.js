import React from 'react';
import { Card, Grid } from '@mui/material';
import Box from 'Elements/Box';
import Input from 'Elements/Input';

const SalaryDetails = () => (
  <Card>
    <Grid container spacing={1} p={2}>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="25000"
            size="large"
            fullWidth
            id="basic"
            name="basic"
            label="Basic"
            // value={values.basic}
            disabled
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="5%"
            size="large"
            fullWidth
            id="tds"
            name="tds"
            label="TDS"
            disabled
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="5000"
            size="large"
            fullWidth
            id="allowance"
            name="allowance"
            label="Allowance"
            disabled
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="1200"
            size="large"
            fullWidth
            id="pf"
            name="pf"
            label="Provident Fund"
            disabled
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="650"
            size="large"
            fullWidth
            id="esi"
            name="esi"
            label="ESI"
            disabled
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box>
          <Input
            type="text"
            placeholder="32500"
            size="large"
            fullWidth
            id="net"
            name="nte"
            label="New Amount"
            disabled
          />
        </Box>
      </Grid>
    </Grid>
  </Card>
);

export default SalaryDetails;
