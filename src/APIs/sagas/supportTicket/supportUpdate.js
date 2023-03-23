import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_SUPPORT_UPDATE } from '../../constants';
import {
  setLoaderComplete,
  setLoaderStart,
  getSupportUpdateSuccess,
  getSupportUpdateError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getSupportUpdateApi({ data, params }) {
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.SUPPORT_UPDATE_URL}/${params}`,
    data
  });
}

function* getSupportUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getSupportUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getSupportUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getSupportUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getSupportUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getSupportUpdateWatcher() {
  yield takeLatest(GET_SUPPORT_UPDATE, getSupportUpdateAction);
}
