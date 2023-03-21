import { GET_DOMAIN_SUCCESS, GET_DOMAIN_ERROR, GET_DOMAIN } from '../constants';

export function getDomain(session, resolve, reject) {
  return {
    type: GET_DOMAIN,
    payload: session,
    resolve,
    reject
  };
}

export const getDomainSuccess = (data) => ({
  type: GET_DOMAIN_SUCCESS,
  payload: data
});

export const getDomainError = (error) => ({
  type: GET_DOMAIN_ERROR,
  payload: error
});
