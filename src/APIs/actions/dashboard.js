import { GET_DASHBOARD, GET_DASHBOARD_ERROR, GET_DASHBOARD_SUCCESS } from '../constants';

export function getDashboard(session, resolve, reject) {
  return {
    type: GET_DASHBOARD,
    payload: session,
    resolve,
    reject
  };
}

export const getDashboardSuccess = (data) => ({
  type: GET_DASHBOARD_SUCCESS,
  payload: data
});

export const getDashboardError = (error) => ({
  type: GET_DASHBOARD_ERROR,
  payload: error
});
