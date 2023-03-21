import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EMPLOYEE_LIST } from '../../constants';
import {
  getEmployeeListSuccess,
  setLoaderComplete,
  setLoaderStart,
  getEmployeeListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getEmployeeListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.EMPLOYEE_LIST_URL,
    params
  });
}
function* getEmployeeListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getEmployeeListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getEmployeeListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getEmployeeListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getEmployeeListError(e));
    if (reject) reject(e);
  }
}

export function* getEmployeeListWatcher() {
  yield takeLatest(GET_EMPLOYEE_LIST, getEmployeeListAction);
}
