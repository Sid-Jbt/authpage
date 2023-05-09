import {
  GET_SUPPORT_ID_DATA,
  GET_SUPPORT_ID_DATA_ERROR,
  GET_SUPPORT_ID_DATA_SUCCESS
} from '../../constants';

export function getSupportById(session, resolve, reject) {
  return {
    type: GET_SUPPORT_ID_DATA,
    payload: session,
    resolve,
    reject
  };
}

export const getSupportByIdSuccess = (data) => ({
  type: GET_SUPPORT_ID_DATA_SUCCESS,
  payload: data
});

export const getSupportByIdError = (error) => ({
  type: GET_SUPPORT_ID_DATA_ERROR,
  payload: error
});
