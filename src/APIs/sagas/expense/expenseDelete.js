import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EXPENSE_DELETE } from '../../constants';
import {
  getExpenseDeleteSuccess,
  getExpenseDeleteError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getExpenseDeleteApi(params) {
  return instance.request({
    method: 'delete',
    url: `${BASE_URL + API_URL.EXPENSE_DELETE_URL}/${params.selectedId}`
  });
}

function* getExpenseDeleteAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getExpenseDeleteApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getExpenseDeleteSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getExpenseDeleteError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getExpenseDeleteError(e));
    if (reject) reject(e);
  }
}

export function* getExpenseDeleteWatcher() {
  yield takeLatest(GET_EXPENSE_DELETE, getExpenseDeleteAction);
}
