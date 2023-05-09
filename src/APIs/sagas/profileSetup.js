import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_PROFILE_SETUP } from '../constants';
import {
  getProfileSetupSuccess,
  setLoaderComplete,
  setLoaderStart,
  getProfileSetupError
} from '../actions';
import { API_URL, BASE_URL } from '../api.config';
import { instance } from '../index';

async function getProfileSetupApi(data) {
  return instance.request({
    method: 'put',
    url: BASE_URL + API_URL.PROFIlE_URL,
    data
  });
}

function* getProfileSetupAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getProfileSetupApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getProfileSetupSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getProfileSetupError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getProfileSetupError(e));
    if (reject) reject(e);
  }
}

export function* getProfileSetupWatcher() {
  yield takeLatest(GET_PROFILE_SETUP, getProfileSetupAction);
}
