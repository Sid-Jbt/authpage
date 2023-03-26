import {
  GET_LEAVE_REASON,
  GET_LEAVE_REASON_ERROR,
  GET_LEAVE_REASON_SUCCESS
} from '../../constants';

export function getLeaveReason(session, resolve, reject) {
  return {
    type: GET_LEAVE_REASON,
    payload: session,
    resolve,
    reject
  };
}

export const getLeaveReasonSuccess = (data) => ({
  type: GET_LEAVE_REASON_SUCCESS,
  payload: data
});

export const getLeaveReasonError = (error) => ({
  type: GET_LEAVE_REASON_ERROR,
  payload: error
});
