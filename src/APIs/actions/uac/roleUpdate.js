import { GET_ROLE_UPDATE, GET_ROLE_UPDATE_ERROR, GET_ROLE_UPDATE_SUCCESS } from '../../constants';

export function getRoleUpdate(session, resolve, reject) {
  return {
    type: GET_ROLE_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getRoleUpdateSuccess = (data) => ({
  type: GET_ROLE_UPDATE_SUCCESS,
  payload: data
});

export const getRoleUpdateError = (error) => ({
  type: GET_ROLE_UPDATE_ERROR,
  payload: error
});
