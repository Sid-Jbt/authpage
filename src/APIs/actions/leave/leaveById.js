import {
  GET_LEAVE_ID_DATA,
  GET_LEAVE_ID_DATA_ERROR,
  GET_LEAVE_ID_DATA_SUCCESS
} from '../../constants';

export function getLeaveById(session, resolve, reject) {
  return {
    type: GET_LEAVE_ID_DATA,
    payload: session,
    resolve,
    reject
  };
}

export const getLeaveByIdSuccess = (data) => ({
  type: GET_LEAVE_ID_DATA_SUCCESS,
  payload: data
});

export const getLeaveByIdError = (error) => ({
  type: GET_LEAVE_ID_DATA_ERROR,
  payload: error
});
