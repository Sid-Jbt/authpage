import { GET_ROLE_LIST_SUCCESS, GET_ROLE_LIST_ERROR, GET_ROLE_LIST } from '../../constants';

export function getRoleList(session, resolve, reject) {
  return {
    type: GET_ROLE_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getRoleListSuccess = (data) => ({
  type: GET_ROLE_LIST_SUCCESS,
  payload: data
});

export const getRoleListError = (error) => ({
  type: GET_ROLE_LIST_ERROR,
  payload: error
});
