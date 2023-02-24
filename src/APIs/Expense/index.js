import axios from 'axios';
import {
  convertFormData,
  queryString,
  isTokenExpire,
  handleNetworkError
} from '../../Helpers/Global';
import { store } from '../../Redux/store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getAllExpenseCount = async () =>
  axios({
    url: `${API_BASE_URL}/employee/expense/count`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const getExpenseLists = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/expense/list?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const addNewExpense = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/expense`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const updateExpense = async (data, id) =>
  axios({
    url: `${API_BASE_URL}/employee/expense/${id}`,
    method: 'PUT',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const deleteExpense = async (id) =>
  axios({
    url: `${API_BASE_URL}/employee/expense/${id}`,
    method: 'DELETE',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));

export const getEmployeeExpenseExportList = async (data) =>
  axios({
    url: `${API_BASE_URL}/expense/export?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));
