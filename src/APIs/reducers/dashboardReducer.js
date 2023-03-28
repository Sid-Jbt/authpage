import { GET_DASHBOARD_SUCCESS } from '../constants';

const initialState = {
  user: '',
  profileProgress: '',
  holidayList: '',
  noticeList: '',
  notification: '',
  isLoginFirstTime: false,
  todayHours: 0,
  isProfileSetup: true,
  currentWeekHours: 0,
  currentMonthHours: 0,
  totalEmployee: 0,
  totalPresent: 0,
  totalAbsent: 0,
  totalPendingExpense: 0,
  totalPendingLeave: 0,
  totalPendingSupportTicket: 0
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        user: action.payload.data.user,
        isLoginFirstTime: action.payload.data.user.loginCount === 1,
        holidayList: action.payload.data.holidayList,
        noticeList: action.payload.data.noticeList,
        profileProgress: action.payload.data.profileProgress,
        todayHours: action.payload.data.todayHours,
        notification: action.payload.data.notification,
        totalEmployee: action.payload.data.totalEmployee,
        totalPresent: action.payload.data.totalPresent,
        totalAbsent: action.payload.data.totalAbsent,
        totalPendingExpense: action.payload.data.totalPendingExpense,
        totalPendingLeave: action.payload.data.totalPendingLeave,
        totalPendingSupportTicket: action.payload.data.totalPendingSupportTicket,
        currentWeekHours: action.payload.data.currentWeekHours,
        currentMonthHours: action.payload.data.currentMonthHours
      };
    case 'LOGIN_COMPLETED': {
      return {
        ...state,
        isProfileSetup: false
      };
    }
    default:
      return state;
  }
}
