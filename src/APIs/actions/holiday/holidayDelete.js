import {
  GET_HOLIDAY_DELETE,
  GET_HOLIDAY_DELETE_ERROR,
  GET_HOLIDAY_DELETE_SUCCESS
} from '../../constants';

export function getHolidayDelete(session, resolve, reject) {
  return {
    type: GET_HOLIDAY_DELETE,
    payload: session,
    resolve,
    reject
  };
}

export const getHolidayDeleteSuccess = (data) => ({
  type: GET_HOLIDAY_DELETE_SUCCESS,
  payload: data
});

export const getHolidayDeleteError = (error) => ({
  type: GET_HOLIDAY_DELETE_ERROR,
  payload: error
});
