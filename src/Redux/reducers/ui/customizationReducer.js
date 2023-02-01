import { MINI_SIDENAV, SNACKBAR } from 'Redux/actions';

export const initialState = {
  miniSidenav: false,
  snackbarData: false
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MINI_SIDENAV: {
      return { ...state, miniSidenav: action.value };
    }
    case SNACKBAR: {
      return { ...state, snackbarData: action.value };
    }
    default: {
      return initialState;
    }
  }
};

export default customizationReducer;
