import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_FORGOT_PASSWORD } from '../constants';
import {
  getForgotPasswordSuccess,
  setLoaderComplete,
  setLoaderStart,
  getForgotPasswordError
} from '../actions';
import { API_URL, BASE_URL } from '../api.config';
import { instance } from '../index';

async function getForgotPasswordApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.FORGOT_PASSWORD_URL,
    data
  });
}

function* getForgotPasswordAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getForgotPasswordApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getForgotPasswordSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getForgotPasswordError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getForgotPasswordError(e));
    if (reject) reject(e);
  }
}

export function* getForgotPasswordWatcher() {
  yield takeLatest(GET_FORGOT_PASSWORD, getForgotPasswordAction);
}
