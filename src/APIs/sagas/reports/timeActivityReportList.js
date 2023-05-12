import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_TIME_ACTIVITY_REPORT_LIST } from '../../constants';
import {
  getTimeActivityReportListSuccess,
  setLoaderComplete,
  setLoaderStart,
  getTimeActivityReportListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getTimeActivityReportListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.TIME_ACTIVITY_REPORT_LIST_URL,
    params
  });
}

function* getTimeActivityReportListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getTimeActivityReportListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getTimeActivityReportListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getTimeActivityReportListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getTimeActivityReportListError(e));
    if (reject) reject(e);
  }
}

export function* getTimeActivityReportListWatcher() {
  yield takeLatest(GET_TIME_ACTIVITY_REPORT_LIST, getTimeActivityReportListAction);
}
