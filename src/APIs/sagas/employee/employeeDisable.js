import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EMPLOYEE_DISABLE } from '../../constants';
import {
  getEmployeeDisableSuccess,
  setLoaderComplete,
  setLoaderStart,
  getEmployeeDisableError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getEmployeeDisableApi(data) {
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.EMPLOYEE_DISABLE_URL}/${data.id}/${data.action}`
  });
}

function* getEmployeeDisableAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getEmployeeDisableApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getEmployeeDisableSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getEmployeeDisableError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getEmployeeDisableError(e));
    if (reject) reject(e);
  }
}

export function* getEmployeeDisableWatcher() {
  yield takeLatest(GET_EMPLOYEE_DISABLE, getEmployeeDisableAction);
}
