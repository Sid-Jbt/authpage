import {
  GET_EMPLOYEE_CHANGE_PASSWORD,
  GET_EMPLOYEE_CHANGE_PASSWORD_ERROR,
  GET_EMPLOYEE_CHANGE_PASSWORD_SUCCESS
} from '../../constants';

export function getEmployeeChangePassword(session, resolve, reject) {
  return {
    type: GET_EMPLOYEE_CHANGE_PASSWORD,
    payload: session,
    resolve,
    reject
  };
}

export const getEmployeeChangePasswordSuccess = (data) => ({
  type: GET_EMPLOYEE_CHANGE_PASSWORD_SUCCESS,
  payload: data
});

export const getEmployeeChangePasswordError = (error) => ({
  type: GET_EMPLOYEE_CHANGE_PASSWORD_ERROR,
  payload: error
});
