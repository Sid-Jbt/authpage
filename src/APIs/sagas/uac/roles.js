import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ROLES } from '../../constants';
import { setLoaderComplete, setLoaderStart, getRolesSuccess, getRolesError } from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getRolesApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.LEAVE_LIST_URL,
    params
  });
}
function* getRolesAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getRolesApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getRolesSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getRolesError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getRolesError(e));
    if (reject) reject(e);
  }
}

export function* getRolesWatcher() {
  yield takeLatest(GET_ROLES, getRolesAction);
}
