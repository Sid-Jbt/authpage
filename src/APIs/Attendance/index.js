import axios from 'axios';
import { queryString, isTokenExpire, handleNetworkError } from '../../Helpers/Global';
import { store } from '../../Redux/store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getAttendanceList = async (data) =>
  axios({
    url: `${API_BASE_URL}/employee/attendance/list?${queryString(data)}`,
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response))
    .catch((error) => handleNetworkError(error));
