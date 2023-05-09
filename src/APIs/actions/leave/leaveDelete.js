import {
  GET_LEAVE_DELETE,
  GET_LEAVE_DELETE_ERROR,
  GET_LEAVE_DELETE_SUCCESS
} from '../../constants';

export function getLeaveDelete(session, resolve, reject) {
  return {
    type: GET_LEAVE_DELETE,
    payload: session,
    resolve,
    reject
  };
}

export const getLeaveDeleteSuccess = (data) => ({
  type: GET_LEAVE_DELETE_SUCCESS,
  payload: data
});

export const getLeaveDeleteError = (error) => ({
  type: GET_LEAVE_DELETE_ERROR,
  payload: error
});
