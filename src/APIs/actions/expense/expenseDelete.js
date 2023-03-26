import {
  GET_EXPENSE_DELETE,
  GET_EXPENSE_DELETE_ERROR,
  GET_EXPENSE_DELETE_SUCCESS
} from '../../constants';

export function getExpenseDelete(session, resolve, reject) {
  return {
    type: GET_EXPENSE_DELETE,
    payload: session,
    resolve,
    reject
  };
}

export const getExpenseDeleteSuccess = (data) => ({
  type: GET_EXPENSE_DELETE_SUCCESS,
  payload: data
});

export const getExpenseDeleteError = (error) => ({
  type: GET_EXPENSE_DELETE_ERROR,
  payload: error
});
