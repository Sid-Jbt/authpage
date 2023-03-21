import { MINI_SIDENAV } from 'APIs/constants';

export const initialState = {
  miniSidenav: false
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MINI_SIDENAV: {
      return { ...state, miniSidenav: action.value };
    }
    default: {
      return state;
    }
  }
};

export default customizationReducer;
