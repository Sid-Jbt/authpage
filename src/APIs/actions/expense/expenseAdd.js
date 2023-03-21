import { GET_EXPENSE_ADD, GET_EXPENSE_ADD_ERROR, GET_EXPENSE_ADD_SUCCESS } from '../../constants';

export function getExpenseAdd(session, resolve, reject) {
  return {
    type: GET_EXPENSE_ADD,
    payload: session,
    resolve,
    reject
  };
}
export const getExpenseAddSuccess = (data) => ({
  type: GET_EXPENSE_ADD_SUCCESS,
  payload: data
});

export const getExpenseAddError = (error) => ({
  type: GET_EXPENSE_ADD_ERROR,
  payload: error
});
