import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EXPENSE_ADD_UPDATE } from '../../constants';
import {
  getExpenseAddUpdateSuccess,
  getExpenseAddUpdateError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getExpenseAddUpdateApi(data) {
  const { id, ...rest } = data;
  const url = id
    ? `${BASE_URL + API_URL.EXPENSE_ADD_UPDATE_URL}/${id}`
    : BASE_URL + API_URL.EXPENSE_ADD_UPDATE_URL;
  const method = id ? 'put' : 'post';
  return instance.request({
    method,
    url,
    data: rest
  });
}

function* getExpenseAddUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getExpenseAddUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getExpenseAddUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getExpenseAddUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getExpenseAddUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getExpenseAddUpdateWatcher() {
  yield takeLatest(GET_EXPENSE_ADD_UPDATE, getExpenseAddUpdateAction);
}
