import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_DOMAIN } from '../constants';
import { getDomainSuccess, setLoaderComplete, setLoaderStart, getDomainError } from '../actions';
import { API_URL, BASE_URL } from '../api.config';
import { instance } from '../index';

async function getDomainApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.DOMAIN_URL,
    params
  });
}

function* getDomainAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getDomainApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getDomainSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getDomainError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getDomainError(e));
    if (reject) reject(e);
  }
}

export function* getDomainWatcher() {
  yield takeLatest(GET_DOMAIN, getDomainAction);
}
