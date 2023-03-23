import {
  GET_EXPENSE_ID_DATA,
  GET_EXPENSE_ID_DATA_ERROR,
  GET_EXPENSE_ID_DATA_SUCCESS
} from '../../constants';

export function getExpenseById(session, resolve, reject) {
  return {
    type: GET_EXPENSE_ID_DATA,
    payload: session,
    resolve,
    reject
  };
}

export const getExpenseByIdSuccess = (data) => ({
  type: GET_EXPENSE_ID_DATA_SUCCESS,
  payload: data
});

export const getExpenseByIdError = (error) => ({
  type: GET_EXPENSE_ID_DATA_ERROR,
  payload: error
});
