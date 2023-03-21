import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ORGANISATION_SIGNUP } from '../constants';
import {
  getOrganisationSignupSuccess,
  setLoaderComplete,
  setLoaderStart,
  getOrganisationSignupError
} from '../actions';
import { API_URL, BASE_URL } from '../api.config';
import { instance } from '../index';

async function getOrganisationSignupApi(data) {
  return instance.request({
    method: 'post',
    url: BASE_URL + API_URL.ORGANISATION_SIGNUP_URL,
    data
  });
}

function* getOrganisationSignupAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getOrganisationSignupApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getOrganisationSignupSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getOrganisationSignupError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getOrganisationSignupError(e));
    if (reject) reject(e);
  }
}

export function* getOrganisationSignupWatcher() {
  yield takeLatest(GET_ORGANISATION_SIGNUP, getOrganisationSignupAction);
}
