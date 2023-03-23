import {
  GET_SUPPORT_UPDATE,
  GET_SUPPORT_UPDATE_ERROR,
  GET_SUPPORT_UPDATE_SUCCESS
} from '../../constants';

export function getSupportUpdate(session, resolve, reject) {
  return {
    type: GET_SUPPORT_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getSupportUpdateSuccess = (data) => ({
  type: GET_SUPPORT_UPDATE_SUCCESS,
  payload: data
});

export const getSupportUpdateError = (error) => ({
  type: GET_SUPPORT_UPDATE_ERROR,
  payload: error
});
