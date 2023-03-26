import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_HOLIDAY_DELETE } from '../../constants';
import {
  getHolidayDeleteSuccess,
  getHolidayDeleteError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getHolidayDeleteApi(params) {
  return instance.request({
    method: 'delete',
    url: `${BASE_URL + API_URL.HOLIDAY_DELETE_URL}/${params}`
  });
}

function* getHolidayDeleteAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getHolidayDeleteApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getHolidayDeleteSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getHolidayDeleteError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getHolidayDeleteError(e));
    if (reject) reject(e);
  }
}

export function* getHolidayDeleteWatcher() {
  yield takeLatest(GET_HOLIDAY_DELETE, getHolidayDeleteAction);
}
