import {
  GET_TIME_ACTIVITY_ID_DATA,
  GET_TIME_ACTIVITY_ID_DATA_ERROR,
  GET_TIME_ACTIVITY_ID_DATA_SUCCESS
} from '../../constants';

export function getTimeActivityById(session, resolve, reject) {
  return {
    type: GET_TIME_ACTIVITY_ID_DATA,
    payload: session,
    resolve,
    reject
  };
}

export const getTimeActivityByIdSuccess = (data) => ({
  type: GET_TIME_ACTIVITY_ID_DATA_SUCCESS,
  payload: data
});

export const getTimeActivityByIdError = (error) => ({
  type: GET_TIME_ACTIVITY_ID_DATA_ERROR,
  payload: error
});
