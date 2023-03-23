import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EXPENSE_ADD } from '../../constants';
import {
  getExpenseAddSuccess,
  getExpenseAddError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getExpenseAddApi({ data }) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.EXPENSE_ADD_URL,
    data
  });
}

function* getExpenseAddAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getExpenseAddApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getExpenseAddSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getExpenseAddError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getExpenseAddError(e));
    if (reject) reject(e);
  }
}

export function* getExpenseAddWatcher() {
  yield takeLatest(GET_EXPENSE_ADD, getExpenseAddAction);
}
