import {
  GET_CHANGE_PASSWORD,
  GET_CHANGE_PASSWORD_ERROR,
  GET_CHANGE_PASSWORD_SUCCESS
} from '../../constants';

export function getChangePassword(session, resolve, reject) {
  return {
    type: GET_CHANGE_PASSWORD,
    payload: session,
    resolve,
    reject
  };
}

export const getChangePasswordSuccess = (data) => ({
  type: GET_CHANGE_PASSWORD_SUCCESS,
  payload: data
});

export const getChangePasswordError = (error) => ({
  type: GET_CHANGE_PASSWORD_ERROR,
  payload: error
});
