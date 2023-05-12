import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_TIME_ACTIVITY_ID_DATA } from '../../constants';
import {
  getTimeActivityByIdError,
  getTimeActivityByIdSuccess,
  setLoaderComplete,
  setLoaderStart
} from '../../actions';
import { API_URL, BASE_URL } from '../../api.config';
import { instance } from '../../index';

async function getTimeActivityByIdApi(params) {
  return instance.request({
    method: 'get',
    url: `${BASE_URL + API_URL.TIME_ACTIVITY_BY_ID_URL}/${params}`
  });
}

function* getTimeActivityByIdAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getTimeActivityByIdApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getTimeActivityByIdSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getTimeActivityByIdError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getTimeActivityByIdError(e));
    if (reject) reject(e);
  }
}

export function* getTimeActivityByIdWatcher() {
  yield takeLatest(GET_TIME_ACTIVITY_ID_DATA, getTimeActivityByIdAction);
}
