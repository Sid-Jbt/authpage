import axios from 'axios';
import { getLoginPattern } from '../Routes/routeConfig';
import { convertFormData, queryString } from '../Helpers/Global';
import { store } from '../Redux/store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const isTokenExpire = async (response) => {
  let apiResponse = null;
  if (response.statusText === 'OK') {
    try {
      apiResponse = await response.data;
    } catch (e) {
      apiResponse = null;
    }
  } else if (response.status === 401) {
    getLoginPattern();
  } else {
    apiResponse = await response.data;
  }
  return apiResponse;
};

const handleNetworkError = async (responseError) => {
  if (responseError.name !== 'AbortError') {
    console.log('Network request error. Please try again.');
  }
};

export const login = async (data) =>
  axios({
    url: `${API_BASE_URL}/login`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const companyForgotPassword = async (data) =>
  axios({
    url: `${API_BASE_URL}/forgot-password`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const companySignUp = async (data) =>
  axios({
    url: `${API_BASE_URL}/signup`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    data: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

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

export const companyResetPassword = async (data) =>
  axios({
    url: `${API_BASE_URL}/reset-forgot-password`,
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    data: await convertFormData(data)
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
