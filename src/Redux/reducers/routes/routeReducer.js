import { ROLE, ROLELIST, LOGOUT, CURRENTUSER, REMEMBERME } from 'Redux/actions';

export const DEFAULT_USER = {
  id: null,
  token: null
};

export const initialState = {
  role: '',
  roleList: null,
  currentUser: DEFAULT_USER,
  rememberMe: ''
};

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENTUSER: {
      return { ...state, currentUser: action.value };
    }
    case ROLE: {
      return { ...state, role: action.value };
    }
    case ROLELIST: {
      return { ...state, roleList: action.value };
    }
    case REMEMBERME: {
      return { ...state, rememberMe: action.value };
    }
    case LOGOUT: {
      return {
        ...state,
        roleList: initialState.roleList,
        role: initialState.role,
        currentUser: initialState.currentUser,
        rememberMe: initialState.rememberMe
      };
    }
    default: {
      return state;
    }
  }
};

export default routeReducer;
