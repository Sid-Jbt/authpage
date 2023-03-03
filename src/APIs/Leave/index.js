import axios from 'axios';
import { store } from 'Redux/store';
import { convertFormData, queryString, isTokenExpire, handleNetworkError } from '../API';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getLeaveLists = async (data) =>
  axios({
    url: `${API_BASE_URL}/leave?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const addNewLeave = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/leave`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const updateLeave = async (data, data21) =>
  axios({
    url: `${API_BASE_URL}/employee/leave?${queryString(data21)}`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const deleteLeave = async (id) =>
  axios({
    url: `${API_BASE_URL}/employee/leave/${id}`,
    method: 'DELETE',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));
