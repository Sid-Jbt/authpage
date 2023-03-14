import { GET_DASHBOARD_SUCCESS } from '../constants';

const initialState = {
  user: '',
  profileProgress: '',
  holidayList: '',
  isLoginFirstTime: 1,
  currentWeekHours: 0,
  currentMonthHours: 0
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        user: action.payload.data.user,
        isLoginFirstTime: action.payload.data.user.loginCount === 1,
        holidayList: action.payload.data.holidayList,
        profileProgress: action.payload.data.profileProgress,
        currentWeekHours: action.payload.data.currentWeekHours,
        currentMonthHours: action.payload.data.currentMonthHours
      };
    default:
      return state;
  }
}
