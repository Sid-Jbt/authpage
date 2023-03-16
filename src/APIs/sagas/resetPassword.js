import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_RESET_PASSWORD } from '../constants';
import {
  getResetPasswordSuccess,
  setLoaderComplete,
  setLoaderStart,
  getResetPasswordError
} from '../actions';
import { API_URL, BASE_URL } from '../api.config';
import { instance } from '../index';

async function getResetPasswordApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.RESET_PASSWORD_URL,
    data
  });
}

function* getResetPasswordAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getResetPasswordApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getResetPasswordSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getResetPasswordError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getResetPasswordError(e));
    if (reject) reject(e);
  }
}

export function* getResetPasswordWatcher() {
  yield takeLatest(GET_RESET_PASSWORD, getResetPasswordAction);
}
