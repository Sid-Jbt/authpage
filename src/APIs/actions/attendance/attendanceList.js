import {
  GET_ATTENDANCE_LIST,
  GET_ATTENDANCE_LIST_ERROR,
  GET_ATTENDANCE_LIST_SUCCESS
} from '../../constants';

export function getAttendanceList(session, resolve, reject) {
  return {
    type: GET_ATTENDANCE_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getAttendanceListSuccess = (data) => ({
  type: GET_ATTENDANCE_LIST_SUCCESS,
  payload: data
});

export const getAttendanceListError = (error) => ({
  type: GET_ATTENDANCE_LIST_ERROR,
  payload: error
});
