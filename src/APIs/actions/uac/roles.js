import { GET_ROLES_SUCCESS, GET_ROLES_ERROR, GET_ROLES } from '../../constants';

export function getRoles(session, resolve, reject) {
  return {
    type: GET_ROLES,
    payload: session,
    resolve,
    reject
  };
}

export const getRolesSuccess = (data) => ({
  type: GET_ROLES_SUCCESS,
  payload: data
});

export const getRolesError = (error) => ({
  type: GET_ROLES_ERROR,
  payload: error
});
