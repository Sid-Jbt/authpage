import {
  GET_HOLIDAY_ID_DATA,
  GET_HOLIDAY_ID_DATA_ERROR,
  GET_HOLIDAY_ID_DATA_SUCCESS
} from '../../constants';

export function getHolidayById(session, resolve, reject) {
  return {
    type: GET_HOLIDAY_ID_DATA,
    payload: session,
    resolve,
    reject
  };
}

export const getHolidayByIdSuccess = (data) => ({
  type: GET_HOLIDAY_ID_DATA_SUCCESS,
  payload: data
});

export const getHolidayByIdError = (error) => ({
  type: GET_HOLIDAY_ID_DATA_ERROR,
  payload: error
});
