import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_HOLIDAY_ADD_UPDATE } from '../../constants';
import {
  setLoaderComplete,
  setLoaderStart,
  getHolidayAddUpdateSuccess,
  getHolidayAddUpdateError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getHolidayAddApi(data, id) {
  const url = id
    ? `${BASE_URL + API_URL.HOLIDAY_ADD_URL}/${id}`
    : BASE_URL + API_URL.HOLIDAY_ADD_URL;
  const method = id ? 'put' : 'post';
  return instance.request({
    method,
    url,
    data: data.values
  });
}

function* getHolidayAddUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getHolidayAddApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getHolidayAddUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getHolidayAddUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getHolidayAddUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getHolidayAddUpdateWatcher() {
  yield takeLatest(GET_HOLIDAY_ADD_UPDATE, getHolidayAddUpdateAction);
}
