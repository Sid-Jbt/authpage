import { GET_LOGIN_SUCCESS, LOGOUT } from '../constants';

const initialState = {
  roleList: null,
  token: ''
};

export default function loginReducer(state = initialState, action) {
  let roleList = null;
  switch (action.type) {
    case GET_LOGIN_SUCCESS:
      if (action.payload && action.payload.data) {
        roleList = action.payload.data.permission;
      }
      return {
        ...state,
        roleList,
        token: action.payload.data.token
      };

    case LOGOUT: {
      return {
        ...state,
        roleList: initialState.roleList,
        token: initialState.token
      };
    }

    default:
      return state;
  }
}
