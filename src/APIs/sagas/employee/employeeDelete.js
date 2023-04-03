import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EMPLOYEE_DELETE } from '../../constants';
import {
  getEmployeeDeleteSuccess,
  setLoaderComplete,
  setLoaderStart,
  getEmployeeDeleteError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getEmployeeDeleteApi(id) {
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.EMPLOYEE_DELETE_URL}/${id}`
  });
}

function* getEmployeeDeleteAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getEmployeeDeleteApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getEmployeeDeleteSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getEmployeeDeleteError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getEmployeeDeleteError(e));
    if (reject) reject(e);
  }
}

export function* getEmployeeDeleteWatcher() {
  yield takeLatest(GET_EMPLOYEE_DELETE, getEmployeeDeleteAction);
}
