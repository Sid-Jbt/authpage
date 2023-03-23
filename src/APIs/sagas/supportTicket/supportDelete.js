import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_SUPPORT_DELETE } from '../../constants';
import {
  getSupportDeleteSuccess,
  getSupportDeleteError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getSupportDeleteApi(params) {
  return instance.request({
    method: 'delete',
    url: `${BASE_URL + API_URL.SUPPORT_DELETE_URL}/${params}`
  });
}

function* getSupportDeleteAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getSupportDeleteApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getSupportDeleteSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getSupportDeleteError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getSupportDeleteError(e));
    if (reject) reject(e);
  }
}

export function* getSupportDeleteWatcher() {
  yield takeLatest(GET_SUPPORT_DELETE, getSupportDeleteAction);
}
