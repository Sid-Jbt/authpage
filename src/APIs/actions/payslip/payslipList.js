import {
  GET_PAYSLIP_LIST,
  GET_PAYSLIP_LIST_ERROR,
  GET_PAYSLIP_LIST_SUCCESS
} from '../../constants';

export function getPayslipList(session, resolve, reject) {
  return {
    type: GET_PAYSLIP_LIST,
    payload: session,
    resolve,
    reject
  };
}

export const getPayslipListSuccess = (data) => ({
  type: GET_PAYSLIP_LIST_SUCCESS,
  payload: data
});

export const getPayslipListError = (error) => ({
  type: GET_PAYSLIP_LIST_ERROR,
  payload: error
});
