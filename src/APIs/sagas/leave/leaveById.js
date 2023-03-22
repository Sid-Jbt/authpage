import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_LEAVE_ID_DATA } from '../../constants';
import {
  getLeaveByIdError,
  getLeaveByIdSuccess,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getLeaveByIdApi(params) {
  return instance.request({
    method: 'get',
    url: `${BASE_URL + API_URL.LEAVE_BY_ID_URL}/${params.id}`
  });
}

function* getLeaveByIdAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getLeaveByIdApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getLeaveByIdSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getLeaveByIdError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getLeaveByIdError(e));
    if (reject) reject(e);
  }
}

export function* getLeaveByIdWatcher() {
  yield takeLatest(GET_LEAVE_ID_DATA, getLeaveByIdAction);
}
