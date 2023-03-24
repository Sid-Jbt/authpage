import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_HOLIDAY_UPDATE } from '../../constants';
import {
  setLoaderComplete,
  setLoaderStart,
  getHolidayUpdateSuccess,
  getHolidayUpdateError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getHolidayUpdateApi({ data, params }) {
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.HOLIDAY_UPDATE_URL}/${params}`,
    data
  });
}

function* getHolidayUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getHolidayUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getHolidayUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getHolidayUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getHolidayUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getHolidayUpdateWatcher() {
  yield takeLatest(GET_HOLIDAY_UPDATE, getHolidayUpdateAction);
}
