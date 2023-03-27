import {
  GET_EXPENSE_ADD_UPDATE,
  GET_EXPENSE_ADD_UPDATE_ERROR,
  GET_EXPENSE_ADD_UPDATE_SUCCESS
} from '../../constants';

export function getExpenseAddUpdate(session, resolve, reject) {
  return {
    type: GET_EXPENSE_ADD_UPDATE,
    payload: session,
    resolve,
    reject
  };
}
export const getExpenseAddUpdateSuccess = (data) => ({
  type: GET_EXPENSE_ADD_UPDATE_SUCCESS,
  payload: data
});

export const getExpenseAddUpdateError = (error) => ({
  type: GET_EXPENSE_ADD_UPDATE_ERROR,
  payload: error
});
