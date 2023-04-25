import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ROLE_ID_DATA } from '../../constants';
import {
  getRoleByIdSuccess,
  getRoleByIdError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getRoleByIdApi(id) {
  return instance.request({
    method: 'get',
    url: `${BASE_URL + API_URL.LEAVE_BY_ID_URL}/${id}`
  });
}

function* getRoleByIdAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getRoleByIdApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getRoleByIdSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getRoleByIdError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getRoleByIdError(e));
    if (reject) reject(e);
  }
}

export function* getRoleByIdWatcher() {
  yield takeLatest(GET_ROLE_ID_DATA, getRoleByIdAction);
}
