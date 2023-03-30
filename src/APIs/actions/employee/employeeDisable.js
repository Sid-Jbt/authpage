import {
  GET_EMPLOYEE_DISABLE,
  GET_EMPLOYEE_DISABLE_ERROR,
  GET_EMPLOYEE_DISABLE_SUCCESS
} from '../../constants';

export function getEmployeeDisable(session, resolve, reject) {
  return {
    type: GET_EMPLOYEE_DISABLE,
    payload: session,
    resolve,
    reject
  };
}

export const getEmployeeDisableSuccess = (data) => ({
  type: GET_EMPLOYEE_DISABLE_SUCCESS,
  payload: data
});

export const getEmployeeDisableError = (error) => ({
  type: GET_EMPLOYEE_DISABLE_ERROR,
  payload: error
});
