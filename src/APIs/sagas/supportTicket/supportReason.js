import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_SUPPORT_REASON } from '../../constants';
import {
  getSupportReasonSuccess,
  getSupportReasonError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getSupportReasonApi({ data, id }) {
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.SUPPORT_REASON_URL}/${id}`,
    data
  });
}

function* getSupportReasonAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getSupportReasonApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getSupportReasonSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getSupportReasonError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getSupportReasonError(e));
    if (reject) reject(e);
  }
}

export function* getSupportReasonWatcher() {
  yield takeLatest(GET_SUPPORT_REASON, getSupportReasonAction);
}
