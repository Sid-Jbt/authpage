import {
  GET_SUPPORT_DELETE,
  GET_SUPPORT_DELETE_ERROR,
  GET_SUPPORT_DELETE_SUCCESS
} from '../../constants';

export function getSupportDelete(session, resolve, reject) {
  return {
    type: GET_SUPPORT_DELETE,
    payload: session,
    resolve,
    reject
  };
}

export const getSupportDeleteSuccess = (data) => ({
  type: GET_SUPPORT_DELETE_ERROR,
  payload: data
});

export const getSupportDeleteError = (error) => ({
  type: GET_SUPPORT_DELETE_SUCCESS,
  payload: error
});
