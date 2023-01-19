import {
  Card,
  Drawer,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  MenuItem,
  Select,
  useTheme
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
import moment from 'moment';
import validationSchema from '../../Helpers/ValidationSchema';
import { Formik } from 'formik';

const Expense = () => {
  const theme = useTheme();
  const { columns: prCols, rows: prRows } = expenseListData;
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenu = () => setOpenMenu(!openMenu);

  const renderMenu = () => (
    <Formik
      enableReinitialize
      initialValues={{
        itemName: '',
        itemTitle: '',
        purchaseFrom: moment().format('DD/MM/YYYY'),
        purchaseDate: moment().format('DD/MM/YYYY'),
        amount: '',
        selectDoc: ''
      }}
      onSubmit={(values) => {
        console.log('ON SUBMIT');
        console.log('values===========', values);
      }}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
        console.log('values', values);
        console.log('handleSubmit', handleSubmit);
        return (
          <form onSubmit={handleSubmit} style={{ background: theme.palette.grey[100] }}>
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
              <Typography variant="h4" sx={{ p: 1, ml: 1 }}>
                ADD NEW EXPENSE
              </Typography>
              <Box mb={0.5} p={1} ml={1}>
                <Input
                  placeholder="Item name"
                  label="ITEM NAME"
                  size="large"
                  fullWidth
                  id="itemName"
                  name="itemName"
                  value={values.itemName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.itemName && touched.itemName && errors.itemName}
                  error={errors.itemName && touched.itemName}
                  success={!errors.itemName && touched.itemName}
                />
              </Box>
              <Box mb={0.5} p={1} ml={1}>
                <Input
                  placeholder="Item title"
                  label="ITEM TITLE"
                  size="large"
                  fullWidth
                  id="itemTitle"
                  name="itemTitle"
                  value={values.itemTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.itemTitle && touched.itemTitle && errors.itemTitle}
                  error={errors.itemTitle && touched.itemTitle}
                  success={!errors.itemTitle && touched.itemTitle}
                />
              </Box>
              <Box mb={0.5} p={1} ml={1}>
                <Input
                  placeholder="Purchase from"
                  label="PURCHASE FROM"
                  size="large"
                  fullWidth
                  id="purchaseFrom"
                  name="purchaseFrom"
                  value={values.purchaseFrom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.purchaseFrom && touched.purchaseFrom && errors.purchaseFrom}
                  error={errors.purchaseFrom && touched.purchaseFrom}
                  success={!errors.purchaseFrom && touched.purchaseFrom}
                />
              </Box>
              <Box mb={0.5} p={1} ml={1}>
                <Input
                  placeholder="Purchase date"
                  label="PURCHASE DATE"
                  size="large"
                  fullWidth
                  id="purchaseDate"
                  name="purchaseDate"
                  value={values.purchaseDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.purchaseDate && touched.purchaseDate && errors.purchaseDate}
                  error={errors.purchaseDate && touched.purchaseDate}
                  success={!errors.purchaseDate && touched.purchaseDate}
                />
              </Box>
              <Box mb={0.5} p={1} ml={1}>
                <Input
                  placeholder="Amount"
                  label="AMOUNT"
                  size="large"
                  fullWidth
                  id="amount"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.amount && touched.amount && errors.amount}
                  error={errors.amount && touched.amount}
                  success={!errors.amount && touched.amount}
                />
              </Box>
              <Box mb={0.5} p={1} ml={1}>
                <Input
                  type="file"
                  placeholder="Password"
                  label="SELECT DOCUMENT"
                  size="large"
                  fullWidth
                  id="selectDoc"
                  name="selectDoc"
                  value={values.selectDoc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.selectDoc && touched.selectDoc && errors.selectDoc}
                  error={errors.selectDoc && touched.selectDoc}
                  success={!errors.selectDoc && touched.selectDoc}
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
                  type="submit"
                  color="info"
                  variant="contained"
                  size="small"
                  sx={{ marginRight: '10px' }}
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
          </form>
        );
      }}
    </Formik>
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
