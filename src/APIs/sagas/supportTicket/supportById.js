import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_SUPPORT_ID_DATA } from '../../constants';
import {
  getSupportByIdError,
  getSupportByIdSuccess,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getSupportByIdApi(params) {
  return instance.request({
    method: 'get',
    url: `${BASE_URL + API_URL.SUPPORT_BY_ID_URL}/${params.id}`
  });
}

function* getSupportByIdAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getSupportByIdApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getSupportByIdSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getSupportByIdError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getSupportByIdError(e));
    if (reject) reject(e);
  }
}

export function* getSupportByIdWatcher() {
  yield takeLatest(GET_SUPPORT_ID_DATA, getSupportByIdAction);
}
