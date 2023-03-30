import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EMPLOYEE_BY_SLUG } from '../../constants';
import {
  getEmployeeBySlugSuccess,
  setLoaderComplete,
  setLoaderStart,
  getEmployeeBySlugError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getEmployeeBySlugApi(params) {
  return instance.request({
    method: 'get',
    url: `${BASE_URL + API_URL.EMPLOYEE_BY_SLUG_URL}/${params.slug}`
  });
}
function* getEmployeeBySlugAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getEmployeeBySlugApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getEmployeeBySlugSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getEmployeeBySlugError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getEmployeeBySlugError(e));
    if (reject) reject(e);
  }
}

export function* getEmployeeBySlugWatcher() {
  yield takeLatest(GET_EMPLOYEE_BY_SLUG, getEmployeeBySlugAction);
}
