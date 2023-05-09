import {
  GET_EMPLOYEE_BY_SLUG,
  GET_EMPLOYEE_BY_SLUG_ERROR,
  GET_EMPLOYEE_BY_SLUG_SUCCESS
} from '../../constants';

export function getEmployeeBySlug(session, resolve, reject) {
  return {
    type: GET_EMPLOYEE_BY_SLUG,
    payload: session,
    resolve,
    reject
  };
}

export const getEmployeeBySlugSuccess = (data) => ({
  type: GET_EMPLOYEE_BY_SLUG_SUCCESS,
  payload: data
});

export const getEmployeeBySlugError = (error) => ({
  type: GET_EMPLOYEE_BY_SLUG_ERROR,
  payload: error
});
