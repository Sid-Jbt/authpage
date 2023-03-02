import axios from 'axios';
import { store } from 'Redux/store';
import { convertFormData, queryString, isTokenExpire, handleNetworkError } from '../API';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getHolidayList = async (data) =>
  axios({
    url: `${API_BASE_URL}/holiday/list?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const addHoliday = async (data) =>
  axios({
    url: `${API_BASE_URL}/holiday`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const updateHoliday = async (data, id) =>
  axios({
    url: `${API_BASE_URL}/holiday/${id}`,
    method: 'PUT',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const deleteHoliday = async (id) =>
  axios({
    url: `${API_BASE_URL}/holiday/${id}`,
    method: 'DELETE',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));
