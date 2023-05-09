import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EMPLOYEE_CHANGE_PASSWORD } from '../../constants';
import {
  getEmployeeChangePasswordSuccess,
  setLoaderComplete,
  setLoaderStart,
  getEmployeeChangePasswordError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getEmployeeChangePasswordApi(data) {
  const { id, ...rest } = data;
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.EMPLOYEE_CHANGE_PASSWORD_URL}/${id}`,
    data: rest.values
  });
}

function* getEmployeeChangePasswordAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getEmployeeChangePasswordApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getEmployeeChangePasswordSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getEmployeeChangePasswordError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getEmployeeChangePasswordError(e));
    if (reject) reject(e);
  }
}

export function* getEmployeeChangePasswordWatcher() {
  yield takeLatest(GET_EMPLOYEE_CHANGE_PASSWORD, getEmployeeChangePasswordAction);
}
