import {
  GET_ROLE_ID_DATA,
  GET_ROLE_ID_DATA_ERROR,
  GET_ROLE_ID_DATA_SUCCESS
} from '../../constants';

export function getRoleById(session, resolve, reject) {
  return {
    type: GET_ROLE_ID_DATA,
    payload: session,
    resolve,
    reject
  };
}

export const getRoleByIdSuccess = (data) => ({
  type: GET_ROLE_ID_DATA_SUCCESS,
  payload: data
});

export const getRoleByIdError = (error) => ({
  type: GET_ROLE_ID_DATA_ERROR,
  payload: error
});
