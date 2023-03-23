import { GET_SUPPORT_ADD, GET_SUPPORT_ADD_ERROR, GET_SUPPORT_ADD_SUCCESS } from '../../constants';

export function getSupportAdd(session, resolve, reject) {
  return {
    type: GET_SUPPORT_ADD,
    payload: session,
    resolve,
    reject
  };
}

export const getSupportAddSuccess = (data) => ({
  type: GET_SUPPORT_ADD_SUCCESS,
  payload: data
});

export const getSupportAddError = (error) => ({
  type: GET_SUPPORT_ADD_ERROR,
  payload: error
});
