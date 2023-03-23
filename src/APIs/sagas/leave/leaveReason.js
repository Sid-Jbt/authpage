import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_LEAVE_REASON } from '../../constants';
import {
  getLeaveReasonSuccess,
  getLeaveReasonError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getLeaveReasonApi({ data, id }) {
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.LEAVE_REASON_URL}/${id}`,
    data
  });
}

function* getLeaveReasonAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getLeaveReasonApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getLeaveReasonSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getLeaveReasonError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getLeaveReasonError(e));
    if (reject) reject(e);
  }
}

export function* getLeaveReasonWatcher() {
  yield takeLatest(GET_LEAVE_REASON, getLeaveReasonAction);
}
