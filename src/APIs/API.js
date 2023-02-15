import { getLoginPattern } from '../Routes/routeConfig';

const isTokenExpire = async (responseJson) => {
  const response = await responseJson;
  if (response.message === 'Unauthorized request') {
    window.location = getLoginPattern();
    return;
  }
  return response;
};

const handleNetworkError = async () => {
  console.log('Network request error. Please try again.');
};

export const login = async (data) =>
  fetch(`/user/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));
