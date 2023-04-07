import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_SUPPORT_LIST } from '../../constants';
import {
  getEmployeeListSuccess,
  setLoaderComplete,
  setLoaderStart,
  getEmployeeListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getSupportListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.SUPPORT_GET_URL,
    params
  });
}

function* getSupportListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getSupportListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getEmployeeListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getEmployeeListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getEmployeeListError(e));
    if (reject) reject(e);
  }
}

export function* getSupportListWatcher() {
  yield takeLatest(GET_SUPPORT_LIST, getSupportListAction);
}