import {
  GET_HOLIDAY_LIST,
  GET_HOLIDAY_LIST_ERROR,
  GET_HOLIDAY_LIST_SUCCESS
} from '../../constants';

export function getHolidayList(session, resolve, reject) {
  return {
    type: GET_HOLIDAY_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getHolidayListSuccess = (data) => ({
  type: GET_HOLIDAY_LIST_SUCCESS,
  payload: data
});

export const getHolidayListError = (error) => ({
  type: GET_HOLIDAY_LIST_ERROR,
  payload: error
});
