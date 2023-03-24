import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_HOLIDAY_ADD } from '../../constants';
import {
  setLoaderComplete,
  setLoaderStart,
  getHolidayAddSuccess,
  getHolidayAddError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getHolidayAddApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.HOLIDAY_ADD_URL,
    data
  });
}

function* getHolidayAddAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getHolidayAddApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getHolidayAddSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getHolidayAddError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getHolidayAddError(e));
    if (reject) reject(e);
  }
}

export function* getHolidayAddWatcher() {
  yield takeLatest(GET_HOLIDAY_ADD, getHolidayAddAction);
}
