import {
  ClearRounded,
  ExpandMoreTwoTone,
  FilterListTwoTone,
  SearchRounded
} from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Icon } from '@mui/material';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import React, { useState } from 'react';

const FilterLayout = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Accordion
        defaultExpanded
        onClick={handleChange}
        sx={{ background: 'transparent', boxShadow: 'none' }}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreTwoTone />}>
          <Grid container item xs={6}>
            <Icon>
              <FilterListTwoTone />
            </Icon>
            <Typography variant="h6" fontWeight="bold">
              Filter
            </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0, pb: 0 }}>
          <Grid container alignItems="flex-end" spacing={1}>
            {children}
            <Grid item sm={12} md={4} lg={3}>
              <Input
                placeholder="Search"
                type="text"
                label="Search"
                size="small"
                fullWidth
                id="search"
                name="search"
                errorFalse
              />
            </Grid>
            <Grid
              item
              sm={12}
              md={8}
              lg={4}
              sx={({ breakpoints }) => ({
                [breakpoints.down('lg' && 'md')]: {
                  marginBottom: 2
                }
              })}
            >
              <Button color="info" variant="gradient" size="small" sx={{ marginRight: '10px' }}>
                <Icon sx={{ mr: 1 }}>
                  <SearchRounded />
                </Icon>
                Search
              </Button>
              <Button color="error" variant="gradient" size="small">
                <Icon sx={{ mr: 1 }}>
                  <ClearRounded />
                </Icon>
                Clear
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterLayout;
