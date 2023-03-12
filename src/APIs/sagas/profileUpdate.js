import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_PROFILE_UPDATE } from '../constants';
import {
  getProfileUpdateSuccess,
  setLoaderComplete,
  setLoaderStart,
  getProfileUpdateError
} from '../actions';
import { API_URL, BASE_URL } from '../config';
import { instance } from '../index';

async function getProfileUpdateApi(data) {
  return instance.request({
    method: 'put',
    url: BASE_URL + API_URL.PROFIlE_UPDATE_URL,
    data
  });
}

function* getProfileUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getProfileUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getProfileUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getProfileUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getProfileUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getProfileUpdateWatcher() {
  yield takeLatest(GET_PROFILE_UPDATE, getProfileUpdateAction);
}
