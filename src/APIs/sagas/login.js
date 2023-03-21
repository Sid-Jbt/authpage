import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_LOGIN } from '../constants';
import { getLoginSuccess, setLoaderComplete, setLoaderStart, getLoginError } from '../actions';
import { API_URL, BASE_URL } from '../api.config';
import { instance } from '../index';

async function getLoginApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.LOGIN_URL,
    data
  });
}

function* getLoginAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getLoginApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getLoginSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getLoginError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getLoginError(e));
    if (reject) reject(e);
  }
}

export function* getLoginWatcher() {
  yield takeLatest(GET_LOGIN, getLoginAction);
}
