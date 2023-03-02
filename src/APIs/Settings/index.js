import axios from 'axios';
import { store } from 'Redux/store';
import { isTokenExpire, handleNetworkError, convertFormData } from '../API';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
