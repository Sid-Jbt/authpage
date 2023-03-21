import { GET_LEAVE_LIST, GET_LEAVE_LIST_ERROR, GET_LEAVE_LIST_SUCCESS } from '../../constants';

export function getLeaveList(session, resolve, reject) {
  return {
    type: GET_LEAVE_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getLeaveListSuccess = (data) => ({
  type: GET_LEAVE_LIST_SUCCESS,
  payload: data
});

export const getLeaveListError = (error) => ({
  type: GET_LEAVE_LIST_ERROR,
  payload: error
});
