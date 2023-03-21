import {
  GET_EMPLOYEE_ADD,
  GET_EMPLOYEE_ADD_ERROR,
  GET_EMPLOYEE_ADD_SUCCESS
} from '../../constants';

export function getEmployeeAdd(session, resolve, reject) {
  return {
    type: GET_EMPLOYEE_ADD,
    payload: session,
    resolve,
    reject
  };
}

export const getEmployeeAddSuccess = (data) => ({
  type: GET_EMPLOYEE_ADD_SUCCESS,
  payload: data
});

export const getEmployeeAddError = (error) => ({
  type: GET_EMPLOYEE_ADD_ERROR,
  payload: error
});
