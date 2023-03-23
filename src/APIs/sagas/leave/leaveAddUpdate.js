import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_LEAVE_ADD_UPDATE } from '../../constants';
import {
  getLeaveAddUpdateError,
  getLeaveAddUpdateSuccess,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getLeaveAddUpdateApi({ data, params }) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.LEAVE_ADD_UPDATE_URL,
    data,
    params
  });
}

function* getLeaveAddUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getLeaveAddUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getLeaveAddUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getLeaveAddUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getLeaveAddUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getLeaveAddUpdateWatcher() {
  yield takeLatest(GET_LEAVE_ADD_UPDATE, getLeaveAddUpdateAction);
}
