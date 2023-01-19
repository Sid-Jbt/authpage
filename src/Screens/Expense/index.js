import {
  Card,
  Drawer,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  MenuItem,
  Select
} from '@mui/material';
import {
  Add,
  ClearRounded,
  FilterListSharp,
  ImportExportRounded,
  SearchRounded
} from '@mui/icons-material';
import React, { useState } from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Table from '../../Elements/Table';
import expenseListData from './data/expenseListData';
import Input from '../../Elements/Input';

const Expense = () => {
  const { columns: prCols, rows: prRows } = expenseListData;
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenu = () => setOpenMenu(!openMenu);

  const renderMenu = () => (
    <Drawer
      anchor="right"
      open={Boolean(openMenu)}
      onClose={handleMenu}
      PaperProps={{
        sx: {
          width: 500
        }
      }}
    >
      <Typography variant="h4" sx={{ p: 1 }}>
        Expense List
      </Typography>
      <Box mb={0.5} p={1}>
        <Input
          placeholder="Item name"
          label="ITEM NAME"
          size="large"
          fullWidth
          id="item_name"
          name="item_name"
        />
      </Box>
      <Box mb={0.5} p={1}>
        <Input
          placeholder="Purchase from"
          label="PURCHASE FROM"
          size="large"
          fullWidth
          id="purchase_from"
          name="purchase_from"
        />
      </Box>
      <Box mb={0.5} p={1}>
        <Input
          placeholder="Purchase date"
          label="PURCHASE DATE"
          size="large"
          fullWidth
          id="purchase_date"
          name="purchase_date"
        />
      </Box>
      <Box mb={0.5} p={1}>
        <Input
          placeholder="Amount"
          label="AMOUNT"
          size="large"
          fullWidth
          id="amount"
          name="amount"
        />
      </Box>
      <Box mb={0.5} p={1}>
        <Input
          type="file"
          placeholder="Password"
          label="SELECT DOCUMENT"
          size="large"
          fullWidth
          id="select_document"
          name="select_document"
        />
      </Box>
      <Grid
        item
        sm={12}
        md={4}
        lg={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          p: 1,
          m: 1
        }}
      >
        <Button
          color="info"
          variant="contained"
          size="small"
          sx={{ marginRight: '10px' }}
          onClick={handleMenu}
        >
          <Icon sx={{ mr: '2px' }}>
            <Add />
          </Icon>
          Add
        </Button>
        <Button
          color="error"
          sx={{ marginRight: '10px' }}
          variant="contained"
          size="small"
          onClick={handleMenu}
        >
          <Icon sx={{ mr: '2px' }}>
            <ClearRounded />
          </Icon>
          Clear
        </Button>
      </Grid>
    </Drawer>
  );

  return (
    <Card
      mb={3}
      sx={{
        background: ({ palette: { grey } }) => grey[100],
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
        boxShadow: ({ boxShadows: { md } }) => md
      }}
    >
      <Grid container alignItems="center" spacing={2} p={2} pb={0}>
        <Grid container item sm={12} alignItems="center" justifyContent="space-between">
          <Typography variant="h3">Expense List</Typography>
          <Box>
            <Button
              color="info"
              variant="contained"
              size="small"
              sx={{ marginRight: '10px', marginLeft: '40px' }}
              onClick={handleMenu}
            >
              <Icon sx={{ mr: '2px' }}>
                <Add />
              </Icon>
              Add
            </Button>
          </Box>
        </Grid>
        <Grid container item xs={12}>
          <Icon>
            <FilterListSharp />
          </Icon>
          <Typography variant="h6">Filter</Typography>
        </Grid>
        <Grid item sm={12} md={4} lg={2}>
          <Input
            placeholder="Search"
            type="text"
            label="Search"
            size="small"
            fullWidth
            id="search"
            name="search"
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <Button color="info" variant="contained" size="small" sx={{ marginRight: '10px' }}>
            <Icon sx={{ mr: '2px' }}>
              <SearchRounded />
            </Icon>
            Search
          </Button>
          <Button color="error" variant="contained" size="small">
            <Icon sx={{ mr: '2px' }}>
              <ClearRounded />
            </Icon>
            Clear
          </Button>
        </Grid>
      </Grid>
      <Table columns={prCols} rows={prRows} />
      {renderMenu()}
    </Card>
  );
};
export default Expense;
