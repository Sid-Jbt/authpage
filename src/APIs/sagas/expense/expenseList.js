import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EXPENSE_LIST } from '../../constants';
import {
  getExpenseListSuccess,
  getExpenseListError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getExpenseListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.EXPENSE_LIST_URL,
    params
  });
}
function* getExpenseListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getExpenseListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getExpenseListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getExpenseListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getExpenseListError(e));
    if (reject) reject(e);
  }
}

export function* getExpenseListWatcher() {
  yield takeLatest(GET_EXPENSE_LIST, getExpenseListAction);
}
