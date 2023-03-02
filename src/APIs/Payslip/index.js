import axios from 'axios';
import { store } from 'Redux/store';
import { queryString, isTokenExpire, handleNetworkError } from '../API';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getPayslipList = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/payslip/list?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));

export const getEmployeePayslipExportList = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/payslip/export?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));
