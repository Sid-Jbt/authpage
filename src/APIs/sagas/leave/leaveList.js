import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_LEAVE_LIST } from '../../constants';
import {
  getLeaveListSuccess,
  setLoaderComplete,
  setLoaderStart,
  getLeaveListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getLeaveListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.LEAVE_LIST_URL,
    params
  });
}
function* getLeaveListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getLeaveListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getLeaveListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getLeaveListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getLeaveListError(e));
    if (reject) reject(e);
  }
}

export function* getLeaveListWatcher() {
  yield takeLatest(GET_LEAVE_LIST, getLeaveListAction);
}
