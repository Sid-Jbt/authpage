import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_LEAVE_DELETE } from '../../constants';
import {
  getLeaveDeleteSuccess,
  getLeaveDeleteError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getLeaveDeleteApi(params) {
  return instance.request({
    method: 'delete',
    url: `${BASE_URL + API_URL.LEAVE_DELETE_URL}/${params.selectedId}`
  });
}

function* getLeaveDeleteAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getLeaveDeleteApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getLeaveDeleteSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getLeaveDeleteError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getLeaveDeleteError(e));
    if (reject) reject(e);
  }
}

export function* getLeaveDeleteWatcher() {
  yield takeLatest(GET_LEAVE_DELETE, getLeaveDeleteAction);
}
