import { GET_LOGIN_SUCCESS, LOGOUT } from '../constants';

const initialState = {
  role: '',
  roleList: null,
  token: '',
  isLoginFirstTime: true
};

const AdminRole = [
  'dashboard',
  'profilesetup',
  'employee',
  'profile',
  'privacy',
  'employeeDetails',
  'expense',
  'leave',
  'settings',
  'payslip',
  'attendance',
  'profile',
  'role',
  'supportTicket',
  'report',
  'allreport',
  'timeactivity',
  'weeklylimit',
  'holiday',
  'notice'
];

const EmployeeRole = [
  'dashboard',
  'profilesetup',
  'profile',
  'privacy',
  'expense',
  'leave',
  'settings',
  'payslip',
  'attendance',
  'profile',
  'supportTicket',
  'report',
  'allreport',
  'timeactivity',
  'weeklylimit',
  'holiday'
];

export default function loginReducer(state = initialState, action) {
  let roleList = null;
  let role = '';
  switch (action.type) {
    case GET_LOGIN_SUCCESS:
      if (action.payload && action.payload.data) {
        role = action.payload.data.role;
        role = action.payload.data.role;
        roleList = action.payload.data.role === 'admin' ? AdminRole : EmployeeRole;
      }
      return {
        ...state,
        role,
        roleList,
        token: action.payload.data.token,
        // isLoginFirstTime: action.payload.data.isLoginFirstTime <= 1
        isLoginFirstTime: true
      };

    case LOGOUT: {
      return {
        ...state,
        roleList: initialState.roleList,
        role: initialState.role,
        token: initialState.token,
        isLoginFirstTime: initialState.isLoginFirstTime
      };
    }

    default:
      return state;
  }
}
