import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EMPLOYEE_ADD } from '../../constants';
import {
  getEmployeeAddSuccess,
  setLoaderComplete,
  setLoaderStart,
  getEmployeeAddError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getEmployeeAddApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.EMPLOYEE_ADD_URL,
    data
  });
}

function* getEmployeeAddAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getEmployeeAddApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getEmployeeAddSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getEmployeeAddError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getEmployeeAddError(e));
    if (reject) reject(e);
  }
}

export function* getEmployeeAddWatcher() {
  yield takeLatest(GET_EMPLOYEE_ADD, getEmployeeAddAction);
}
