import {
  GET_HOLIDAY_UPDATE,
  GET_HOLIDAY_UPDATE_ERROR,
  GET_HOLIDAY_UPDATE_SUCCESS
} from '../../constants';

export function getHolidayUpdate(session, resolve, reject) {
  return {
    type: GET_HOLIDAY_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getHolidayUpdateSuccess = (data) => ({
  type: GET_HOLIDAY_UPDATE_SUCCESS,
  payload: data
});

export const getHolidayUpdateError = (error) => ({
  type: GET_HOLIDAY_UPDATE_ERROR,
  payload: error
});
