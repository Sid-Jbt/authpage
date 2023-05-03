import { GET_MODULE_LIST_SUCCESS, GET_MODULE_LIST_ERROR, GET_MODULE_LIST } from '../../constants';

export function getModuleList(session, resolve, reject) {
  return {
    type: GET_MODULE_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getModuleListSuccess = (data) => ({
  type: GET_MODULE_LIST_SUCCESS,
  payload: data
});

export const getModuleListError = (error) => ({
  type: GET_MODULE_LIST_ERROR,
  payload: error
});
