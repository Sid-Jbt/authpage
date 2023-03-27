import {
  GET_LEAVE_ADD_UPDATE,
  GET_LEAVE_ADD_UPDATE_ERROR,
  GET_LEAVE_ADD_UPDATE_SUCCESS
} from '../../constants';

export function getLeaveAddUpdate(session, resolve, reject) {
  return {
    type: GET_LEAVE_ADD_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getLeaveAddUpdateSuccess = (data) => ({
  type: GET_LEAVE_ADD_UPDATE_SUCCESS,
  payload: data
});

export const getLeaveAddUpdateError = (error) => ({
  type: GET_LEAVE_ADD_UPDATE_ERROR,
  payload: error
});
