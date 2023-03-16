import {
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_LIST_ERROR,
  GET_EMPLOYEE_LIST_SUCCESS
} from '../../constants';

export function getEmployeeList(session, resolve, reject) {
  return {
    type: GET_EMPLOYEE_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getEmployeeListSuccess = (data) => ({
  type: GET_EMPLOYEE_LIST_SUCCESS,
  payload: data
});

export const getEmployeeListError = (error) => ({
  type: GET_EMPLOYEE_LIST_ERROR,
  payload: error
});
