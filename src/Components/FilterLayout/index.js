import {
  ClearRounded,
  ExpandMoreTwoTone,
  FilterListTwoTone,
  SearchRounded
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Icon,
  CircularProgress
} from '@mui/material';
import Button from 'Elements/Button';
import Typography from 'Elements/Typography';
import Input from 'Elements/Input';
import React, { useState } from 'react';

const FilterLayout = ({
  children,
  handleClear,
  search,
  handleSearch,
  onClickSearch,
  loader,
  isSearch
}) => {
  const [expanded, setExpanded] = useState(false);
  const innerWidth = window.innerWidth;

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Accordion
        defaultExpanded={innerWidth > 800}
        onClick={() => handleChange()}
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
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Input
                placeholder="Search"
                type="text"
                label="Search"
                size="small"
                fullWidth
                id="search"
                name="search"
                value={search}
                onChange={handleSearch}
                errorFalse
              />
            </Grid>
            <Grid
              item
              sm={12}
              md={8}
              lg={3}
              sx={({ breakpoints }) => ({
                [breakpoints.down('lg' && 'md')]: {
                  marginBottom: 2
                }
              })}
            >
              <Button
                color="info"
                size="small"
                disabled={loader}
                sx={
                  loader && isSearch
                    ? {
                        marginRight: '10px',
                        height: '2rem !important',
                        width: '48% !important'
                      }
                    : { marginRight: '10px' }
                }
                onClick={() => onClickSearch()}
              >
                <Icon sx={{ mr: 1 }}>
                  <SearchRounded />
                </Icon>
                {loader && isSearch ? <CircularProgress color="inherit" /> : 'Search'}
              </Button>
              <Button color="error" variant="gradient" size="small" onClick={() => handleClear()}>
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
