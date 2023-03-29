import {
  GET_SUPPORT_REASON,
  GET_SUPPORT_REASON_ERROR,
  GET_SUPPORT_REASON_SUCCESS
} from '../../constants';

export function getSupportReason(session, resolve, reject) {
  return {
    type: GET_SUPPORT_REASON,
    payload: session,
    resolve,
    reject
  };
}

export const getSupportReasonSuccess = (data) => ({
  type: GET_SUPPORT_REASON_SUCCESS,
  payload: data
});

export const getSupportReasonError = (error) => ({
  type: GET_SUPPORT_REASON_ERROR,
  payload: error
});
