import { LAYOUT, MINI_SIDENAV } from 'Redux/actions';

export const initialState = {
  miniSidenav: false
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MINI_SIDENAV: {
      return { ...state, miniSidenav: action.value };
    }
    case LAYOUT: {
      return { ...state, layout: action.value };
    }
    default: {
      return initialState;
    }
  }
};

export default customizationReducer;
