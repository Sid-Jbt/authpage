import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_LEAVE_ADD } from '../../constants';
import {
  getLeaveAddError,
  getLeaveAddSuccess,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getLeaveAddApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.LEAVE_ADD_URL,
    data
  });
}

function* getLeaveAddAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getLeaveAddApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getLeaveAddSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getLeaveAddError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getLeaveAddError(e));
    if (reject) reject(e);
  }
}

export function* getLeaveAddWatcher() {
  yield takeLatest(GET_LEAVE_ADD, getLeaveAddAction);
}
