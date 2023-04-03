import {
  GET_SUPPORT_ADD_UPDATE,
  GET_SUPPORT_ADD_UPDATE_ERROR,
  GET_SUPPORT_ADD_UPDATE_SUCCESS
} from '../../constants';

export function getSupportAddUpdate(session, resolve, reject) {
  return {
    type: GET_SUPPORT_ADD_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getSupportAddUpdateSuccess = (data) => ({
  type: GET_SUPPORT_ADD_UPDATE_SUCCESS,
  payload: data
});

export const getSupportAddUpdateError = (error) => ({
  type: GET_SUPPORT_ADD_UPDATE_ERROR,
  payload: error
});
