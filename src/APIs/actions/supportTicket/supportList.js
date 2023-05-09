import {
  GET_SUPPORT_LIST,
  GET_SUPPORT_LIST_SUCCESS,
  GET_SUPPORT_LIST_ERROR
} from '../../constants';

export function getSupportList(session, resolve, reject) {
  return {
    type: GET_SUPPORT_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getSupportListSuccess = (data) => ({
  type: GET_SUPPORT_LIST_SUCCESS,
  payload: data
});

export const getSupportListError = (error) => ({
  type: GET_SUPPORT_LIST_ERROR,
  payload: error
});
