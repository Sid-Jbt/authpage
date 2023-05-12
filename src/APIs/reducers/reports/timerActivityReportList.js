import { GET_TIME_ACTIVITY_REPORT_LIST_SUCCESS } from '../../constants';

const initialState = {
  list: ''
};

export default function timerActivityReportListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TIME_ACTIVITY_REPORT_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
}
