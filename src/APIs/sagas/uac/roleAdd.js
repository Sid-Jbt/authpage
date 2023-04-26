import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ROLE_ADD } from '../../constants';
import {
  getRoleAddSuccess,
  setLoaderComplete,
  setLoaderStart,
  getRoleAddError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getRoleAddApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.ROLE_ADD_URL,
    data
  });
}

function* getRoleAddAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getRoleAddApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getRoleAddSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getRoleAddError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getRoleAddError(e));
    if (reject) reject(e);
  }
}

export function* getRoleAddWatcher() {
  yield takeLatest(GET_ROLE_ADD, getRoleAddAction);
}
