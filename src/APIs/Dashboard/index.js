import axios from 'axios';
import { store } from 'Redux/store';
import { isTokenExpire, handleNetworkError } from '../API';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getDashboardList = async () =>
  axios({
    url: `${API_BASE_URL}/dashboard`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));
