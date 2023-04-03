import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_SUPPORT_ADD_UPDATE } from '../../constants';
import {
  setLoaderComplete,
  setLoaderStart,
  getSupportAddUpdateSuccess,
  getSupportAddUpdateError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getSupportAddUpdateApi(data) {
  const { id, ...rest } = data;
  const url = id
    ? `${BASE_URL + API_URL.SUPPORT_ADD_UPDATE_URL}/${id}`
    : BASE_URL + API_URL.SUPPORT_ADD_UPDATE_URL;
  const method = id ? 'put' : 'post';
  return instance.request({
    method,
    url,
    data: rest
  });
}

function* getSupportAddUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getSupportAddUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getSupportAddUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getSupportAddUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getSupportAddUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getSupportAddUpdateWatcher() {
  yield takeLatest(GET_SUPPORT_ADD_UPDATE, getSupportAddUpdateAction);
}
