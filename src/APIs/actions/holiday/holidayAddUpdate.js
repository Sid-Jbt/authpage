import {
  GET_HOLIDAY_ADD_UPDATE,
  GET_HOLIDAY_ADD_UPDATE_ERROR,
  GET_HOLIDAY_ADD_UPDATE_SUCCESS
} from '../../constants';

export function getHolidayAddUpdate(session, resolve, reject) {
  return {
    type: GET_HOLIDAY_ADD_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getHolidayAddUpdateSuccess = (data) => ({
  type: GET_HOLIDAY_ADD_UPDATE_SUCCESS,
  payload: data
});

export const getHolidayAddUpdateError = (error) => ({
  type: GET_HOLIDAY_ADD_UPDATE_ERROR,
  payload: error
});
