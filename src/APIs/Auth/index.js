import axios from 'axios';
import { isTokenExpire, handleNetworkError, convertFormData } from '../API';

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
