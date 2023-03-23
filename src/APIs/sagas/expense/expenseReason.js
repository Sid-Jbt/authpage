import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EXPENSE_REASON } from '../../constants';
import {
  getExpenseReasonSuccess,
  getExpenseReasonError,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getExpenseReasonApi({ data, id }) {
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.EXPENSE_REASON_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  });
}

function* getExpenseReasonAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getExpenseReasonApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getExpenseReasonSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getExpenseReasonError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getExpenseReasonError(e));
    if (reject) reject(e);
  }
}

export function* getExpenseReasonWatcher() {
  yield takeLatest(GET_EXPENSE_REASON, getExpenseReasonAction);
}
