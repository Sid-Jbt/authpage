import {
  GET_FORGOT_PASSWORD,
  GET_FORGOT_PASSWORD_ERROR,
  GET_FORGOT_PASSWORD_SUCCESS
} from '../constants';

export function getForgotPassword(session, resolve, reject) {
  return {
    type: GET_FORGOT_PASSWORD,
    payload: session,
    resolve,
    reject
  };
}

export const getForgotPasswordSuccess = (data) => ({
  type: GET_FORGOT_PASSWORD_SUCCESS,
  payload: data
});

export const getForgotPasswordError = (error) => ({
  type: GET_FORGOT_PASSWORD_ERROR,
  payload: error
});
