import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_SUPPORT_ADD } from '../../constants';
import {
  setLoaderComplete,
  setLoaderStart,
  getSupportAddSuccess,
  getSupportAddError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getSupportAddApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.SUPPORT_ADD_URL,
    data
  });
}

function* getSupportAddAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getSupportAddApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getSupportAddSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getSupportAddError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getSupportAddError(e));
    if (reject) reject(e);
  }
}

export function* getSupportAddWatcher() {
  yield takeLatest(GET_SUPPORT_ADD, getSupportAddAction);
}
