import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_CHANGE_PASSWORD } from '../../constants';
import {
  getChangePasswordSuccess,
  setLoaderComplete,
  setLoaderStart,
  getChangePasswordError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getChangePasswordApi(data) {
  return instance.request({
    method: 'put',
    url: BASE_URL + API_URL.CHANGE_PASSWORD_URL,
    data
  });
}
function* getChangePasswordAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getChangePasswordApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getChangePasswordSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getChangePasswordError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getChangePasswordError(e));
    if (reject) reject(e);
  }
}

export function* getChangePasswordWatcher() {
  yield takeLatest(GET_CHANGE_PASSWORD, getChangePasswordAction);
}
