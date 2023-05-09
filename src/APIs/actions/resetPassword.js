import {
  GET_RESET_PASSWORD,
  GET_RESET_PASSWORD_ERROR,
  GET_RESET_PASSWORD_SUCCESS
} from '../constants';

export function getResetPassword(session, resolve, reject) {
  return {
    type: GET_RESET_PASSWORD,
    payload: session,
    resolve,
    reject
  };
}

export const getResetPasswordSuccess = (data) => ({
  type: GET_RESET_PASSWORD_SUCCESS,
  payload: data
});

export const getResetPasswordError = (error) => ({
  type: GET_RESET_PASSWORD_ERROR,
  payload: error
});
