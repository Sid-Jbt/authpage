import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_PAYSLIP_LIST } from '../../constants';
import {
  getPayslipListSuccess,
  setLoaderComplete,
  setLoaderStart,
  getPayslipListError
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getPayslipListApi(params) {
  return instance.request({
    method: 'get',
    url: BASE_URL + API_URL.PAYSLIP_LIST_URL,
    params
  });
}
function* getPayslipListAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getPayslipListApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getPayslipListSuccess(response.data.data));
      if (resolve) resolve(response);
    } else {
      yield put(getPayslipListError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getPayslipListError(e));
    if (reject) reject(e);
  }
}

export function* getPayslipListWatcher() {
  yield takeLatest(GET_PAYSLIP_LIST, getPayslipListAction);
}
