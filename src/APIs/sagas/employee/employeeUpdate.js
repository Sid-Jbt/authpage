import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EMPLOYEE_UPDATE } from '../../constants';
import {
  getEmployeeUpdateSuccess,
  setLoaderComplete,
  setLoaderStart,
  getEmployeeUpdateError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getEmployeeUpdateApi(data) {
  const { id, ...rest } = data;
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.EMPLOYEE_UPDATE_URL}/${id}`,
    data: rest
  });
}

function* getEmployeeUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getEmployeeUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getEmployeeUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getEmployeeUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getEmployeeUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getEmployeeUpdateWatcher() {
  yield takeLatest(GET_EMPLOYEE_UPDATE, getEmployeeUpdateAction);
}
