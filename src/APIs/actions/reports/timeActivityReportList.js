import {
  GET_TIME_ACTIVITY_REPORT_LIST,
  GET_TIME_ACTIVITY_REPORT_LIST_SUCCESS,
  GET_TIME_ACTIVITY_REPORT_LIST_ERROR
} from '../../constants';

export function getTimeActivityReportList(session, resolve, reject) {
  return {
    type: GET_TIME_ACTIVITY_REPORT_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getTimeActivityReportListSuccess = (data) => ({
  type: GET_TIME_ACTIVITY_REPORT_LIST_SUCCESS,
  payload: data
});

export const getTimeActivityReportListError = (error) => ({
  type: GET_TIME_ACTIVITY_REPORT_LIST_ERROR,
  payload: error
});
