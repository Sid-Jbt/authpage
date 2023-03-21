import {
  GET_ORGANISATION_SIGNUP_SUCCESS,
  GET_ORGANISATION_SIGNUP_ERROR,
  GET_ORGANISATION_SIGNUP
} from '../constants';

export function getOrganisationSignup(session, resolve, reject) {
  return {
    type: GET_ORGANISATION_SIGNUP,
    payload: session,
    resolve,
    reject
  };
}

export const getOrganisationSignupSuccess = (data) => ({
  type: GET_ORGANISATION_SIGNUP_SUCCESS,
  payload: data
});

export const getOrganisationSignupError = (error) => ({
  type: GET_ORGANISATION_SIGNUP_ERROR,
  payload: error
});
