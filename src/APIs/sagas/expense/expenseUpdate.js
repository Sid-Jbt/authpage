import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_EXPENSE_UPDATE } from '../../constants';
import {
  getExpenseUpdateError,
  getExpenseUpdateSuccess,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

// async function getExpenseUpdateApi({ data, params }) {
//   return instance.request({
//     method: 'post',
//     url: `${BASE_URL + API_URL.EXPENSE_UPDATE_URL}/${params}`,
//     data
//   });
//   console.log('data,params =>', data, params)
// }

async function getExpenseUpdateApi({ data, params }) {
  return instance.request({
    method: 'put',
    url: `${BASE_URL + API_URL.EXPENSE_UPDATE_URL}/${params}`,
    data
  });
}

function* getExpenseUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getExpenseUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getExpenseUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getExpenseUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getExpenseUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getExpenseUpdateWatcher() {
  yield takeLatest(GET_EXPENSE_UPDATE, getExpenseUpdateAction);
}
