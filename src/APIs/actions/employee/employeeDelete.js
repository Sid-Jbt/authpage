import {
  GET_EMPLOYEE_DELETE,
  GET_EMPLOYEE_DELETE_ERROR,
  GET_EMPLOYEE_DELETE_SUCCESS
} from '../../constants';

export function getEmployeeDelete(session, resolve, reject) {
  return {
    type: GET_EMPLOYEE_DELETE,
    payload: session,
    resolve,
    reject
  };
}

export const getEmployeeDeleteSuccess = (data) => ({
  type: GET_EMPLOYEE_DELETE_SUCCESS,
  payload: data
});

export const getEmployeeDeleteError = (error) => ({
  type: GET_EMPLOYEE_DELETE_ERROR,
  payload: error
});
