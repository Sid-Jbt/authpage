import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_HOLIDAY_ID_DATA } from '../../constants';
import {
  getHolidayByIdError,
  getHolidayByIdSuccess,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getHolidayByIdApi(id) {
  return instance.request({
    method: 'get',
    url: `${BASE_URL + API_URL.HOLIDAY_BY_ID_URL}/${id}`
  });
}

function* getHolidayByIdAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getHolidayByIdApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getHolidayByIdSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getHolidayByIdError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getHolidayByIdError(e));
    if (reject) reject(e);
  }
}

export function* getHolidayByIdWatcher() {
  yield takeLatest(GET_HOLIDAY_ID_DATA, getHolidayByIdAction);
}
