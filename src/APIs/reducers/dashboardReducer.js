import { GET_DASHBOARD_SUCCESS } from '../constants';

const initialState = {
  user: '',
  profileProgress: '',
  holidayList: '',
  noticeListL: '',
  isLoginFirstTime: false,
  todayHours: 0,
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
        noticeListL: action.payload.data.noticeList,
        profileProgress: action.payload.data.profileProgress,
        todayHours: action.payload.data.todayHours,
        currentWeekHours: action.payload.data.currentWeekHours,
        currentMonthHours: action.payload.data.currentMonthHours
      };
    case 'LOGIN_COMPLETED': {
      return {
        ...state,
        isLoginFirstTime: false
      };
    }
    default:
      return state;
  }
}
