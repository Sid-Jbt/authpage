import { GET_LEAVE_ADD, GET_LEAVE_ADD_ERROR, GET_LEAVE_ADD_SUCCESS } from '../../constants';

export function getLeaveAdd(session, resolve, reject) {
  return {
    type: GET_LEAVE_ADD,
    payload: session,
    resolve,
    reject
  };
}

export const getLeaveAddSuccess = (data) => ({
  type: GET_LEAVE_ADD_SUCCESS,
  payload: data
});

export const getLeaveAddError = (error) => ({
  type: GET_LEAVE_ADD_ERROR,
  payload: error
});
