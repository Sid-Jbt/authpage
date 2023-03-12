import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_DASHBOARD } from '../constants';
import {
  getDashboardSuccess,
  setLoaderComplete,
  setLoaderStart,
  getDashboardError
} from '../actions';
import { API_URL, BASE_URL } from '../config';
import { instance } from '../index';

async function getDashboardApi(data) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.DASHBOARD_URL,
    data
  });
}

function* getDashboardAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getDashboardApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getDashboardSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getDashboardError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getDashboardError(e));
    if (reject) reject(e);
  }
}

export function* getDashboardWatcher() {
  yield takeLatest(GET_DASHBOARD, getDashboardAction);
}
