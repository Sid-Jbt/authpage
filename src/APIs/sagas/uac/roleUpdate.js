import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ROLE_UPDATE } from '../../constants';
import {
  getRoleUpdateSuccess,
  setLoaderComplete,
  setLoaderStart,
  getRoleUpdateError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getRoleUpdateApi(data) {
  const { id, ...rest } = data;
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.EMPLOYEE_UPDATE_URL}/${id}`,
    data: rest
  });
}

function* getRoleUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getRoleUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getRoleUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getRoleUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getRoleUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getRoleUpdateWatcher() {
  yield takeLatest(GET_ROLE_UPDATE, getRoleUpdateAction);
}
