import { ROLE, MINI_SIDENAV } from 'Redux/actions';

export const initialState = {
  miniSidenav: false,
  role: 'employee'
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MINI_SIDENAV: {
      return { ...state, miniSidenav: action.value };
    }
    case ROLE: {
      return { ...state, role: action.value };
    }
    default: {
      return initialState;
    }
  }
};

export default customizationReducer;
