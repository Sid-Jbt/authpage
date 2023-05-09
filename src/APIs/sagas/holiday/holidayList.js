import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_HOLIDAY_LIST } from '../../constants';
import {
  getHolidayListSuccess,
  setLoaderComplete,
  setLoaderStart,
  getHolidayListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getHolidayListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.HOLIDAY_LIST_URL,
    params
  });
}
function* getHolidayListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getHolidayListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getHolidayListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getHolidayListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getHolidayListError(e));
    if (reject) reject(e);
  }
}

export function* getHolidayListWatcher() {
  yield takeLatest(GET_HOLIDAY_LIST, getHolidayListAction);
}
