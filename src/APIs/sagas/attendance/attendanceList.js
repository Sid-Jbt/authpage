import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ATTENDANCE_LIST } from '../../constants';
import {
  getAttendanceListSuccess,
  setLoaderComplete,
  setLoaderStart,
  getAttendanceListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getAttendanceListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.ATTENDANCE_LIST_URL,
    params
  });
}
function* getAttendanceListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getAttendanceListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getAttendanceListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getAttendanceListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getAttendanceListError(e));
    if (reject) reject(e);
  }
}

export function* getAttendanceListWatcher() {
  yield takeLatest(GET_ATTENDANCE_LIST, getAttendanceListAction);
}
