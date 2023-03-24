import { GET_HOLIDAY_ADD, GET_HOLIDAY_ADD_ERROR, GET_HOLIDAY_ADD_SUCCESS } from '../../constants';

export function getHolidayAdd(session, resolve, reject) {
  return {
    type: GET_HOLIDAY_ADD,
    payload: session,
    resolve,
    reject
  };
}

export const getHolidayAddSuccess = (data) => ({
  type: GET_HOLIDAY_ADD_SUCCESS,
  payload: data
});

export const getHolidayAddError = (error) => ({
  type: GET_HOLIDAY_ADD_ERROR,
  payload: error
});
