import {
  GET_EXPENSE_LIST,
  GET_EXPENSE_LIST_ERROR,
  GET_EXPENSE_LIST_SUCCESS
} from '../../constants';

export function getExpenseList(session, resolve, reject) {
  return {
    type: GET_EXPENSE_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getExpenseListSuccess = (data) => ({
  type: GET_EXPENSE_LIST_SUCCESS,
  payload: data
});

export const getExpenseListError = (error) => ({
  type: GET_EXPENSE_LIST_ERROR,
  payload: error
});
