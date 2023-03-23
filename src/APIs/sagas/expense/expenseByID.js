import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EXPENSE_ID_DATA } from '../../constants';
import {
  getExpenseByIdError,
  getExpenseByIdSuccess,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getExpenseByIdApi(params) {
  return instance.request({
    method: 'get',
    url: `${BASE_URL + API_URL.EXPENSE_BY_ID_URL}/${params.id}`
  });
}
function* getExpenseByIdAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getExpenseByIdApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getExpenseByIdSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getExpenseByIdError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getExpenseByIdError(e));
    if (reject) reject(e);
  }
}

export function* getExpenseByIdWatcher() {
  yield takeLatest(GET_EXPENSE_ID_DATA, getExpenseByIdAction);
}
