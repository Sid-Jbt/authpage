import { getLoginPattern } from '../Routes/routeConfig';
import { buildFormData } from '../Helpers/Global';

export const isTokenExpire = async (response) => {
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

export const handleNetworkError = async (responseError) => {
  if (responseError.name !== 'AbortError') {
    console.log('Network request error. Please try again.');
  }
};

export const convertFormData = async (data) => {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};

// CONVERT OBJECT TO QUERY STRING
export const queryString = (obj) => {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  return str.join('&');
};
