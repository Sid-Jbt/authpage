import axios from 'axios';
import { convertFormData, queryString, isTokenExpire, handleNetworkError } from '../Helpers/Global';
import { store } from '../Redux/store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

export const employeeChangePassword = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/change-password`,
    method: 'PUT',
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
