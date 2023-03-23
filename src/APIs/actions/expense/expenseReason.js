import {
  GET_EXPENSE_REASON,
  GET_EXPENSE_REASON_ERROR,
  GET_EXPENSE_REASON_SUCCESS
} from '../../constants';

export function getExpenseReason(session, resolve, reject) {
  return {
    type: GET_EXPENSE_REASON,
    payload: session,
    resolve,
    reject
  };
}

export const getExpenseReasonSuccess = (data) => ({
  type: GET_EXPENSE_REASON_SUCCESS,
  payload: data
});

export const getExpenseReasonError = (error) => ({
  type: GET_EXPENSE_REASON_ERROR,
  payload: error
});
