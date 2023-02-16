import { getLoginPattern } from '../Routes/routeConfig';
import { convertFormData } from '../Helpers/Global';
import { API_BASE_URL } from '../Helpers/config';

const isTokenExpire = async (responseJson) => {
  const response = await responseJson;
  if (response.message === 'Unauthorized request') {
    window.location = getLoginPattern();
    return;
  }
  return response;
};

const handleNetworkError = async (responseError) => {
  if (responseError.name !== 'AbortError') {
    console.log('Network request error. Please try again.');
  }
};

export const login = async (data) =>
  fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    body: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));

export const companyResetPassword = async (data) =>
  fetch(`${API_BASE_URL}/reset-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    body: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));
