import { GET_ROLE_ADD, GET_ROLE_ADD_ERROR, GET_ROLE_ADD_SUCCESS } from '../../constants';

export function getRoleAdd(session, resolve, reject) {
  return {
    type: GET_ROLE_ADD,
    payload: session,
    resolve,
    reject
  };
}

export const getRoleAddSuccess = (data) => ({
  type: GET_ROLE_ADD_SUCCESS,
  payload: data
});

export const getRoleAddError = (error) => ({
  type: GET_ROLE_ADD_ERROR,
  payload: error
});
