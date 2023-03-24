import {
  GET_ORGANISATION_PROFILE_UPDATE,
  GET_ORGANISATION_PROFILE_UPDATE_ERROR,
  GET_ORGANISATION_PROFILE_UPDATE_SUCCESS,
  GET_PROFILE_UPDATE,
  GET_PROFILE_UPDATE_ERROR,
  GET_PROFILE_UPDATE_SUCCESS,
  GET_PROFILE_SETUP,
  GET_PROFILE_SETUP_ERROR,
  GET_PROFILE_SETUP_SUCCESS
} from '../constants';

export function getProfileUpdate(session, resolve, reject) {
  return {
    type: GET_PROFILE_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getProfileUpdateSuccess = (data) => ({
  type: GET_PROFILE_UPDATE_SUCCESS,
  payload: data
});

export const getProfileUpdateError = (error) => ({
  type: GET_PROFILE_UPDATE_ERROR,
  payload: error
});

export function getOrganisationProfileUpdate(session, resolve, reject) {
  return {
    type: GET_ORGANISATION_PROFILE_UPDATE,
    payload: session,
    resolve,
    reject
  };
}

export const getOrganisationProfileUpdateSuccess = (data) => ({
  type: GET_ORGANISATION_PROFILE_UPDATE_SUCCESS,
  payload: data
});

export const getOrganisationProfileUpdateError = (error) => ({
  type: GET_ORGANISATION_PROFILE_UPDATE_ERROR,
  payload: error
});

export function getProfileSetup(session, resolve, reject) {
  return {
    type: GET_PROFILE_SETUP,
    payload: session,
    resolve,
    reject
  };
}

export const getProfileSetupSuccess = (data) => ({
  type: GET_PROFILE_SETUP_SUCCESS,
  payload: data
});

export const getProfileSetupError = (error) => ({
  type: GET_PROFILE_SETUP_ERROR,
  payload: error
});
