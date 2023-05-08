import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ROLE_LIST } from '../../constants';
import {
  setLoaderComplete,
  setLoaderStart,
  getRoleListSuccess,
  getRoleListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getRoleListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.ROLE_LIST_URL,
    params
  });
}
function* getRoleListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getRoleListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getRoleListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getRoleListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getRoleListError(e));
    if (reject) reject(e);
  }
}

export function* getRoleListWatcher() {
  yield takeLatest(GET_ROLE_LIST, getRoleListAction);
}
