import { GET_LOGIN, GET_LOGIN_ERROR, GET_LOGIN_SUCCESS } from '../constants';

export function getLogin(session, resolve, reject) {
  return {
    type: GET_LOGIN,
    payload: session,
    resolve,
    reject
  };
}

export const getLoginSuccess = (data) => ({
  type: GET_LOGIN_SUCCESS,
  payload: data
});

export const getLoginError = (error) => ({
  type: GET_LOGIN_ERROR,
  payload: error
});
