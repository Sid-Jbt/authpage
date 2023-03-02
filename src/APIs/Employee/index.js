import axios from 'axios';
import { store } from 'Redux/store';
import { isTokenExpire, handleNetworkError, convertFormData, queryString } from '../API';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getCompanyEmployee = async (data) =>
  axios({
    url: `${API_BASE_URL}/?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const addEmployee = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/signup`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const getEmployeeById = async (employeeId) =>
  axios({
    url: `${API_BASE_URL}/employee/${employeeId}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const updateEmployee = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/profile`,
    method: 'PUT',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));
