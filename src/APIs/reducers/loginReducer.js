import { GET_LOGIN_SUCCESS, LOGOUT } from '../constants';

const initialState = {
  role: '',
  roleList: null,
  token: ''
};

const AdminRole = [
  'dashboard',
  'employee',
  'profile',
  'profilesetup',
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
  'holiday'
  // 'notice'
];

const EmployeeRole = [
  'dashboard',
  'profile',
  'profilesetup',
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
  'weeklylimit'
];

export default function loginReducer(state = initialState, action) {
  let roleList = null;
  let role = '';
  switch (action.type) {
    case GET_LOGIN_SUCCESS:
      if (action.payload && action.payload.data) {
        role = action.payload.data.role;
        roleList = action.payload.data.role === 'admin' ? AdminRole : EmployeeRole;
      }
      return {
        ...state,
        role,
        roleList,
        token: action.payload.data.token
      };

    case LOGOUT: {
      return {
        ...state,
        roleList: initialState.roleList,
        role: initialState.role,
        token: initialState.token
      };
    }

    default:
      return state;
  }
}
