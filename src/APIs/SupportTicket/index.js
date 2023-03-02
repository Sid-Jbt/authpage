import axios from 'axios';
import { store } from 'Redux/store';
import { queryString, isTokenExpire, handleNetworkError, convertFormData } from '../API';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getSupportTicketLists = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/support-ticket/list?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const addNewSupportTicket = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/support-ticket`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const updateSupportTicket = async (data, id) =>
  axios({
    url: `${API_BASE_URL}/employee/support-ticket/${id}`,
    method: 'PUT',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const getEmployeeTicketExportList = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/support-ticket/export-list?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));
