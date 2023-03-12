import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_ORGANISATION_PROFILE_UPDATE } from '../constants';
import {
  getOrganisationProfileUpdateSuccess,
  setLoaderComplete,
  setLoaderStart,
  getOrganisationProfileUpdateError
} from '../actions';
import { API_URL, BASE_URL } from '../config';
import { instance } from '../index';

async function getOrganisationProfileUpdateApi(data) {
  return instance.request({
    method: 'put',
    url: BASE_URL + API_URL.ORGANISATION_PROFIlE_UPDATE_URL,
    data
  });
}

function* getOrganisationProfileUpdateAction(action) {
  const { payload, resolve, reject } = action;
  try {
    yield put(setLoaderStart());
    const response = yield call(getOrganisationProfileUpdateApi, payload);
    yield put(setLoaderComplete());
    if (response.status === 200) {
      yield put(getOrganisationProfileUpdateSuccess(response.data));
      if (resolve) resolve(response);
    } else {
      yield put(getOrganisationProfileUpdateError(response));
      if (reject) reject(response);
    }
  } catch (e) {
    yield put(setLoaderComplete());
    yield put(getOrganisationProfileUpdateError(e));
    if (reject) reject(e);
  }
}

export function* getOrganisationProfileUpdateWatcher() {
  yield takeLatest(GET_ORGANISATION_PROFILE_UPDATE, getOrganisationProfileUpdateAction);
}
