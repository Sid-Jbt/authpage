import {
  GET_EXPENSE_UPDATE,
  GET_EXPENSE_UPDATE_ERROR,
  GET_EXPENSE_UPDATE_SUCCESS
} from '../../constants';

export function getExpenseUpdate(session, resolve, reject) {
  return {
    type: GET_EXPENSE_UPDATE,
    payload: session,
    resolve,
    reject
  };
}
export const getExpenseUpdateSuccess = (data) => ({
  type: GET_EXPENSE_UPDATE_SUCCESS,
  payload: data
});

export const getExpenseUpdateError = (error) => ({
  type: GET_EXPENSE_UPDATE_ERROR,
  payload: error
});
