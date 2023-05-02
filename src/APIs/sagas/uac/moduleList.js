import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_MODULE_LIST } from '../../constants';
import {
  setLoaderComplete,
  setLoaderStart,
  getModuleListSuccess,
  getModuleListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getModuleListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.MODULE_LIST_URL,
    params
  });
}
function* getModuleListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getModuleListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getModuleListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getModuleListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getModuleListError(e));
    if (reject) reject(e);
  }
}

export function* getModuleListWatcher() {
  yield takeLatest(GET_MODULE_LIST, getModuleListAction);
}
