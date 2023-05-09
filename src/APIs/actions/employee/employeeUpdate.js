import {
  GET_EMPLOYEE_UPDATE,
  GET_EMPLOYEE_UPDATE_ERROR,
  GET_EMPLOYEE_UPDATE_SUCCESS
} from '../../constants';

export function getEmployeeUpdate(session, resolve, reject) {
  return {
    type: GET_EMPLOYEE_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getEmployeeUpdateSuccess = (data) => ({
  type: GET_EMPLOYEE_UPDATE_SUCCESS,
  payload: data
});

export const getEmployeeUpdateError = (error) => ({
  type: GET_EMPLOYEE_UPDATE_ERROR,
  payload: error
});
